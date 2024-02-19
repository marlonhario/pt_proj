export const staticData = () => {
    const backMarketData = [
        {
            id: 1,
            name: "Net Profit",
            value: 0,
            visible: true,
            index: 0,
            targetValue: 5000,
            setting: "GREATER",
            accessor: "netProfit",
        },
        {
            id: 2,
            name: "Profit per day",
            value: 0,
            visible: true,
            index: 1,
            targetValue: 20,
            setting: "GREATER",
            accessor: "profitPerDay",
        },
        {
            id: 3,
            name: "Max drawdown",
            value: 0,
            visible: true,
            index: 2,
            targetValue: 500,
            setting: "LESSER",
            accessor: "maxDrawDown",
        },
        {
            id: 4,
            name: "Return / drawdown",
            value: 0,
            visible: true,
            index: 3,
            targetValue: 2,
            setting: "GREATER",
            accessor: "drawdown",
        },
        {
            id: 5,
            name: "Count of trades",
            value: 0,
            visible: true,
            index: 4,
            targetValue: 4000,
            setting: "LESSER",
            accessor: "tradeCount",
        },
    ];

    const marketInterval = [
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
    ];

    const indicatorList = [
        {
            label: "ADX",
            value: "ADX.json",
        },
        {
            label: "Bollinger Bands (BB)",
            value: "BB.json",
        },
        {
            label: "Awesome Oscillator",
            value: "AwesomeOscillator.json",
        },
        {
            label: "MACD",
            value: "MACD.json",
        },
        {
            label: "Moving Average",
            value: "MovingAverage.json",
        },
        {
            label: "On Balance Volume",
            value: "OnBalanceVolume.json",
        },
        {
            label: "Money Flow Index",
            value: "MoneyFlowIndex.json",
        },
        {
            label: "Commodity Channel Index",
            value: "CommodityChannelIndex.json",
        },
        {
            label: "Relative Strength Index (RSI)",
            value: "RSI.json",
        },
        {
            label: "Know Sure Thing",
            value: "KST.json",
        },
        {
            label: "Force Index",
            value: "FI.json",
        },
        {
            label: "WilliamsR",
            value: "WPR.json",
        },
        {
            label: "ADL",
            value: "ADL.json",
        },
        {
            label: "Average True Range",
            value: "ATR.json",
        },
        {
            label: "Envelope",
            value: "ENV.json",
        },
        {
            label: "ALMA",
            value: "ALMA.json",
        },
        {
            label: "Chaikin Oscillator (CO)",
            value: "CO.json",
        },
        {
            label: "Least Squares Moving Average",
            value: "LSMA.json",
        },
        {
            label: "Ultimate Oscillator",
            value: "UO.json",
        },
        {
            label: "Aroon",
            value: "AROON.json",
        },
        {
            label: "Balance of Power",
            value: "BOP.json",
        },
        {
            label: "Bollinger Bands %B (%B)",
            value: "PercentageBand.json",
        },
        {
            label: "Bollinger Bands Width (BBW)",
            value: "BBW.json",
        },
        {
            label: "Chaikin Money Flow (CMF)",
            value: "CMF.json",
        },
        {
            label: "Volume-Weighted Moving Average (VWMA)",
            value: "VWMA.json",
        },
        {
            label: "Choppiness Index (CHOP)",
            value: "CHOP.json",
        },
    ];

    return {
        backMarketData,
        marketInterval,
        indicatorList,
    };
};
