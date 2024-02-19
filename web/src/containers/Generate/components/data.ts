export const data = () => {
    const numberic_values_range = [
        {
            label: "± 5 steps",
            value: "5steps",
        },
        {
            label: "± 10 steps",
            value: "10steps",
        },
        {
            label: "± 15 steps",
            value: "15steps",
        },
        {
            label: "± 20 steps",
            value: "20steps",
        },
        {
            label: "± 25 steps",
            value: "25steps",
        },
        {
            label: "± 30 steps",
            value: "30steps",
        },
        {
            label: "± 35 steps",
            value: "35steps",
        },
        {
            label: "± 40 steps",
            value: "40steps",
        },
    ];

    const search_best = [
        {
            label: "Net Balance",
            value: "net_balance",
        },
        {
            label: "Return / drawdown",
            value: "return_drawdown",
        },
        {
            label: "System quality number",
            value: "system_quality_number",
        },
        {
            label: "Win / loss",
            value: "win_loss",
        },
        {
            label: "Sharpe ratio",
            value: "sharpge_ratio",
        },
        {
            label: "Profit factor",
            value: "profit_factor",
        },
        {
            label: "Profit",
            value: "profit",
        },
        {
            label: "Balance line stability",
            value: "balance_line_stability",
        },
        {
            label: "R - squared",
            value: "rsquared",
        },
        {
            label: "Stagnation",
            value: "stagnation",
        },
    ];

    const sample = [
        {
            label: "In sample",
            value: "is",
        },
        {
            label: "10 % OOS",
            value: "10",
        },
        {
            label: "20 % OOS",
            value: "20",
        },
        {
            label: "30 % OOS",
            value: "30",
        },
        {
            label: "40 % OOS",
            value: "40",
        },
        {
            label: "50 % OOS",
            value: "50",
        },
    ];

    const entry_number = [
        {
            label: "1",
            value: 1,
        },
        {
            label: "2",
            value: 2,
        },
        {
            label: "3",
            value: 3,
        },
        {
            label: "4",
            value: 4,
        },
        {
            label: "5",
            value: 5,
        },
        {
            label: "6",
            value: 6,
        },
        {
            label: "7",
            value: 7,
        },
        {
            label: "8",
            value: 8,
        },
        {
            label: "9",
            value: 9,
        },
        {
            label: "10",
            value: 10,
        },
        {
            label: "11",
            value: 11,
        },
        {
            label: "12",
            value: 12,
        },
    ];

    const numberic_values_steps = [
        {
            label: "5 steps",
            value: "5steps",
        },
        {
            label: "10 steps",
            value: "10steps",
        },
        {
            label: "15 steps",
            value: "15steps",
        },
        {
            label: "20 steps",
            value: "20steps",
        },
        {
            label: "25 steps",
            value: "25steps",
        },
        {
            label: "30 steps",
            value: "30steps",
        },
        {
            label: "35 steps",
            value: "35steps",
        },
        {
            label: "40 steps",
            value: "40steps",
        },
    ];

    const count_of_tests = [
        {
            label: 10,
            value: 10,
        },
        {
            label: 20,
            value: 20,
        },
        {
            label: 30,
            value: 30,
        },
        {
            label: 40,
            value: 40,
        },
        {
            label: 50,
            value: 50,
        },
        {
            label: 60,
            value: 60,
        },
        {
            label: 70,
            value: 70,
        },
        {
            label: 80,
            value: 80,
        },
        {
            label: 90,
            value: 90,
        },
        {
            label: 100,
            value: 100,
        },
        {
            label: 200,
            value: 200,
        },
        {
            label: 300,
            value: 300,
        },
        {
            label: 400,
            value: 400,
        },
        {
            label: 500,
            value: 500,
        },
    ];

    const validated_tests = [
        {
            label: "50 %",
            value: "50",
        },
        {
            label: "60 %",
            value: "60",
        },
        {
            label: "70 %",
            value: "70",
        },
        {
            label: "80 %",
            value: "80",
        },
        {
            label: "90 %",
            value: "90",
        },
        {
            label: "95 %",
            value: "95",
        },
        {
            label: "100 %",
            value: "100",
        },
    ];

    const data1 = [
        {
            label: "Generated strategies",
            value: "0",
        },
        {
            label: "Passed validation",
            value: "0 (0 %)",
        },
    ];

    const data2 = [
        {
            label: "Calculated strategies",
            value: "0",
        },
        {
            label: "Optimized strategies",
            value: "0 (0 %)",
        },
        {
            label: "Passed validation",
            value: "0 (0 %)",
        },
    ];

    const use = [
        {
            label: "Always use",
            value: "au",
        },
        {
            label: "May use",
            value: "mu",
        },
        {
            label: "Do not use",
            value: "dns",
        },
    ];

    const dataSource = [
        {
            label: "MetaTrader-Demo",
            value: "metatrader-demo",
        },
    ];

    const symbol = [
        {
            label: "AUDUSD",
            value: "AUDUSD",
        },
        {
            label: "EURCHF",
            value: "EURCHF",
        },
        {
            label: "EURGBP",
            value: "EURGBP",
        },
        {
            label: "EURJPY",
            value: "EURJPY",
        },
        {
            label: "EURUSD",
            value: "EURUSD",
        },
        {
            label: "GBPUSD",
            value: "GBPUSD",
        },
        {
            label: "NZDUSD",
            value: "NZDUSD",
        },
        {
            label: "USDCAD",
            value: "USDCAD",
        },
        {
            label: "USDCHF",
            value: "USDCHF",
        },
        {
            label: "USDJPY",
            value: "USDJPY",
        },
    ];

    const period = [
        {
            label: "M1",
            value: "1min",
        },
        {
            label: "M5",
            value: "5min",
        },
        {
            label: "M15",
            value: "15min",
        },
        {
            label: "M30",
            value: "30min",
        },
        {
            label: "H1",
            value: "60min",
        },
        {
            label: "H4",
            value: "240min",
        },
        {
            label: "D1",
            value: "1440min",
        },
    ];

    const typeStopLoss = [
        {
            label: "Fixed",
            value: "fixed",
        },
        {
            label: "Trailing",
            value: "trailing",
        },
        {
            label: "Fixed or Trailing",
            value: "fixedOrtrailing",
        },
    ];

    const listATR = ["AO", "MACD"];
    const listADX = ["ADX rises", "ADX falls"];
    const listAwesome = [
        "AC Rises",
        "AC Falls",
        "AC is higher than the level line",
        "AC is lower than the level line",
        "AC is crosses the level line upward",
        "AC is crosses the level line downward",
        "AC is changes its direction upward",
        "AC is changes its direction downward",
    ];
    const listMACD = [
        "MACD lines rises",
        "MACD line falls",
        "MACD line is higher than the Zero line",
        "MACD line is lower than the Zero line",
        "MACD line crosses the zero line upward",
        "MACD line crosses the zero line downward",
        "MACD line changes its direction upward",
        "MACD line changes its direction downward",
    ];

    const staticSignal = [
        "above_level_line",
        "below_level_line",
        "rises",
        "falls",
        "crosses_upward",
        "crosses_downward",
        "change_upward",
        "change_downward",
    ];

    return {
        numberic_values_range,
        search_best,
        sample,
        entry_number,
        numberic_values_steps,
        dataSource,
        symbol,
        period,
        use,
        count_of_tests,
        validated_tests,
        data1,
        data2,
        typeStopLoss,
        listATR,
        listADX,
        listAwesome,
        listMACD,
        staticSignal,
    };
};
