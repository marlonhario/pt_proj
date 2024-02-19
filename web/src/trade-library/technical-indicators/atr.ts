export const atr = (enterOrExit: string, options: any, stockData: any) => {
  const ATR = require("technicalindicators").ATR;
  let low = [],
    high = [],
    close = [],
    method = [];

  stockData["trades"].map((trade, index) => {
    low[index] = stockData["trades"][index]["low"];
    high[index] = stockData["trades"][index]["high"];
    close[index] = stockData["trades"][index]["close"];
  });

  method = ATR.calculate({
    low: low,
    high: high,
    close: close,
    period: options["period"],
  });

  stockData["trades"].map((trade, index) => {
    if (index >= options["period"] - 1) {
      stockData["trades"][index]["signalValue"][enterOrExit]["atr"] =
        method[index];
    }
  });

  return stockData["trades"];
};
