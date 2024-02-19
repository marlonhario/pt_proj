/**
 * @param enterOrExit
 * @param options
 * @param stockData
 */
export const kst = (enterOrExit: string, options: any, stockData: any) => {
  // const SMA = require('technicalindicators').SMA;
  // const EMA = require('technicalindicators').EMA;
  const KST = require("technicalindicators").KST;

  // stockData['trades'].map((trade, index) => (stockClose[index] = stockData['trades'][index]['close']));
  // let high = stockData['trades'].map((trade, index) => stockData['trades'][index]['high'])
  // let low = stockData['trades'].map((trade, index) => stockData['trades'][index]['low'])
  let close = stockData["trades"].map(
    (trade, index) => stockData["trades"][index]["close"]
  );
  // let volume = stockData['trades'].map((trade, index) => stockData['trades'][index]['volume'])
  let kst = KST.calculate({
    close,
    ROCPer1: options["roc1"],
    ROCPer2: options["roc2"],
    ROCPer3: options["roc3"],
    ROCPer4: options["roc4"],
    SMAROCPer1: options["rocSma1"],
    SMAROCPer2: options["rocSma2"],
    SMAROCPer3: options["rocSma3"],
    SMAROCPer4: options["rocSma4"],
    period: options["signalPeriod"],
  });

  stockData["trades"].map((trade, index) => {
    if (index >= options["rocSma4"] + options["roc4"]) {
      stockData["trades"][index]["signalValue"][enterOrExit]["kst"] =
        kst[index]["kst"];
    } else {
      stockData["trades"][index]["signalValue"][enterOrExit]["kst"] = 0;
    }
  });
  return stockData["trades"];
};
