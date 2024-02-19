import { getConnection, getRepository } from "typeorm";
import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { verify } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { MyContext } from "../MyContext";

import { Users } from "../entity/Users";
import { PaperTrading } from "./../entity/PaperTrading";
import { AlpacaTrades } from "./../entity/AlpacaTrades";
import { Strategies } from "./../entity/Strategies";
import { PaperTradingInput } from "../types/inputs/paper_trading_input";
import { PaperTradingResponse } from "../types/response/paper_trading_response";

const Alpaca = require("@alpacahq/alpaca-trade-api");
const SMA = require("technicalindicators").SMA;
const querystring = require("querystring");

let response = {
    data: null,
    error: null,
    status_code: 400,
};

const { ALPACA_RESPONSE, ALPACA_CLIENT_ID, ALPACA_REDIRECT, ALPACA_STATE, ALPACA_SCOPE, ACCESS_TOKEN_SECRET } = process.env;

@Resolver()
export class PaperTradingResolver {
    @Query(() => String)
    PaperTradingTest() {
        return "Paper Trading resolver!";
    }

    @Query(() => String)
    async alpacaOauth(@Ctx() { req }: MyContext) {
        const result = await axios.get(
            `
				https://app.alpaca.markets/oauth/authorize?
				response_type=${ALPACA_RESPONSE}&
				client_id=${ALPACA_CLIENT_ID}&
				redirect_uri=${ALPACA_REDIRECT}&
				state=${ALPACA_STATE}&
				scope=${ALPACA_SCOPE}`
        );

        return result.config.url;
    }

    @Query(() => [PaperTrading])
    async paperTrading() {
        return PaperTrading.find();
    }

    @Query(() => PaperTradingResponse)
    async getPaperTradingById(@Arg("data") data: PaperTradingInput): Promise<PaperTradingResponse> {
        const { token } = data;
        const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        const user = await Users.findOne(payload.userId);

        if (!user) {
            return {
                errors: [
                    {
                        field: "id",
                        message: "User doesn't exist!",
                    },
                ],
            };
        }

        const queryBuilder = getConnection()
            .getRepository(PaperTrading)
            .createQueryBuilder("p")
            .innerJoinAndSelect("p.strategies", "s", 's.paper_trading_id = p."id"')
            .where("p.user_id = :id", { id: user.id });

        const paper_trading = await queryBuilder.getMany();

        return {
            paper_trading,
        };
    }

    @Mutation(() => PaperTrading)
    async savePaperTrding(@Arg("user_id") user_id: number) {
        const rs = await PaperTrading.create({
            id: uuidv4(),
            user_id: user_id,
            created_at: new Date(),
            read_only: true,
            live: true,
        }).save();

        return rs;
    }

    @Mutation(() => String)
    async alpacaAuthorize(@Arg("code") code: string) {
        let authToken = "";

        const data = {
            grant_type: "authorization_code",
            code: code,
            client_id: "14c51c69c8d219e7726669432c189e40",
            client_secret: "ecce003f7ce0e9d68bad0625c4fc50d8727193e6",
            redirect_uri: "http://localhost",
        };

        await axios({
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: querystring.stringify(data),
            url: "https://api.alpaca.markets/oauth/token",
        })
            .then(async (response) => {
                authToken = response.data.access_token;
            })
            .catch(function (error) {
                // handle error
                console.log(error, "errorerror");
            });

        return authToken;
    }

    @Mutation(() => Boolean || Strategies)
    async moveStrategy(@Arg("token") token: string, @Arg("data") data: string) {
        const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        const user = await Users.findOne(payload.userId);
        const extraData = JSON.parse(data);
        if (!user) {
            return {
                errors: [
                    {
                        field: "user_id",
                        message: "User does not exist.",
                    },
                ],
            };
        }

        const paper = await PaperTrading.findOne({ where: { user_id: user.id } });
        let { rows } = extraData;
        if (!paper) {
            return {
                errors: [
                    {
                        field: "user_id",
                        message: "User doesn't paper trading record!",
                    },
                ],
            };
        }

        try {
            const strategyRepository = getRepository(Strategies);
            let savedRows = await strategyRepository.save(rows);
        } catch (e) {}
        return true;
    }

    @Mutation(() => Boolean)
    async moveStrategies(@Arg("token") token: string, @Arg("data") data: string) {
        const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        const user = await Users.findOne(payload.userId);
        const extraData = JSON.parse(data);

        if (!user) {
            throw new Error("could not find user");
        }

        const paper = await PaperTrading.findOne({ where: { user_id: user.id } });

        if (!paper) {
            return {
                errors: [
                    {
                        field: "user_id",
                        message: "User doesn't paper trading record!",
                    },
                ],
            };
        }

        const { combine, source, destination } = extraData;

        if (combine) {
            const strategies = await Strategies.findOne({
                where: { id: combine.draggableId },
            });
            const strategies1 = await Strategies.findOne({
                where: { paper_trading: paper.id, source: source.index },
            });
            strategies.source_parent = strategies.source;
            strategies1.source_parent = strategies.source;

            await strategies.save();
            await strategies1.save();

            return true;
        }

        let source_id = [];
        for (let index = destination.index; index <= source.index; index++) {
            source_id.push(index);
        }

        let sr = [source.index];
        for (let i = destination.index; i < source.index; i++) {
            sr.push(i);
        }

        sr.map(async (value, index) => {
            const strategies = await Strategies.findOne({
                where: { paper_trading: paper.id, source: value },
            });
            strategies.source = source_id[index];
            await strategies.save();
        });

        return true;
    }

    @Mutation(() => String)
    async alpacaAccount(@Arg("token") token: string) {
        const connect = await new Alpaca({
            oauth: token,
            apiVersion: "v2",
            paper: true,
        });

        try {
            response.data = await connect.httpRequest("/account", "GET");
            response.status_code = 200;
        } catch (err) {
            response.status_code = 400;
            response.error = err;
        }

        return JSON.stringify(response);
    }

    @Mutation(() => String)
    async alpacaOrders(@Arg("token") token: string) {
        const connect = await new Alpaca({
            oauth: token,
            apiVersion: "v2",
            paper: true,
        });

        try {
            response.data = await connect.getOrders({
                status: "all",
                limit: 50,
                after: "",
                until: "",
                direction: "desc",
                nested: true,
            });
            response.status_code = 200;
        } catch (err) {
            response.status_code = 400;
            response.error = err;
        }

        return JSON.stringify(response);
    }

    @Mutation(() => String)
    async alpacaPositions(@Arg("token") token: string) {
        const connect = await new Alpaca({
            oauth: token,
            apiVersion: "v2",
            paper: true,
        });

        try {
            response.data = await connect.getPositions();
            response.status_code = 200;
        } catch (err) {
            response.status_code = 400;
            response.error = err;
        }

        return JSON.stringify(response);
    }

    @Mutation(() => String)
    async alpacaPortfolio(@Arg("token") token: string) {
        const connect = await new Alpaca({
            oauth: token,
            apiVersion: "v2",
            paper: true,
        });

        try {
            response.data = await connect.httpRequest("/account/portfolio/history");
            response.status_code = 200;
        } catch (err) {
            response.status_code = 400;
            response.error = err;
        }

        return JSON.stringify(response);
    }

    @Mutation(() => String)
    async alpacaCreateTrade(
        @Arg("token") token: string,
        @Arg("symbol") symbol: string,
        @Arg("qty") qty: number,
        @Arg("side") side: string,
        @Arg("type") type: string,
        @Arg("timeInForce") timeInForce: string,
        @Arg("userToken") userToken: string
    ) {
        const { userId }: any = verify(userToken, ACCESS_TOKEN_SECRET!);

        const connect = await new Alpaca({
            oauth: token,
            apiVersion: "v2",
            paper: true,
        });

        try {
            const addTrade = await connect.createOrder({
                symbol: symbol,
                qty: qty,
                side: side,
                type: type,
                time_in_force: timeInForce,
            });

            response.data = addTrade;
            response.status_code = 200;
            if (addTrade) {
                let addTransaction = getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(AlpacaTrades)
                    .values({
                        user_id: userId,
                        symbol,
                        qty,
                        side,
                        time_in_force: timeInForce,
                        date_added: new Date(),
                    })
                    .execute();
            }
        } catch (err) {
            response.status_code = 400;
            response.error = err;
        }

        return JSON.stringify(response);
    }
}
