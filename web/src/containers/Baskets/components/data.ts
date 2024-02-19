export const staticData = () => {
    const data = [
        {
            label: "Maximum average position length",
            text: "maximum_average_position_length",
            value: 100,
            hidden: false
        },
        {
            label: "Maximum bars in trade %",
            text: "maximum_bars_in_trade",
            value: 60,
            hidden: false
        },
        {
            label: "Maximum consecutive losses",
            text: "maximum_consecutive_losses",
            value: 10,
            hidden: false
        },
        {
            label: "Maximum count of trades",
            text: "maximum_count_of_trades",
            value: 60,
            hidden: false
        },
        {
            label: "Maximum equity drawdown",
            text: "maximum_equity_drawdown",
            value: 1000,
            hidden: false
        },
        {
            label: "Maximum equity drawdown %",
            text: "maximum_equity_drawdown_percent",
            value: 20,
            hidden: false
        },
        {
            label: "Maximum stagnation %",
            text: "maximum_stagnation",
            value: 30,
            hidden: false
        },
        {
            label: "Maximum stagnation days",
            text: "maximum_stagnation_days",
            value: 90,
            hidden: false
        },
        {
            label: "Minimum average HPR %",
            text: "minimum_average_hpr",
            value: 0.1,
            hidden: false
        },
        {
            label: "Minimum average position length",
            text: "minimum_average_position_length",
            value: 10,
            hidden: false
        },
        {
            label: "Minimum backtest quality",
            text: "minimum_backtest_quality",
            value: 98,
            hidden: false
        },
        {
            label: "Minimum balance stability",
            text: "minimum_balance_stability",
            value: 85,
            hidden: false
        },
        {
            label: "Minimum bars in trade %",
            text: "minimum_bars_in_trade",
            value: 10,
            hidden: false
        },
        {
            label: "Minimum count of trades",
            text: "minimum_count_of_trades",
            value: 50,
            hidden: false
        },
        {
            label: "Minimum months on profit %",
            text: "minimum_months_on_profit",
            value: 60,
            hidden: false
        },
        {
            label: "Minimum net profit",
            text: "minimum_net_profit",
            value: 0,
            hidden: true
        },
        {
            label: "Minimum profit factor",
            text: "minimum_profit_factor",
            value: 1,
            hidden: false
        },
        {
            label: "Minimum profit per day",
            text: "minimum_profit_per_day",
            value: 1,
            hidden: false
        },
        {
            label: "Minimum r - squared",
            text: "minimum_r_squared",
            value: 85,
            hidden: false
        },
        {
            label: "Minimum return / drawdown",
            text: "minimum_return_drawdown",
            value: 2,
            hidden: false
        },
        {
            label: "Minimum Sharpe ratio",
            text: "minimum_sharpe_ratio",
            value: 1,
            hidden: false
        },
        {
            label: "Minimum system quality number",
            text: "minimum_system_quality_number",
            value: 1,
            hidden: false
        },
        {
            label: "Minimum win / loss ratio",
            text: "minimum_win_loss_ratio",
            value: 0.5,
            hidden: false
        },
    ];

    const collection = [
        {
            label: "Net Balance",
            value: "net_balance"
        },
        {
            label: "System quality number",
            value: "system_quality_number"
        },
        {
            label: "Return / drawdown",
            value: "return_drawdown"
        },
        {
            label: "Win / loss",
            value: "win_loss"
        },
        {
            label: "Profit per day",
            value: "profit_per_day"
        },
        {
            label: "Sharpe ratio",
            value: "sharpe_ratio"
        },
        {
            label: "Average HPR",
            value: "average_hpr"
        },
        {
            label: "Profit factor",
            value: "profit_factor"
        },
        {
            label: "Stagnation",
            value: "max_stagnation_number"
        },
        {
            label: "Balance line stability",
            value: "balance_line_stability"
        },
        {
            label: "R - squared",
            value: "r_squared"
        },
    ];

    const records = [
        {
            label: "Pushed total strategies",
            value: 0
        },
        {
            label: "Added strategies",
            value: 0
        },
        {
            label: "Rejected duplicate strategies",
            value: 0
        },
        {
            label: "Resolved correlations",
            value: 0
        },
        {
            label: "Pruned excessive strategies",
            value: 0
        },
        {
            label: "Removed strategies",
            value: 0
        },
    ];

    const row1 = [
        {
            label: "Net Profit",
            value: "989.74 USD"
        },
        {
            label: "Profit per day",
            value: "0.45 USD"
        },
        {
            label: "Max drawdown",
            value: "3025.50 USD"
        },
        {
            label: "Return / drawdown",
            value: "0.33"
        },
        {
            label: "Count of trades",
            value: "504"
        },
    ];

    const row2 = [
        {
            label: "Net Profit",
            value: "726.89 USD"
        },
        {
            label: "Profit per day",
            value: "0.33 USD"
        },
        {
            label: "Max drawdown",
            value: "1397.78 USD"
        },
        {
            label: "Return / drawdown",
            value: "0.52"
        },
        {
            label: "Count of trades",
            value: "381"
        },
    ];

    const row3 = [
        {
            label: "Net Profit",
            value: "684.89 USD"
        },
        {
            label: "Profit per day",
            value: "0.31 USD"
        },
        {
            label: "Max drawdown",
            value: "937.27 USD"
        },
        {
            label: "Return / drawdown",
            value: "0.73"
        },
        {
            label: "Count of trades",
            value: "872"
        },
    ];

    const inputInitial = {
        maximum_average_position_length: "",
        maximum_average_position_length_value: 0,
        maximum_bars_in_trade: "",
        maximum_bars_in_trade_value: 0,
        maximum_consecutive_losses: "",
        maximum_consecutive_losses_value: 0,
        maximum_count_of_trades: "",
        maximum_count_of_trades_value: 0,
        maximum_equity_drawdown: "",
        maximum_equity_drawdown_value: 0,
        maximum_equity_drawdown_percent: "",
        maximum_equity_drawdown_percent_value: 0,
        maximum_stagnation: "",
        maximum_stagnation_value: 0,
        maximum_stagnation_days: "",
        maximum_stagnation_days_value: 0,
        minimum_average_hpr: "",
        minimum_average_hpr_value: 0,
        minimum_average_position_length: "",
        minimum_average_position_length_value: 0,
        minimum_backtest_quality: "",
        minimum_backtest_quality_value: 0,
        minimum_balance_stability: "",
        minimum_balance_stability_value: 0,
        minimum_bars_in_trade: "",
        minimum_bars_in_trade_value: 0,
        minimum_count_of_trades: "",
        minimum_count_of_trades_value: 0,
        minimum_months_on_profit: "",
        minimum_months_on_profit_value: 0,
        minimum_net_profit: "",
        minimum_net_profit_value: 0,
        minimum_profit_factor: "",
        minimum_profit_factor_value: 0,
        minimum_profit_per_day: "",
        minimum_profit_per_day_value: 0,
        minimum_r_squared: "",
        minimum_r_squared_value: 0,
        minimum_return_drawdown: "",
        minimum_return_drawdown_value: 0,
        minimum_sharpe_ratio: "",
        minimum_sharpe_ratio_value: 0,
        minimum_system_quality_number: "",
        minimum_system_quality_number_value: 0,
        minimum_win_loss_ratio: "",
        minimum_win_loss_ratio_value: 0
    };

    return {
        data_list: data,
        collection: collection,
        records: records,
        row1: row1,
        row2: row2,
        row3: row3,
        inputInitial: inputInitial
    }
}