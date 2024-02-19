import { sma } from "technicalindicators/lib/moving_averages/SMA";

/**
 * @param enterOrExit
 * @param options
 * @param stockData
 */
export const cci = (enterOrExit: string, options: any, stockData: any) => {
  // const SMA = require('technicalindicators').SMA;
  // const EMA = require('technicalindicators').EMA;
  const CCI = require("technicalindicators").CCI;

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
  let open = stockData["trades"].map(
    (trade, index) => stockData["trades"][index]["open"]
  );

  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
  function standardDeviation(numbersArr) {
    //--CALCULATE AVAREGE--
    var total = 0;
    for (var key in numbersArr) total += numbersArr[key];
    var meanVal = total / numbersArr.length;
    //--CALCULATE AVAREGE--

    //--CALCULATE STANDARD DEVIATION--
    var SDprep = 0;
    for (var key in numbersArr)
      SDprep += Math.pow(parseFloat(numbersArr[key]) - meanVal, 2);
    var SDresult = Math.sqrt(SDprep / numbersArr.length);
    //--CALCULATE STANDARD DEVIATION--
    // alert(SDresult);
    return SDresult;
  }
  let period = options["period"] || 20;
  let typicalPrice = stockData["trades"].map((item, index) => {
    return item["high"] + item["low"] + item["close"] / 3;
  });

  let smaTp = typicalPrice.map((price, index) => {
    if (index >= period) {
      return average(typicalPrice.slice(index - 20, index));
    }
    return 0;
  });

  let meanDeviation = typicalPrice.map((price, index) => {
    if (index >= period) {
      return standardDeviation(typicalPrice.slice(index - 20, index));
    }
    return 0;
  });
  //
  let cciComputation = () => {
    let cci = stockData["trades"].map((item, index) => {
      if (index >= period) {
        let appliedTo;
        if (options["applyTo"] === "typical") {
          appliedTo = typicalPrice[index];
        } else if (options["applyTo"] === "weighted") {
          appliedTo = stockData["medianPrice"][index];
        } else if (options["applyTo"] === "median") {
          appliedTo = typicalPrice[index];
        } else if (options["applyTo"] === "high") {
          appliedTo = item["high"];
        } else if (options["applyTo"] === "low") {
          appliedTo = item["low"];
        } else if (options["applyTo "] === "close") {
          appliedTo = item["close"];
        } else if (options["applyTo"] === "open") {
          appliedTo = item["open"];
        }
        let movingAverage = smaTp;
        const lambertConstant = 0.015;
        let meanDev = lambertConstant * meanDeviation[index];

        return (appliedTo - movingAverage) / meanDev;
      }
      return 0;
    });

    return cci;
  };
  let cciVal = cciComputation();

  stockData["trades"].map((trade, index) => {
    if (index >= options["period"]) {
      stockData["trades"][index]["signalValue"][enterOrExit]["cci"] =
        cciVal[index];
    } else {
      stockData["trades"][index]["signalValue"][enterOrExit]["cci"] = 0;
    }
  });
  return stockData["trades"];
};
