/**
 * @param enterOrExit
 * @param options
 * @param stockData
 */
export const wpr = (enterOrExit: string, options: any, stockData: any) => {
  // const SMA = require('technicalindicators').SMA;
  // const EMA = require('technicalindicators').EMA;
  const WilliamsR = require("technicalindicators").WilliamsR;

  // stockData['trades'].map((trade, index) => (stockClose[index] = stockData['trades'][index]['close']));
  let close = stockData["trades"].map(
    (trade, index) => stockData["trades"][index]["close"]
  );
  let high = stockData["trades"].map(
    (trade, index) => stockData["trades"][index]["high"]
  );
  let low = stockData["trades"].map(
    (trade, index) => stockData["trades"][index]["low"]
  );

  let wpr = WilliamsR.calculate({
    close,
    low,
    high,
    period: options["period"],
  });

  stockData["trades"].map((trade, index) => {
    if (index >= options["period"]) {
      stockData["trades"][index]["signalValue"][enterOrExit]["wpr"] =
        wpr[index];
    } else {
      stockData["trades"][index]["signalValue"][enterOrExit]["wpr"] = null;
    }
  });
  return stockData["trades"];
};
