import { InputType, Field } from "type-graphql";

@InputType()
export class StrategiesCriteria {
    @Field({ nullable: true })
    maximum_average_position_length?: string;
    @Field({ nullable: true })
    maximum_average_position_length_value?: number;

    @Field({ nullable: true })
    maximum_bars_in_trade?: string;
    @Field({ nullable: true })
    maximum_bars_in_trade_value?: number;

    @Field({ nullable: true })
    maximum_consecutive_losses?: string;
    @Field({ nullable: true })
    maximum_consecutive_losses_value?: number;

    @Field({ nullable: true })
    maximum_count_of_trades?: string;
    @Field({ nullable: true })
    maximum_count_of_trades_value?: number;

    @Field({ nullable: true })
    maximum_equity_drawdown?: string;
    @Field({ nullable: true })
    maximum_equity_drawdown_value?: number;

    @Field({ nullable: true })
    maximum_equity_drawdown_percent?: string;
    @Field({ nullable: true })
    maximum_equity_drawdown_percent_value?: number;

    @Field({ nullable: true })
    maximum_stagnation?: string;
    @Field({ nullable: true })
    maximum_stagnation_value?: number;

    @Field({ nullable: true })
    maximum_stagnation_days?: string;
    @Field({ nullable: true })
    maximum_stagnation_days_value?: number;

    @Field({ nullable: true })
    minimum_average_hpr?: string;
    @Field({ nullable: true })
    minimum_average_hpr_value?: number;

    @Field({ nullable: true })
    minimum_average_position_length?: string;
    @Field({ nullable: true })
    minimum_average_position_length_value?: number;

    @Field({ nullable: true })
    minimum_backtest_quality?: string;
    @Field({ nullable: true })
    minimum_backtest_quality_value?: number;

    @Field({ nullable: true })
    minimum_balance_stability?: string;
    @Field({ nullable: true })
    minimum_balance_stability_value?: number;

    @Field({ nullable: true })
    minimum_bars_in_trade?: string;
    @Field({ nullable: true })
    minimum_bars_in_trade_value?: number;

    @Field({ nullable: true })
    minimum_count_of_trades?: string;
    @Field({ nullable: true })
    minimum_count_of_trades_value?: number;

    @Field({ nullable: true })
    minimum_months_on_profit?: string;
    @Field({ nullable: true })
    minimum_months_on_profit_value?: number;

    @Field({ nullable: true })
    minimum_net_profit?: string;
    @Field({ nullable: true })
    minimum_net_profit_value?: number;

    @Field({ nullable: true })
    minimum_profit_factor?: string;
    @Field({ nullable: true })
    minimum_profit_factor_value?: number;

    @Field({ nullable: true })
    minimum_profit_per_day?: string;
    @Field({ nullable: true })
    minimum_profit_per_day_value?: number;

    @Field({ nullable: true })
    minimum_r_squared?: string;
    @Field({ nullable: true })
    minimum_r_squared_value?: number;

    @Field({ nullable: true })
    minimum_return_drawdown?: string;
    @Field({ nullable: true })
    minimum_return_drawdown_value?: number;

    @Field({ nullable: true })
    minimum_sharpe_ratio?: string;
    @Field({ nullable: true })
    minimum_sharpe_ratio_value?: number;

    @Field({ nullable: true })
    minimum_system_quality_number?: string;
    @Field({ nullable: true })
    minimum_system_quality_number_value?: number;

    @Field({ nullable: true })
    minimum_win_loss_ratio?: string;
    @Field({ nullable: true })
    minimum_win_loss_ratio_value?: number;
}