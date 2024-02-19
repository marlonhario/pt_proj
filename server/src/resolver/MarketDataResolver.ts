import { MarketData } from "../entity/MarketData";
import { Markets } from "../entity/Markets";
import { MarketDataInterval } from "../entity/MarketDataInterval";
import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import axios from "axios";
import { AlphavantageApiResponse } from "../types/response/alphavantage_api_response";
import { MarketDataResponse } from "../types/response/market_data_response";

function transformOLHCData(options) {
    let { data, interval, marketId, symbol } = options;
    let dataVal = data[`Time Series (${interval})`];
    let metaData = data["Meta Data"];
    let newData = Object.keys(dataVal).reduce((arr, key) => {
        let value = {
            last_update: new Date(key),
            open: dataVal[key]["1. open"],
            high: dataVal[key]["2. high"],
            low: dataVal[key]["3. low"],
            close: dataVal[key]["4. close"],
            volume: dataVal[key]["5. volume"],
            symbol: symbol,
            interval: interval,
            marketId: marketId,
        };

        return [...arr, value];
    }, []);

    return {
        data: newData,
        last_refresh: metaData["Last Refreshed"],
        interval: interval,
        symbol: symbol,
    };
}

async function fetchEverything(symbol, marketId) {
    try {
        let allInterval = await axios.all(
            ["1min", "5min", "15min", "30min", "60min"].map((interval) => {
                return {
                    res: axios.get(
                        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&outputsize=full&interval=${interval}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`
                    ),
                    interval: interval,
                    symbol: symbol,
                    marketId: marketId,
                };
            })
        );

        let data = allInterval.map((item) => {
            return transformOLHCData({
                data: item["res"]["data"],
                symbol: item.symbol,
                marketId: item.marketId,
                interval: item["interval"],
            });
        });

        return data;
    } catch (e) {
        throw new Error(" Error in fetchEverything" + e);
    }
}

async function saveAllInterval(marketId, argInterval, symbol) {
    let allInterval = ["1min", "5min", "15min", "30min", "60min"];
    try {
        allInterval.map(async (interval) => {
            let marketDataIntervalSearch = await MarketDataInterval.findOne({
                interval: interval,
                marketId: marketId,
                symbol: symbol,
            });

            if (!marketDataIntervalSearch) {
                await MarketDataInterval.create({
                    interval: interval,
                    marketId: marketId,
                    symbol: symbol,
                }).save();
            }
        });
    } catch (e) {
        throw new Error("Error in saving market data interval saveAllInterval" + e);
    }
}

@Resolver()
export class MarketDataResolver {
    @Mutation(() => AlphavantageApiResponse, { nullable: true })
    async getAlphavantageMarketData(
        @Arg("symbol", () => String, { nullable: true }) symbol: string = "",
        @Arg("interval", () => String, { nullable: true })
        interval: string = "15min"
    ) {
        try {
            const result = await axios.get(
                `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&outputsize=full&interval=${interval}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`
            );

            if (result.data["Error Message"] || result.data["Note"]) {
                return {
                    errors: [
                        {
                            field: "api error",
                            message: result.data["Error Message"] || result.data["Note"],
                        },
                    ],
                };
            }

            const { data: newData } = transformOLHCData({
                data: result.data,
                symbol: symbol,
                marketId: null,
                interval: interval,
            });
            return {
                alphavantage_market_data: newData,
            };
        } catch (e) {
            return {
                errors: [
                    {
                        field: "api error",
                        message: e,
                    },
                ],
            };
        }
    }
    @Mutation(() => [MarketData] || [Markets], { nullable: true })
    async getMarketData(
        @Arg("symbol", () => String, { nullable: true }) symbol: string = "IBM",
        @Arg("interval", () => String, { nullable: true })
        interval: string = "15min",
        @Arg("marketId", () => Int) marketId: number,
        @Arg("refresh", () => Boolean, { nullable: true }) refresh: Boolean = false,
        @Arg("isGroup", () => Boolean, { nullable: true }) isGroup: Boolean = false
    ) {
        symbol = symbol.replace(/[^a-zA-Z0-9 \.]/g, "");
        const newMarketData = await MarketData.find({
            where: {
                symbol: symbol,
                interval: interval,
            },
            skip: 0,
            take: 3000, // this is default to stop the error
            order: {
                // date_created: "ASC",
                last_update: "ASC",
            },
        });

        if (!newMarketData) {
            return [];
        }

        try {
            return newMarketData;
        } catch (e) {
            console.log("e", e);
            return [];
        }
    }

    @Query(() => [MarketData])
    async marketData() {
        return await MarketData.find();
    }

    @Query(() => MarketDataResponse)
    async getMarketDataSymbol(
        @Arg("symbol", { nullable: true }) symbol: string,
        @Arg("interval", { nullable: true }) interval: string
    ): Promise<MarketDataResponse> {
        if (symbol) {
            symbol = symbol.replace(/[^a-zA-Z0-9 \.]/g, "");
        }
        const results = await MarketData.find({
            where: { symbol: symbol, interval: interval },
            skip: 0,
            take: 3000,
            order: {
                last_update: "ASC",
            },
        });

        const results1 = await Markets.findOne({ where: { symbol: symbol } });

        if (!results) {
            return {
                errors: {
                    field: "id",
                    message: "Market Data is empty!",
                },
            };
        }

        return {
            market_data: results,
            market: results1,
        };
    }
}
