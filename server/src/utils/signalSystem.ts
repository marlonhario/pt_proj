import { Strategies } from "../entity/Strategies";
import { Markets } from "../entity/Markets";
import { MarketData } from "../entity/MarketData";
import { PaperTrading } from "../entity/PaperTrading";
import { PaperTrade } from "../entity/PaperTrade";
import { SignalLogs } from "../entity/SignalLogs";

import { getRepository, Not, IsNull, getConnection } from "typeorm";
import moment from "moment";
import axios from "axios";
// @ts-ignore
import PTBackTest from "../../../web/src/trade-library/PTBackTest";

import { testStrategy } from "./testStrategy";

interface Keyable {
    [key: string]: any;
}

function convertTimeToNumber(time) {
    let hourToMinute = Number(time.split(":")[0]) * 60;
    let minuteToNumber = Number(time.split(":")[1]);

    return hourToMinute + minuteToNumber / 60;
}

let alphavantageCache = {};
async function checkIfWithinMarketTime(
    marketOpenTime = { hour: "6", offset: 5 },
    marketCloseTime = { hour: "14", offset: 5 },
    currentTime = { hour: "11", offset: 0 }
) {
    let dateStr = moment().format("YYYY-MM-DD");
    let market_open = moment(dateStr + " " + marketOpenTime.hour)
        // .set("hour", convertTimeToNumber(marketOpenTime.hour))
        .utcOffset(marketOpenTime.offset)
        .utc()
        .format("YYYY-MM-DD HH:mm");

    let market_close = moment(dateStr + " " + marketCloseTime.hour)
        // .set("hour", convertTimeToNumber(marketCloseTime.hour))
        .utcOffset(marketCloseTime.offset)
        .utc()
        .format("YYYY-MM-DD HH:mm");
    let current_time = moment(dateStr + " " + currentTime.hour)
        // .set("hour", convertTimeToNumber(currentTime.hour))
        .utcOffset(currentTime.offset)
        .utc()
        .format("YYYY-MM-DD HH:mm");

    return current_time >= market_open && current_time <= market_close;
}

const formatIndicator = (indicators) => {
    let record = [];

    if (indicators.length > 0) {
        indicators.map((indicator, index) => {
            let indicator_name = "";
            let options = {};
            if (indicator["identification"] === "AO") {
                indicator_name = "awesome_oscillator";
                options = {
                    signal: indicator["signal"],
                    levelLine: indicator["levelLine-AO"],
                    fastPeriod: indicator["fastPeriod-AO"],
                    slowPeriod: indicator["slowPeriod-AO"],
                };
            }

            if (indicator["identification"] === "MACD") {
                indicator_name = "macd";
                options = {
                    signal: indicator["signal"],
                    applyTo: "median",
                    fastPeriod: indicator["fastPeriod-MACD"], //fastEma
                    slowPeriod: indicator["slowPeriod-MACD"], //slowEma
                    signalPeriod: indicator["signalPeriod-MACD"], //MACD SMA
                    levelLine: 0, //default
                };
            }

            if (indicator["identification"] === "MA") {
                indicator_name = "moving_average";
                options = {
                    signal: indicator["signal"],
                    maMethod: indicator["maMethod"], // temp
                    period: indicator["period-MA"],
                };
            }
            if (indicator["identification"] === "OBV") {
                indicator_name = "on_balance_volume";
                options = {
                    signal: indicator["signal"],
                };
            }
            if (indicator["identification"] === "MFI") {
                indicator_name = "money_flow_index";
                options = {
                    signal: indicator["signal"],
                    period: indicator["period-MFI"],
                    levelLine: indicator["levelLine-MFI"],
                };
            }
            if (indicator["identification"] === "CCI") {
                indicator_name = "commodity_channel_index";
                options = {
                    period: indicator["period-CCI"],
                    applyTo: indicator["applyTo-CCI"],
                    levelLine: indicator["levelLine-CCI"],
                };
            }

            if (indicator["identification"] === "ADX") {
                indicator_name = "adx";
                options = {
                    signal: indicator["signal"],
                    period: indicator["period-ADX"],
                    levelLine: indicator["levelLine-ADX"],
                };
            }

            if (indicator["identification"] === "BB") {
                indicator_name = "bollinger_bands";
                options = {
                    signal: indicator["signal"],
                    period: indicator["period-BB"],
                    deviation: indicator["deviation-BB"],
                    applyTo: indicator["applyTo-BB"],
                };
            }

            if (indicator["identification"] === "ADL") {
                indicator_name = "accumulation_distribution";
                options = {
                    signal: indicator["signal"],
                };
            }

            if (indicator["identification"] === "ALMA") {
                indicator_name = "alma";
                options = {
                    signal: indicator["signal"],
                    period: indicator["period-ALMA"],
                    offset: indicator["offset-ALMA"],
                    sigma: indicator["sigma-ALMA"],
                    applyTo: indicator["applyTo-ALMA"],
                };
            }

            if (indicator["identification"] === "CO") {
                indicator_name = "co";
                options = {
                    signal: indicator["signal"],
                    fastPeriod: indicator["fastPeriod-CO"],
                    slowPeriod: indicator["slowPeriod-CO"],
                };
            }

            if (indicator["identification"] === "LSMA") {
                indicator_name = "lsma";
                options = {
                    signal: indicator["signal"],
                    period: indicator["period-LSMA"],
                    offset: indicator["offset-LSMA"],
                    applyTo: indicator["applyTo-LSMA"],
                };
            }

            record.push({
                name: indicator_name,
                options: options,
            });
        });
    }

    return record;
};

async function getMarket(symbol) {
    let market = await getRepository(Markets).createQueryBuilder("markets").where("markets.symbol = :symbol", { symbol }).getOne();

    if (!market) {
        return null;
    }

    return market;
}

function addTime(last_data, interval) {
    let minutes = interval.replace("min", "");
    return moment(last_data).add("minutes", minutes);
}

function isGreaterThanTargetTime(currentTime, targetTime) {
    return currentTime > targetTime;
}
export async function retrieveData() {
    let strategies = await getRepository(Strategies)
        .createQueryBuilder("strategies")
        .where("strategies.paper_trading_id IS NOT NULL AND strategies.editor_json IS NOT NULL")
        .getMany();

    let flattenEditorJSON = strategies.map(async (strategy) => {
        let editor_json: Keyable = strategy.editor_json;
        if (!editor_json["marketData"]) {
            return {
                ...strategy,
                ...editor_json,
            };
        }
        let {
            symbol,
            name,
            exchange,
            interval: { label, value },
        } = editor_json["marketData"];

        // let marketData;
        let marketData = await getMarket(symbol);

        let resolveMarketData = await Promise.resolve(marketData);
        return {
            ...strategy,
            // editor_json: null,
            ...editor_json,
            marketData: {
                ...resolveMarketData,
                interval_label: label,
                interval_value: value,
            },
        };
    });

    if (!strategies) {
        return;
    }

    let resolveEditorJSON = await Promise.resolve(flattenEditorJSON);
    return resolveEditorJSON;
}

let updateMarketData = async (symbol, interval = "15min") => {
    await Markets.update(
        {
            symbol: symbol,
        },
        {
            last_data: moment().utc(),
        }
    );

    return true;
};

let getMarketData = async (symbol, interval = "60min", last_update) => {
    let marketData = await MarketData.find({
        where: {
            symbol: symbol,
            interval: interval,
        },
        take: 3000,
        order: {
            last_update: "ASC",
        },
    });

    updateMarketData(symbol, interval);
    return marketData;
};

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

let fetchAlphavantage = async (symbol = "IBM", interval = "15min") => {
    try {
        // GETS THE LATEST 100 bars
        //
        const result = await axios.get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&outputsize=compact&interval=${interval}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`
        );
        const { data: newData } = transformOLHCData({
            data: result.data,
            symbol: symbol,
            marketId: null,
            interval: interval,
        });

        let latestTime = newData[0]["last_update"];
        let oldestTime = newData[newData.length - 1]["last_update"];

        alphavantageCache = {
            ...alphavantageCache,
            [`${symbol}-${interval}`]: {
                oldest: oldestTime,
                latest: latestTime,
            },
        };

        return newData.sort((a, b) => a["last_update"] - b["last_update"]);
    } catch (e) {
        console.log("fetching alphavantage data failed, refetching data...", e);
        // return fetchAlphavantage(symbol, interval)
        return [];
    }
};

function cleanTime(dateTime, interval) {
    let [date, time] = dateTime.split(" ");
    let [hours, minutes] = time.split(":");
    let numMinutes = Number(minutes);
    let numInterval = Number(interval.replace("min", ""));
    let remainder = numMinutes % numInterval;

    let cleanHours = Number(hours) > 9 ? `${hours}` : `0${hours}`;
    let cleanMinutes = numMinutes - remainder > 9 ? `${numMinutes - remainder}` : `0${numMinutes - remainder}`;
    return `${date} ${cleanHours}:${cleanMinutes}`;
}

export async function run() {
    // Retrieve all the startegies that meets the ff. criteria:
    // 1. Strategies in Paper Trading
    // 2. Strategies with Market that is open in the current trading hour
    // TODO: Add in the Future, only grab strategies when data has been updated in the last
    // TODO: 70minutes
    let data = await retrieveData();
    let newData = await Promise.all(data);
    // Logs all the retrieve strategies
    let logsTest = async (newData) => {
        const promises = newData.map(async (strategyRevised) => {
            let newStrategy = await strategyRevised;
            if (!newStrategy["marketData"]) {
                return;
            }
            let market = await newStrategy["marketData"];
            let stepString = `ID: ${newStrategy["id"]}, ${market["symbol"]}, Last run: , Last Data: , Interval: ${market.interval_value}, Trading hours: ${market?.marketOpen} - ${market["marketClose"]} ${market["timezone"]}`;
            return stepString;
        });
        let retrievedStrategiesLogs = await Promise.all(promises);
        return retrievedStrategiesLogs;
    };
    //Logs the total strategies

    let checkTradePosition = (trade) => {
        if (trade) {
            return "Undefined Trade NOT";
        }
        let type = trade["type"];
        let exits = ["close", "take profit", "stop loss"];
        let entries = ["open short", "open long"];
        if (!type) {
            return "Undefined Trade NOT";
        }
        let isExitPosition = exits.includes(type.toLowerCase());
        let isEntryPosition = entries.includes(type.toLowerCase());
        return isExitPosition ? "NOT IN" : "IN";
    };

    //Loops through all the strategies
    let checkSignal = newData.map(async (item) => {
        let strategy = await item;
        //Check if strategy has market data
        // if not skip loop
        if (!strategy["marketData"]) {
            return;
        }

        //Destructure strategy to assign the market data variable
        //with a if statement checking if its a valid market data
        let market = strategy["marketData"];
        if (!market) {
            return;
        }

        let marketOpen = {
            hour: market.marketOpen,
            offset: Number(market.timezone.split("-")[1]),
        };
        let marketClose = {
            hour: market.marketClose,
            offset: Number(market.timezone.split("-")[1]),
        };
        let currentTime = {
            hour: moment().format("HH:mm"),
            offset: 0,
        };

        let checkTradePosition = (trade) => {
            if (trade) {
                return "Undefined Trade NOT";
            }
            let type = trade["type"];
            let exits = ["close", "take profit", "stop loss"];
            let entries = ["open short", "open long"];
            if (!type) {
                return "Undefined Trade NOT";
            }
            let isExitPosition = exits.includes(type.toLowerCase());
            let isEntryPosition = entries.includes(type.toLowerCase());
            return isExitPosition ? "NOT IN" : "IN";
        };
        //Check if the market is open in the time that the strategy is being ran
        if (checkIfWithinMarketTime(marketOpen, marketClose, currentTime)) {
            let entry = formatIndicator(strategy["data"]["longEntryList"]);
            let exit = formatIndicator(strategy["data"]["longExitList"]);
            let properties = strategy["strategyProperties"];
            let symbol = strategy["marketData"]["symbol"];
            let interval = strategy["marketData"]["interval_value"] || "15min";
            let last_update = strategy["marketData"]["last_data"];
            //Get market data from the database
            let marketData = await getMarketData(symbol, interval, last_update);
            //Get the last_update of market data and add minutes depending on the interval of the strategy
            // let newTime = moment(
            //   marketData[marketData.length - 1]["last_update"]
            // ).add(interval.replace("min", ""), "minutes");

            let lastData = moment(marketData[marketData.length - 1]["last_update"]);
            console.log("moment diff", moment().diff(lastData, "minutes"));
            if (moment().diff(lastData, "minutes") >= 70) {
                //Retrieves latest market data from the alphavantage API
                let alphavantageData = await fetchAlphavantage(symbol, interval);
                let alphavantageFirstDataDate = moment(alphavantageData[0]["last_update"]);
                let alphavantagelastDataDate = moment(alphavantageData[alphavantageData.length - 1]["last_update"]);

                //Check if all the marketData is older than the fetch alphavantage data
                if (lastData < alphavantageFirstDataDate) {
                    marketData = [...marketData, ...alphavantageData];
                    try {
                        await getConnection().createQueryBuilder().insert().into(MarketData).values(alphavantageData).execute();
                    } catch (e) {
                        console.log("Error! - ", e);
                    }
                } else {
                    alphavantageData = alphavantageData.filter(function (cv) {
                        return !marketData.find(function (e) {
                            return e.id == cv.id;
                        });
                    });

                    marketData = [...marketData, ...alphavantageData];
                    try {
                        await getConnection().createQueryBuilder().insert().into(MarketData).values(alphavantageData).execute();
                    } catch (e) {
                        console.log("Error! - ", e);
                    }
                }
            }
            const BackTestData = new PTBackTest({
                stockData: marketData,
                technicalIndicators: {
                    entry: entry,
                    exit: exit,
                },
                stopLoss: {
                    isEnabled: properties["stopLoss"] === "Not used" ? false : true,
                    type: properties["stopLoss"],
                    value: properties["lossPips"],
                },
                takeProfit: {
                    isEnabled: properties["takeProfit"] === "Not used" ? false : true,
                    value: properties["profitPips"],
                },
                tradeSize: properties["entryLots"],
                spread: market["spread"],
            }).backtest();

            let currentTime = moment().utc().format("YYYY-MM-DD HH:mm");
            const formattedTime = cleanTime(currentTime, interval);
            const tradeLength = BackTestData["trade"].length;
            const latestBar = BackTestData["trade"][tradeLength - 1];
            const isCurrentBarInTrade = BackTestData["trade"].some((trade) => trade.date === formattedTime);

            if (isCurrentBarInTrade) {
                console.log("placeholder update");
                try {
                    let toTrade = await PaperTrade.create({
                        strategy_id: strategy.id,
                        market_id: market.id,
                        symbol: "aapl_test",
                        price: latestBar["close"],
                        trade_amount: properties["entryLots"],
                        stop_loss: properties["stopLoss"],
                        take_profit: properties["profitPips"],
                        profit: BackTestData["profitPerDay"],
                        balance: 1,
                        date_time: moment().utc(),
                        open: latestBar["open"],
                        high: latestBar["high"],
                        low: latestBar["low"],
                        close: latestBar["close"],
                        volume: latestBar["volume"],
                        trade_type: "Long Entry to delete",
                    }).save();

                    return {
                        strategy: strategy,
                        market: market,
                        backtest_result: BackTestData,
                        in_trade: true,
                        to_trade: toTrade,
                        market_status: "open",
                    };
                } catch (e) {
                    console.log(e);
                    return {
                        strategy: undefined,
                        market: undefined,
                        backtest_result: undefined,
                        in_trade: undefined,
                        to_trade: `${e}`,
                        market_status: "open",
                    };
                    // return "Error - Empty";
                }
            } else {
                //not in trade
                return {
                    strategy: strategy,
                    market: market,
                    backtest_result: BackTestData,
                    in_trade: false,
                    to_trade: null,
                    market_status: "open",
                };
            }
        } else {
            return {
                strategy: strategy,
                market: market,
                backtest_result: null,
                in_trade: false,
                to_trade: null,
                market_status: "close",
            };
        }
    });

    let signals = await Promise.all(checkSignal);
    //List of all the strategies that meet the criteria
    let firstLogs = signals.map(async (item) => {
        if (!item) {
            return "Strategy is null - Log #1";
        }

        let newItem = item;

        let newStrategy = newItem["strategy"];
        let market = newItem["market"];

        if (!newStrategy) {
            return "Strategy is null - Log #1";
        }

        let stepString = `ID: ${newStrategy["id"]}, ${market["symbol"]}, Last run: ${moment().utc().toString()}, Last Data: ${
            market.last_data
        }, Interval: ${market.interval_value}, Trading hours: ${market?.marketOpen} - ${market["marketClose"]} ${market["timezone"]}`;
        return stepString;
    });

    let secondLogs = signals.map(async (item) => {
        if (!item) {
            return "Strategy is null - Log #2";
        }
        let new_item = await item;
        let strategy = new_item.strategy;

        let market = new_item.market;
        let in_trade = new_item.in_trade;
        let backtest_result = new_item.backtest_result;

        if (!strategy) {
            return "Strategy is null - Log #2";
        }
        let entrySignals = strategy["data"]["longEntryList"];
        let exitSignals = strategy["data"]["longExitList"];
        const trade_length = backtest_result?.trade.length ? backtest_result?.trade.length : 0;
        const latest_bar = backtest_result?.trade.length > 0 ? backtest_result["trade"][trade_length - 1] : null;

        const trade_position = latest_bar === null ? "No Position" : checkTradePosition(latest_bar);

        let step_str = "";
        if (trade_position === "IN") {
            step_str = `ID: ${strategy.id}, ${market.symbol}, IN Trade, Looking for  ${exitSignals["length"]} Exit Signals ..... ${
                in_trade ? "TRUE" : "FALSE"
            }`;
        } else if (trade_position === "NOT IN") {
            step_str = `ID: ${strategy.id}, ${market.symbol}, NOT IN Trade, Looking for ${entrySignals["length"]} Entry Signals ..... ${
                in_trade ? "TRUE" : "FALSE"
            }`;
        } else {
            step_str = `ID: ${strategy.id}, ${market.symbol}, No signal founds for the latest bar - Log #2`;
        }

        return step_str;
    });

    let thirdLogs = signals.map((item) => {
        if (!item) {
            return "Strategy is null - Log #3";
        }

        if (!item.in_trade) {
            return "No trades";
        }

        let new_item = item;
        let strategy = new_item.strategy;
        let market = new_item.market;
        let in_trade = new_item.in_trade;
        let backtest_result = new_item.backtest_result;

        if (!strategy) {
            return "Strategy is null - Log #3";
        }

        let entrySignals = strategy["data"]["longEntryList"];
        let exitSignals = strategy["data"]["longExitList"];
        const trade_length = backtest_result?.trade.length ? backtest_result?.trade.length : 0;
        const latest_bar = backtest_result?.trade.length > 0 ? backtest_result["trade"][trade_length - 1] : null;

        const trade_position = latest_bar === null ? "No Position" : checkTradePosition(latest_bar);
        let stepString = "";

        if (latest_bar === null) {
            stepString = `ID: ${strategy.id}, ${market.symbol}, Sending Trade ... ${latest_bar}  ${market.symbol}, $${latest_bar}, Stop Loss ${latest_bar}, Take Profit ${latest_bar}`;
        } else {
            stepString = `ID: ${strategy.id}, ${market.symbol}, Sending Trade ... ${latest_bar["type"]}  ${market.symbol}, $${latest_bar["balance"]}, Stop Loss ${latest_bar["stopLoss"]}, Take Profit ${latest_bar["takeProfit"]}`;
        }

        return stepString;
    });

    let resolveFirstLogs = await Promise.all(firstLogs);
    let resolveSecondLogs = await Promise.all(secondLogs);

    let cleanFirstLogs = resolveFirstLogs.length > 0 ? resolveFirstLogs : ["No Paper Trades"];
    let cleanSecondLogs = resolveSecondLogs.length > 0 ? resolveSecondLogs : ["No Paper Trades"];
    let cleanThirdLogs = thirdLogs.length > 0 ? thirdLogs : [];

    let logs = await SignalLogs.create({
        signal_logs: [[...cleanFirstLogs], [...cleanSecondLogs], [...cleanThirdLogs]],
    }).save();

    return logs;
}
