export const co = (enterOrExit: string, options: any, stockData: any) => {
    const EMA = require("technicalindicators").EMA;
    const ADL = require("technicalindicators").ADL;

    let low = [],
        high = [],
        close = [],
        volume = [];

    stockData["trades"].map((trade, index) => {
        low[index] = stockData["trades"][index]["low"];
        high[index] = stockData["trades"][index]["high"];
        close[index] = stockData["trades"][index]["close"];
        volume[index] = stockData["trades"][index]["volume"];
    });

    let adlMethod = ADL.calculate({
        low: low,
        high: high,
        close: close,
        volume: volume,
    });

    let fastPeriod = EMA.calculate({
        period: options["fastPeriod"],
        values: adlMethod,
    });

    let slowPeriod = EMA.calculate({
        period: options["slowPeriod"],
        values: adlMethod,
    });

    stockData["trades"].map((trade, index) => {
        stockData["trades"][index]["signalValue"][enterOrExit]["co"] = fastPeriod[index] - slowPeriod[index];
    });

    return stockData["trades"];
};
