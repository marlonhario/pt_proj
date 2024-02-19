export const rsi = (enterOrExit: string, options: any, stockData: any) => {
    const RSI = require("technicalindicators").RSI;
    let priceValues = [];

    stockData["trades"].map((trade, index) => {
        switch (options["applyTo"]) {
            case "close":
                priceValues[index] = stockData["trades"][index]["close"];
                break;
            case "low":
                priceValues[index] = stockData["trades"][index]["low"];
                break;
            case "high":
                priceValues[index] = stockData["trades"][index]["high"];
                break;
            default:
                priceValues[index] = stockData["trades"][index]["close"];
                break;
        }
    });

    let method = RSI.calculate({
        period: options["period"],
        values: priceValues,
    });

    stockData["trades"].map((trade, index) => {
        if (index >= options["period"]) {
            stockData["trades"][index]["signalValue"][enterOrExit]["rsi"] = method[index - options["period"]];
        }
    });

    return stockData["trades"];
};
