import { ArgsType, Field, InputType, Int, ObjectType } from "type-graphql";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
import { Baskets } from "../../entity/Baskets";
@InputType()
export class GetStrategyProfileArgs {
    @Field({ nullable: true })
    id: string;

    @Field({ nullable: true })
    created_by_user_id: number;

    @Field({ nullable: true })
    trade_list_json?: string;

    @Field((type) => GraphQLJSON, { nullable: true })
    editor_json?: JSON;

    @Field({ nullable: true, defaultValue: 100 })
    average_hpr?: number;

    @Field({ nullable: true, defaultValue: 100 })
    average_position_length?: number;

    @Field({ nullable: true, defaultValue: 100 })
    backtest_quality_percent?: number;

    @Field({ nullable: true, defaultValue: 100 })
    balance_line_stability?: number;

    @Field({ nullable: true, defaultValue: 100 })
    bars_in_trade_number?: number;

    @Field({ nullable: true, defaultValue: 100 })
    bars_in_trade_percent?: number;

    @Field({ nullable: true })
    count_of_trades?: number;

    @Field({ nullable: true, defaultValue: 100 })
    max_consecutive_losses?: number;

    @Field({ nullable: true })
    max_drawdown_number?: number;

    @Field({ nullable: true, defaultValue: 100 })
    max_drawdown_percent?: number;

    @Field({ nullable: true, defaultValue: 100 })
    months_of_profit?: number;

    @Field({ nullable: true, defaultValue: 100 })
    net_balance?: number;

    @Field({ nullable: true })
    net_profit: number;

    @Field({ nullable: true, defaultValue: 100 })
    profit_factor?: number;

    @Field({ nullable: true })
    profit_per_day: number;

    @Field({ nullable: true, defaultValue: 100 })
    r_squared?: number;

    @Field({ nullable: true })
    return_drawdown?: number;

    @Field({ nullable: true, defaultValue: 100 })
    sharpe_ratio?: number;

    @Field({ nullable: true, defaultValue: 100 })
    max_stagnation_number?: number;

    @Field({ nullable: true, defaultValue: 100 })
    max_stagnation_percent?: number;

    @Field({ nullable: true, defaultValue: 100 })
    system_quality_number: number;

    @Field({ nullable: true, defaultValue: 100 })
    win_loss?: number;
}
