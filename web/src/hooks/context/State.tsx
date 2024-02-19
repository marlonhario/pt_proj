export interface basketData {
    id: string;
    net_profit: number;
    profit_per_day: number;
    count_of_trades: number;
    max_drawdown_number: number;
    return_drawdown: number;
    original_created_date: Date;
    deleted_at: Date;
}

export interface basketState {
    sort_collection: string;
    sort_order: string;
    start: number;
    end: number;
    trash_strategies: basketData[];
}

export interface marketdetailState {
    input_symbols: string;
}

export interface filterBasketInputState {
    maximum_average_position_length: string;
    maximum_average_position_length_value: number;
    maximum_bars_in_trade: string;
    maximum_bars_in_trade_value: number;
    maximum_consecutive_losses: string;
    maximum_consecutive_losses_value: number;
    maximum_count_of_trades: string;
    maximum_count_of_trades_value: number;
    maximum_equity_drawdown: string;
    maximum_equity_drawdown_value: number;
    maximum_equity_drawdown_percent: string;
    maximum_equity_drawdown_percent_value: number;
    maximum_stagnation: string;
    maximum_stagnation_value: number;
    maximum_stagnation_days: string;
    maximum_stagnation_days_value: number;
    minimum_average_hpr: string;
    minimum_average_hpr_value: number;
    minimum_average_position_length: string;
    minimum_average_position_length_value: number;
    minimum_backtest_quality: string;
    minimum_backtest_quality_value: number;
    minimum_balance_stability: string;
    minimum_balance_stability_value: number;
    minimum_bars_in_trade: string;
    minimum_bars_in_trade_value: number;
    minimum_count_of_trades: string;
    minimum_count_of_trades_value: number;
    minimum_months_on_profit: string;
    minimum_months_on_profit_value: number;
    minimum_net_profit: string;
    minimum_net_profit_value: number;
    minimum_profit_factor: string;
    minimum_profit_factor_value: number;
    minimum_profit_per_day: string;
    minimum_profit_per_day_value: number;
    minimum_r_squared: string;
    minimum_r_squared_value: number;
    minimum_return_drawdown: string;
    minimum_return_drawdown_value: number;
    minimum_sharpe_ratio: string;
    minimum_sharpe_ratio_value: number;
    minimum_system_quality_number: string;
    minimum_system_quality_number_value: number;
    minimum_win_loss_ratio: string;
    minimum_win_loss_ratio_value: number;
}

export interface timeState {
    count: number;
}