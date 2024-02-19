/**
 * @param enterOrExit
 * @param options
 * @param stockData
 */
export const fi = (enterOrExit: string, options: any, stockData: any) => {
  // const SMA = require('technicalindicators').SMA;
  // const EMA = require('technicalindicators').EMA;
  const FI = require("technicalindicators").FI;
  const EMA = require("technicalindicators").EMA;
  const SMA = require("technicalindicators").SMA;
  const WMA = require("technicalindicators").WMA;

  // stockData['trades'].map((trade, index) => (stockClose[index] = stockData['trades'][index]['close']));
  let high = stockData["trades"].map(
    (trade, index) => stockData["trades"][index]["high"]
  );
  let low = stockData["trades"].map(
    (trade, index) => stockData["trades"][index]["low"]
  );
  let close = stockData["trades"].map(
    (trade, index) => stockData["trades"][index]["close"]
  );
  let volume = stockData["trades"].map(
    (trade, index) => stockData["trades"][index]["volume"]
  );

  let fi = [];
  let smoothenFI = [];

  stockData["trades"].map((trade, index) => {
    if (index > 0) {
      let fiItem = close[index] - close[index - 1] * volume[index];
      fi.push(fiItem);
    }
    return null;
  });

  if (options["maMethod"] === "simple") {
    let smaFI = SMA.calculate({
      period: options["period"],
      values: fi,
    });
    smoothenFI.push(...smaFI);
  } else if (options["maMethod"] === "weighted") {
    let wmaFI = WMA.calculate({
      period: options["period"],
      values: fi,
    });
    smoothenFI.push(...wmaFI);
  } else if (options["maMethod"] === "exponential") {
    let emaFI = EMA.calculate({
      period: options["period"],
      values: fi,
    });
    smoothenFI.push(...emaFI);
  } else if (options["maMethod"] === "smoothed") {
    let smaFI = SMA.calculate({
      period: options["period"],
      values: fi,
    });
    let smma = [smaFI[0] / options["period"]];
    let period = options["period"];
    smaFI.map((sma, index) => {
      if (index > 0) {
        let smmaVal =
          smma[index - 1] * period * period -
          smma[index - 1] +
          close[index + period - 1] / period;
        smma.push(smmaVal);
      }
    });

    smoothenFI.push(...smma);
  }

  stockData["trades"].map((trade, index) => {
    if (index >= 1) {
      stockData["trades"][index]["signalValue"][enterOrExit]["fi"] =
        fi[index - 1];
    } else {
      stockData["trades"][index]["signalValue"][enterOrExit]["fi"] = 0;
    }
  });
  return stockData["trades"];
};
