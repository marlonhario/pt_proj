export const generateData = () => {
  const data_list = [
    {
      label: "Maximum average position length",
      text: "maximum_average_position_length",
      value: 100,
    },
    {
      label: "Maximum bars in trade %",
      text: "maximum_bars_in_trade",
      value: 60,
    },
    {
      label: "Maximum consecutive losses",
      text: "maximum_consecutive_losses",
      value: 10,
    },
    {
      label: "Maximum count of trades",
      text: "maximum_count_of_trades",
      value: 60,
    },
    {
      label: "Maximum equity drawdown",
      text: "maximum_equity_drawdown",
      value: 1000,
    },
    {
      label: "Maximum equity drawdown %",
      text: "maximum_equity_drawdown_percent",
      value: 20,
    },
    {
      label: "Maximum stagnation %",
      text: "maximum_stagnation",
      value: 30,
    },
    {
      label: "Maximum stagnation days",
      text: "maximum_stagnation_days",
      value: 90,
    },
    {
      label: "Minimum average HPR %",
      text: "minimum_average_hpr",
      value: 0.1,
    },
    {
      label: "Minimum average position length",
      text: "minimum_average_position_length",
      value: 10,
    },
    {
      label: "Minimum backtest quality",
      text: "minimum_backtest_quality",
      value: 98,
    },
    {
      label: "Minimum balance stability",
      text: "minimum_balance_stability",
      value: 85,
    },
    {
      label: "Minimum bars in trade %",
      text: "minimum_bars_in_trade",
      value: 10,
    },
    {
      label: "Minimum count of trades",
      text: "minimum_count_of_trades",
      value: 50,
    },
    {
      label: "Minimum months on profit %",
      text: "minimum_months_on_profit",
      value: 60,
    },
    {
      label: "Minimum net profit",
      text: "minimum_net_profit",
      value: 0,
    },
    {
      label: "Minimum profit factor",
      text: "minimum_profit_factor",
      value: 1,
    },
    {
      label: "Minimum profit per day",
      text: "minimum_profit_per_day",
      value: 1,
    },
    {
      label: "Minimum r - squared",
      text: "minimum_r_squared",
      value: 85,
    },
    {
      label: "Minimum return / drawdown",
      text: "minimum_return_drawdown",
      value: 2,
    },
    {
      label: "Minimum Sharpe ratio",
      text: "minimum_sharpe_ratio",
      value: 1,
    },
    {
      label: "Minimum system quality number",
      text: "minimum_system_quality_number",
      value: 1,
    },
    {
      label: "Minimum win / loss ratio",
      text: "minimum_win_loss_ratio",
      value: 0.5,
    },
  ]

  const initial_data_list = [
    {
      label: "Minimum net profit",
      text: "minimum_net_profit",
      value: 0,
    },
    {
      label: "Minimum count of trades",
      text: "minimum_count_of_trades",
      value: 50,
    },
  ]

  const complete_initial = [{
    text: "minimum_net_profit",
    label: "Minimum net profit",
    value: 0
  },
  {
    text: "minimum_count_of_trades",
    label: "Minimum count of trades",
    value: 50
  }]

  const in_sample_initial = [{
    text: "minimum_net_profit",
    label: "Minimum net profit",
    value: 0
  }]

  const out_sample_initial = [{
    text: "minimum_net_profit",
    label: "Minimum net profit",
    value: 0
  }]

  return {
    data_list,
    initial_data_list,
    complete_initial,
    in_sample_initial,
    out_sample_initial
  }

}