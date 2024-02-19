import { Resolver, Query, ObjectType, Field, Arg, Mutation } from "type-graphql";
import { getConnection } from "typeorm";
import { verify } from "jsonwebtoken";

import { Users } from "../entity/Users";
import { Strategies } from "./../entity/Strategies";
import { Baskets } from "./../entity/Baskets";
import { StrategiesCriteria } from "../types/inputs/strategies_input";
import { GetStrategyProfileArgs } from "../types/arguments/strategy_arguments";
import moment from "moment-timezone";
import { v4 as uuidv4 } from "uuid";
import { StrategiesResponse, StrategyResponse } from "../types/response/strategies_response";
import { StrategyBoolen } from "./../types/response/strategies_response";
import { PaperTrading } from "./../entity/PaperTrading";

@ObjectType()
class StrategiesBasket {
    @Field(() => [Strategies], { nullable: true })
    strategy?: Strategies[];
    @Field({ nullable: true })
    hasData?: boolean;
    @Field({ nullable: true })
    start?: number;
    @Field({ nullable: true })
    end?: number;
}

const TEST_STRATEGY_DATA = {
    maximum_average_position_length: "2",
    maximum_average_position_length_value: 3,
    maximum_bars_in_trade: "123",
    maximum_bars_in_trade_value: 124123,
    maximum_consecutive_losses: "2121",
    maximum_consecutive_losses_value: 2121,
    maximum_count_of_trades: "3131",
    maximum_count_of_trades_value: 3131,
    maximum_equity_drawdown: "121",
    maximum_equity_drawdown_value: 121,
    maximum_equity_drawdown_percent: "2121",
    maximum_equity_drawdown_percent_value: 2121,
    maximum_stagnation: "12121",
    maximum_stagnation_value: 212121,
    maximum_stagnation_days: "3131",
    maximum_stagnation_days_value: 3131,
    minimum_average_hpr: "12121",
    minimum_average_hpr_value: 5151,
    minimum_average_position_length: "2121",
    minimum_backtest_quality: "3131",
    minimum_backtest_quality_value: 3131,
    minimum_balance_stability: "aaaa",
    minimum_balance_stability_value: 121,
    minimum_bars_in_trade: "21212",
    minimum_bars_in_trade_value: 3131,
    minimum_count_of_trades: "21212",
    minimum_count_of_trades_value: 313131,
    minimum_months_on_profit: "2121",
    minimum_months_on_profit_value: 313131,
    minimum_net_profit: "212121",
    minimum_net_profit_value: 2121,
    minimum_profit_factor: "212121",
    minimum_profit_factor_value: 313131,
    minimum_profit_per_day: "212121",
    minimum_profit_per_day_value: 313131,
    minimum_r_squared: "21212",
    minimum_r_squared_value: 3232,
    minimum_return_drawdown: "32323",
    minimum_return_drawdown_value: 1212121,
    minimum_sharpe_ratio: "313131",
    minimum_sharpe_ratio_value: 323232,
    minimum_system_quality_number: "323232",
    minimum_system_quality_number_value: 3232323,
    minimum_win_loss_ratio: "12121",
    minimum_win_loss_ratio_value: 12121,
};

@Resolver()
export class StrategiesResolver {
    @Query(() => String)
    strategiesTest() {
        return "Strategies resolver!";
    }

    @Query(() => [Strategies])
    strategies() {
        return Strategies.find();
    }

    @Query(() => Strategies)
    async getStrategyProfile(
        // @Arg("options")
        // options: GetStrategyProfileArgs,
        @Arg("id") id: string,
        @Arg("token") token: string
    ) {
        const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        const user = await Users.findOne(payload.userId);

        if (!user) {
            throw new Error("could not find user");
        }

        if (!id) {
            throw new Error("could not find id");
        }

        let strategy = await Strategies.findOne({
            where: {
                created_by_user_id: user.id,
                id: id,
            },
            order: {
                original_created_date: "ASC",
            },
        });

        if (!strategy) {
            console.log("could not find strategy");
            strategy = await Strategies.findOne({
                where: {
                    created_by_user_id: user.id,
                },
                order: {
                    original_created_date: "DESC",
                },
            });

            return strategy;
        }
        return strategy;
    }

    @Mutation(() => Boolean)
    async updateStrategy(
        @Arg("options", () => GetStrategyProfileArgs)
        options: GetStrategyProfileArgs,
        @Arg("token") token: string
    ) {
        const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        const user = await Users.findOne(payload.userId);

        if (!user) {
            throw new Error("could not find user");
        }

        try {
            let newStrategy = await Strategies.update(
                {
                    id: options.id,
                    created_by_user_id: user.id,
                },
                {
                    ...options,
                    editor_json: JSON.parse(JSON.stringify(options.editor_json)),
                }
            );
            // const strategy = await Strategies.update({ id });
            return true;
        } catch (e) {
            console.log("Error", e);
            return false;
        }
    }

    @Mutation(() => Strategies)
    async saveStrategy(
        @Arg("options", () => GetStrategyProfileArgs)
        options: GetStrategyProfileArgs,
        @Arg("token") token: string
    ) {
        const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        const user = await Users.findOne(payload.userId);

        if (!user) {
            throw new Error("could not find user");
        }

        const basket = await Baskets.findOne({
            where: {
                user_id: user.id,
            },
        });
        let editor_details = JSON.parse(JSON.stringify(options.editor_json));

        if (!basket) {
            try {
                console.log("basket does not exist yet");
                const newBasket = new Baskets();
                const newStrategy = await Strategies.create({
                    id: uuidv4(),
                    original_created_date: new Date(),
                    ...options,
                    editor_json: JSON.parse(JSON.stringify(options.editor_json)),
                    created_by_user_id: user.id,
                    net_profit: editor_details.netProfit,
                    profit_per_day: editor_details.profitPerDay,
                    return_drawdown: editor_details.drawdown,
                    max_drawdown_number: editor_details.maxDrawDown,
                    count_of_trades: editor_details.tradeCount,
                }).save();

                newBasket.added_date = new Date();
                newBasket.user_id = user.id;

                newBasket.strategies = [newStrategy];

                await newBasket.save();

                return newStrategy;
            } catch (e) {
                return e;
            }
        } else {
            try {
                const strategy = await Strategies.findOne({
                    where: {
                        created_by_user_id: user.id,
                        id: undefined,
                    },
                });
                if (!strategy) {
                    const newStrategy = await Strategies.create({
                        id: uuidv4(),
                        original_created_date: new Date(),
                        ...options,
                        editor_json: JSON.parse(JSON.stringify(options.editor_json)),
                        created_by_user_id: user.id,
                        baskets: basket,
                        net_profit: editor_details.netProfit,
                        profit_per_day: editor_details.profitPerDay,
                        return_drawdown: editor_details.drawdown,
                        max_drawdown_number: editor_details.maxDrawDown,
                        count_of_trades: editor_details.tradeCount,
                    }).save();
                    return newStrategy;
                }
                console.log("basket already exist for strategy");
                return strategy;
            } catch (e) {
                console.log("Error", e);
                return e;
            }
        }
    }

    @Query(() => StrategiesBasket)
    async getStrategies(
        @Arg("token") token: string,
        @Arg("sort_id") sort_id: string,
        @Arg("type") types: string,
        @Arg("data") data: StrategiesCriteria
    ): Promise<StrategiesBasket> {
        if (token) {
            const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
            const user = await Users.findOne(payload.userId);

            // console.log("test", user);
            if (!user) {
                throw new Error("could not find user");
            }

            const user_id: any = user.id;
            const type: any = types;

            const minimum_net_profit = data.minimum_net_profit ? data.minimum_net_profit_value : 0;
            const maximum_average_position_length = data.maximum_average_position_length ? data.maximum_average_position_length_value : 0;
            const maximum_bars_in_trade = data.maximum_bars_in_trade ? data.maximum_bars_in_trade_value : 0;
            const maximum_consecutive_losses = data.maximum_consecutive_losses ? data.maximum_consecutive_losses_value : 0;
            const maximum_count_of_trades = data.maximum_count_of_trades ? data.maximum_count_of_trades_value : 0;
            const maximum_equity_drawdown = data.maximum_equity_drawdown ? data.maximum_equity_drawdown_value : 0;
            const maximum_equity_drawdown_percent = data.maximum_equity_drawdown_percent ? data.maximum_equity_drawdown_percent_value : 0;
            const maximum_stagnation = data.maximum_stagnation ? data.maximum_stagnation_value : 0;
            const maximum_stagnation_days = data.maximum_stagnation_days ? data.maximum_stagnation_days_value : 0;
            const minimum_average_hpr = data.minimum_average_hpr ? data.minimum_average_hpr_value : 0;
            const minimum_average_position_length = data.minimum_average_position_length ? data.minimum_average_position_length_value : 0;
            const minimum_backtest_quality = data.minimum_backtest_quality ? data.minimum_backtest_quality_value : 0;
            const minimum_balance_stability = data.minimum_balance_stability ? data.minimum_balance_stability_value : 0;
            const minimum_bars_in_trade = data.minimum_bars_in_trade ? data.minimum_bars_in_trade_value : 0;
            const minimum_count_of_trades = data.minimum_count_of_trades ? data.minimum_count_of_trades_value : 0;
            const minimum_months_on_profit = data.minimum_months_on_profit ? data.minimum_months_on_profit_value : 0;
            const minimum_profit_factor = data.minimum_profit_factor ? data.minimum_profit_factor_value : 0;
            const minimum_profit_per_day = data.minimum_profit_per_day ? data.minimum_profit_per_day_value : 0;
            const minimum_r_squared = data.minimum_r_squared ? data.minimum_r_squared_value : 0;
            const minimum_return_drawdown = data.minimum_return_drawdown ? data.minimum_return_drawdown_value : 0;
            const minimum_sharpe_ratio = data.minimum_sharpe_ratio ? data.minimum_sharpe_ratio_value : 0;
            const minimum_system_quality_number = data.minimum_system_quality_number ? data.minimum_system_quality_number_value : 0;
            const minimum_win_loss_ratio = data.minimum_win_loss_ratio ? data.minimum_win_loss_ratio_value : 0;

            let qb = getConnection()
                .getRepository(Strategies)
                .createQueryBuilder("s")
                .innerJoinAndSelect("s.baskets", "b", 'b.basket_id = s."basket_id"')
                .where("b.user_id = :id AND s.is_deleted = :is_deleted", {
                    id: user_id,
                    is_deleted: false,
                })
                .orderBy("s." + sort_id + "", type);

            if (minimum_net_profit) {
                qb = qb.andWhere("s.count_of_trades >= :minimum_net_profit", {
                    minimum_net_profit,
                });
            }

            if (maximum_average_position_length) {
                qb = qb.andWhere("s.average_position_length <= :maximum_average_position_length", { maximum_average_position_length });
            }

            if (maximum_bars_in_trade) {
                qb = qb.andWhere("s.bars_in_trade_percent <= :maximum_bars_in_trade", {
                    maximum_bars_in_trade,
                });
            }

            if (maximum_consecutive_losses) {
                qb = qb.andWhere("s.max_consecutive_losses <= :maximum_consecutive_losses", { maximum_consecutive_losses });
            }

            if (maximum_count_of_trades) {
                qb = qb.andWhere("s.count_of_trdes <= :maximum_count_of_trades", {
                    maximum_count_of_trades,
                });
            }

            if (maximum_equity_drawdown) {
                qb = qb.andWhere("s.max_drawdown_number <= :maximum_equity_drawdown", {
                    maximum_equity_drawdown,
                });
            }

            if (maximum_equity_drawdown_percent) {
                qb = qb.andWhere("s.max_drawdown_percent <= :maximum_equity_drawdown_percent", { maximum_equity_drawdown_percent });
            }

            if (maximum_stagnation) {
                qb = qb.andWhere("s.max_stagnation_number <= :maximum_stagnation", {
                    maximum_stagnation,
                });
            }

            if (maximum_stagnation_days) {
                qb = qb.andWhere("s.max_stagnation_percent <= :maximum_stagnation_days", {
                    maximum_stagnation_days,
                });
            }

            if (minimum_average_hpr) {
                qb = qb.andWhere("s.average_hpr >= :minimum_average_hpr", {
                    minimum_average_hpr,
                });
            }

            if (minimum_average_position_length) {
                qb = qb.andWhere("s.average_position_length >= :minimum_average_position_length", { minimum_average_position_length });
            }

            if (minimum_backtest_quality) {
                qb = qb.andWhere("s.balance_line_stability >= :minimum_backtest_quality", { minimum_backtest_quality });
            }

            if (minimum_balance_stability) {
                qb = qb.andWhere("s.backtest_quality_percent >= :minimum_balance_stability", { minimum_balance_stability });
            }
            if (minimum_bars_in_trade) {
                qb = qb.andWhere("s.bars_in_trade_number >= :minimum_bars_in_trade", {
                    minimum_bars_in_trade,
                });
            }

            if (minimum_count_of_trades) {
                qb = qb.andWhere("s.count_of_trades >= :minimum_count_of_trades", {
                    minimum_count_of_trades,
                });
            }

            if (minimum_months_on_profit) {
                qb = qb.andWhere("s.count_of_trades >= :minimum_months_on_profit", {
                    minimum_months_on_profit,
                });
            }

            if (minimum_profit_factor) {
                qb = qb.andWhere("s.profit_factor >= :minimum_profit_factor", {
                    minimum_profit_factor,
                });
            }
            if (minimum_profit_per_day) {
                qb = qb.andWhere("s.profit_per_day <= :minimum_profit_per_day", {
                    minimum_profit_per_day,
                });
            }

            if (minimum_r_squared) {
                qb = qb.andWhere("s.r_squared <= :minimum_r_squared", {
                    minimum_r_squared,
                });
            }

            if (minimum_return_drawdown) {
                qb = qb.andWhere("s.return_drawdown <= :minimum_return_drawdown", {
                    minimum_return_drawdown,
                });
            }
            if (minimum_sharpe_ratio) {
                qb = qb.andWhere("s.sharpe_ratio <= :minimum_sharpe_ratio", {
                    minimum_sharpe_ratio,
                });
            }

            if (minimum_system_quality_number) {
                qb = qb.andWhere("s.return_drawdown <= :minimum_system_quality_number", {
                    minimum_system_quality_number,
                });
            }

            if (minimum_win_loss_ratio) {
                qb = qb.andWhere("s.win_loss <= :minimum_win_loss_ratio", {
                    minimum_win_loss_ratio,
                });
            }

            const strategies = await qb.getMany();

            let qbCount = getConnection()
                .getRepository(Strategies)
                .createQueryBuilder("s")
                .innerJoinAndSelect("s.baskets", "b", 'b.basket_id = s."basket_id"')
                .where("b.user_id = :id AND s.is_deleted = :is_deleted", {
                    id: user_id,
                    is_deleted: false,
                })
                .orderBy("s." + sort_id + "", type);

            const sCount = await qbCount.getMany();

            return {
                strategy: strategies,
                hasData: strategies.length ? true : false,
                start: strategies.length,
                end: sCount.length,
            };
        } else {
            return {
                strategy: null,
                hasData: null,
                start: null,
                end: null,
            };
        }
    }

    @Mutation(() => Strategies)
    async saveStrategies(@Arg("user_id") user_id: number, @Arg("value") value: number) {
        const rs = await Strategies.create({
            id: uuidv4(),
            created_by_user_id: user_id,
            original_created_date: new Date(),
            average_position_length: value,
            average_hpr: value,
            backtest_quality_percent: value,
            balance_line_stability: value,
            bars_in_trade_number: value,
            bars_in_trade_percent: value,
            count_of_trades: value,
            max_consecutive_losses: value,
            max_drawdown_number: value,
            max_drawdown_percent: value,
            months_of_profit: value,
            net_balance: value,
            net_profit: value,
            profit_factor: value,
            profit_per_day: value,
            r_squared: value,
            return_drawdown: value,
            sharpe_ratio: value,
            max_stagnation_number: value,
            max_stagnation_percent: value,
            system_quality_number: value,
            win_loss: value,
        }).save();

        return rs;
    }

    @Mutation(() => Boolean)
    async transferStrategies(@Arg("id") id: string) {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();

        const strategies = await Strategies.findOne(id);

        let paperTrading = await PaperTrading.findOne({
            where: { user_id: strategies.created_by_user_id },
        });

        if (!paperTrading) {
            paperTrading = await PaperTrading.create({
                id: uuidv4(),
                user_id: strategies.created_by_user_id,
                created_at: new Date(),
                read_only: true,
                live: true,
            });
        }

        const newStrategies = await Strategies.findOne(id);
        newStrategies.baskets = null;
        newStrategies.paper_trading = paperTrading;

        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(paperTrading);
            await queryRunner.manager.save(newStrategies);
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            return false;
        } finally {
            await queryRunner.release();
            return true;
        }
    }

    @Mutation(() => StrategyResponse)
    async deleteStrategies(@Arg("id") id: string): Promise<StrategyResponse> {
        const strategies = await Strategies.findOne({
            where: { id: id, is_deleted: false },
        });

        if (!strategies) {
            return {
                errors: [
                    {
                        field: "id",
                        message: "Strategies doesn't exist!",
                    },
                ],
            };
        }

        strategies.is_deleted = true;
        strategies.deleted_at = moment().toDate();

        const response = await strategies.save();

        if (!response) {
            return {
                errors: [
                    {
                        field: "is_deleted, deleted_at",
                        message: "Error upon saving!",
                    },
                ],
            };
        }

        return {
            strategies: response,
        };
    }

    @Query(() => StrategiesResponse)
    async getTrash(@Arg("token") token: string): Promise<StrategiesResponse> {
        if (token) {
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
            const baskets = await Baskets.findOne({ where: { user_id: user.id } });
            if (!baskets) {
                return {
                    errors: [
                        {
                            field: "user_id",
                            message: "User doesn't baskets record!",
                        },
                    ],
                };
            }

            const strategies = await Strategies.find({
                where: { baskets: baskets.basket_id, is_deleted: true },
            });
            if (!strategies) {
                return {
                    errors: [
                        {
                            field: "basket_id",
                            message: "User doesn't strategies record!",
                        },
                    ],
                };
            }

            return {
                strategies,
            };
        } else {
            return {
                strategies: null,
            };
        }
    }

    @Mutation(() => StrategyResponse)
    async retrieveStrategies(@Arg("id") id: string): Promise<StrategyResponse> {
        const strategies = await Strategies.findOne(id);

        if (!strategies) {
            return {
                errors: [
                    {
                        field: "id",
                        message: "User doesn't strategies record!",
                    },
                ],
            };
        }

        strategies.is_deleted = false;
        strategies.deleted_at = null;

        await strategies.save();

        return {
            strategies,
        };
    }

    @Mutation(() => StrategyBoolen)
    async deleteAllStrategies(@Arg("token") token: string): Promise<StrategyBoolen> {
        const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);

        const user = await Users.findOne(payload.userId);
        const strategies = await Strategies.delete({ created_by_user_id: user.id });

        if (!strategies) {
            return {
                errors: [
                    {
                        field: "id",
                        message: "User doesn't strategies record!",
                    },
                ],
                strategies: false,
            };
        }

        return {
            errors: [],
            strategies: true,
        };
    }
}
