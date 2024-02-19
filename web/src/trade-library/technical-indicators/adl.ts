export const adl = (enterOrExit: string, options: any, stockData: any) => {
    const ADL = require("technicalindicators").ADL;

    let low, high, close, volume;

    stockData["trades"].map((trade, index) => {
        low[index] = stockData["trades"][index]["low"];
        high[index] = stockData["trades"][index]["high"];
        close[index] = stockData["trades"][index]["close"];
        volume[index] = stockData["trades"][index]["volume"];
    });

    let method = ADL.calculate({
        low: low,
        high: high,
        close: close,
        volume: volume,
    });

    stockData["trades"].map((trade, index) => {
        stockData["trades"][index]["signalValue"][enterOrExit]["adl"] = method[index];
    });

    return stockData["trades"];
};
