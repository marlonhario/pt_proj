import {
    Resolver,
    Query,
    Mutation,
    Arg,
    ObjectType,
    Field,
    createUnionType,
    InputType,
} from "type-graphql";
import axios from "axios";
import { getConnection } from "typeorm";
import {
    MarketOneResponse,
    MarketResponse,
} from "../types/response/market_response";
import { Markets } from "../entity/Markets";

@ObjectType()
class MarketAlphavantageObject {
    @Field()
    symbol: string;

    @Field()
    name: string;

    @Field()
    type: string;

    @Field()
    region: string;

    @Field()
    marketOpen: string;

    @Field()
    marketClose: string;

    @Field()
    timezone: string;

    @Field()
    currency: string;

    @Field()
    matchScore: string;
}

const MarketSearchUnion = createUnionType({
    name: "MarketSearchSearchResult", // the name of the GraphQL union
    types: () => [Markets, MarketAlphavantageObject], // function that returns tuple of object types classes
    resolveType: (value) => {
        if ("id" in value) {
            return Markets; // or the schema name of the type as a string
        } else {
            return MarketAlphavantageObject; // we can return object type class (the one with `@ObjectType()`)
        }
    },
});

@ObjectType()
class MarketAdd extends Markets {
    @Field()
    newAdded: boolean;
}

@InputType()
class SearchType {
    @Field()
    page: number;
    @Field()
    pageSize: number;
    @Field()
    filter: String;
    @Field()
    order: number;
    // order: 1 | "ASC" | "DESC" | -1;
    @Field()
    orderBy?: String;
}

@Resolver()
export class MarketResolver {
    @Query(() => String)
    marketTest() {
        return "Market resolver!";
    }
    @Query(() => [Markets])
    async markets() {
        return await Markets.find();
    }

    @Query(() => MarketOneResponse)
    async initializeMarket(): Promise<MarketOneResponse> {
        const market = await Markets.findOne({
            where: {
                have_data: true,
            },
        });

        if (!market) {
            return {
                errors: {
                    field: "have data",
                    message: "Market is empty!",
                },
            };
        }

        return {
            market: market,
        };
    }

    @Query(() => [Markets])
    async alphavantageSearch(
        @Arg("symbol", { nullable: true }) symbol: String = "",
        @Arg("haveData", { nullable: true }) haveData: Boolean = false
    ) {
        let dbMarkets = [];

        if (symbol.length === 0) {
            return dbMarkets;
        }
        const { data } = await axios.get(
            `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`
        );

        if (!data) {
            return [];
        }
        const reduceData = data["bestMatches"].reduce((arr, cur) => {
            return [
                ...arr,
                {
                    symbol: cur["1. symbol"],
                    name: cur["2. name"],
                    type: cur["3. type"],
                    region: cur["4. region"],
                    marketOpen: cur["5. marketOpen"],
                    marketClose: cur["6. marketClose"],
                    timezone: cur["7. timezone"],
                    currency: cur["8. currency"],
                    matchScore: cur["9. matchScore"],
                },
            ];
        }, []);

        return reduceData;
    }

    @Mutation(() => [MarketAdd] || Boolean, { nullable: true })
    async addMarket(@Arg("symbol", { nullable: true }) symbol: String = "") {
        let dbMarkets = [];

        dbMarkets = await getConnection().getRepository(Markets).find({
            symbol: symbol.toUpperCase(),
        });

        //If it already exist in the db return null values for the frontend condition
        if (dbMarkets.length > 0) {
            let newDbMarkets = dbMarkets.map((item) => ({
                ...item,
                newAdded: false,
            }))[0];

            return [newDbMarkets];
        }
        const { data } = await axios.get(
            `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`
        );

        //Alphavantage error since no return for the symbol
        if (!data) {
            return [];
        }

        let reduceData = data["bestMatches"].reduce((arr, cur) => {
            return [
                ...arr,
                {
                    symbol: cur["1. symbol"],
                    name: cur["2. name"],
                    type: cur["3. type"],
                    region: cur["4. region"],
                    marketOpen: cur["5. marketOpen"],
                    marketClose: cur["6. marketClose"],
                    timezone: cur["7. timezone"],
                    currency: cur["8. currency"],
                    matchScore: cur["9. matchScore"],
                },
            ];
        }, []);
        reduceData = reduceData
            .filter((item) => item.symbol === symbol)
            .map((item) => ({ ...item, newAdded: true }));

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Markets)
            .values(reduceData)
            .execute();

        return reduceData;
    }

    @Mutation((returns) => [Markets])
    async marketsSearch(
        @Arg("symbol", { nullable: true }) symbol: String = "",
        @Arg("haveData", { nullable: true }) haveData: Boolean = false,
        @Arg("options", { nullable: true })
        options: SearchType = {
            page: 1,
            pageSize: 50,
            filter: null,
            order: 1,
            orderBy: "id",
        }
    ) {
        let { page, pageSize, filter, order = "ASC", orderBy } = options;
        let markets = await Markets.find({
            order: {
                [`${orderBy}`]: 1,
            },
            skip: page * pageSize,
            take: pageSize,
        });
        const query = getConnection()
            .getRepository(Markets)
            .createQueryBuilder("market")
            .orderBy("market.name", "ASC")
            .getMany();

        if (!query) {
            return [];
        }
        return query;
    }

    @Query(() => MarketResponse)
    async getMarketSymbol(): Promise<MarketResponse> {
        const query = getConnection()
            .getRepository(Markets)
            .createQueryBuilder("market")
            .orderBy("market.symbol", "ASC");

        if (!query) {
            return {
                errors: [
                    {
                        field: "id",
                        message: "Market symbol doesn't exist!",
                    },
                ],
            };
        }
        return {
            market: await query.getMany(),
        };
    }

    @Query(() => MarketResponse)
    async getMarketList(): Promise<MarketResponse> {
        const query = await getConnection()
            .getRepository(Markets)
            .createQueryBuilder("market")
            .distinctOn(["name", "symbol"])
            .orderBy("name", "ASC")
            .getMany();

        if (!query) {
            return {
                errors: [
                    {
                        field: "id",
                        message: "Market list is empty!",
                    },
                ],
            };
        }

        return {
            market: query,
        };
    }
}
