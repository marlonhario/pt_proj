export const awesomeoscillator = (
  enterOrExit: string,
  stockData: any,
  fastPeriod: number = 5,
  slowPeriod: number = 34
) => {
  const SMA = require("technicalindicators").SMA;
  let SMA5 = [];
  let SMA34 = [];

  /**
   * STEP 1: Get SMA5 (take note Media Price is computed on dataPrepper() function)
   */
  SMA5 = SMA.calculate({
    period: fastPeriod,
    values: stockData["medianPrice"],
  });

  /**
   * STEP 2: Get SMA34 (take note Media Price is computed on dataPrepper() function)
   */
  SMA34 = SMA.calculate({
    period: slowPeriod,
    values: stockData["medianPrice"],
  });

  /**
   * STEP 3: Compute Awesome Oscillator value
   */
  stockData["trades"].map((trade, index) => {
    if (index >= slowPeriod) {
      stockData["trades"][index]["sma5"] = SMA5[index];
      stockData["trades"][index]["sma34"] = SMA34[index];
      stockData["trades"][index]["signalValue"][enterOrExit][
        "awesome_oscillator"
      ] = SMA5[index] - SMA34[index];
    } else {
      stockData["trades"][index]["sma5"] = null;
      stockData["trades"][index]["sma34"] = null;
      stockData["trades"][index]["signalValue"][enterOrExit][
        "awesome_oscillator"
      ] = null;
    }
  });

  /**
   * STEP 4: Return Awesome Oscillator calculation
   */
  return stockData["trades"];
};

export const awesomeoscillator_signal = (
  tradeData,
  activity,
  signal,
  levelLine
) => {
  tradeData.map((trade, index) => {
    if (signal === "above_level_line") {
      if (trade["signalValue"][activity]["awesome_oscillator"] > levelLine) {
        tradeData[index][activity]["long"].push(true);
        tradeData[index][activity]["short"].push(false);
      } else {
        tradeData[index][activity]["long"].push(false);
        tradeData[index][activity]["short"].push(true);
      }
    }
    if (signal === "below_level_line") {
      if (trade["signalValue"][activity]["awesome_oscillator"] < levelLine) {
        tradeData[index][activity]["long"].push(true);
        tradeData[index][activity]["short"].push(false);
      } else {
        tradeData[index][activity]["long"].push(false);
        tradeData[index][activity]["short"].push(true);
      }
    }
    if (signal === "rises") {
      if (
        trade["signalValue"][activity]["awesome_oscillator"] >
        tradeData[index - 1]["signalValue"][activity]["awesome_oscillator"]
      ) {
        tradeData[index][activity]["long"].push(true);
        tradeData[index][activity]["short"].push(false);
      } else {
        tradeData[index][activity]["long"].push(false);
        tradeData[index][activity]["short"].push(true);
      }
    }
    if (signal === "falls") {
      if (
        trade["signalValue"][activity]["awesome_oscillator"] <
        tradeData[index - 1]["signalValue"][activity]["awesome_oscillator"]
      ) {
        tradeData[index][activity]["long"].push(true);
        tradeData[index][activity]["short"].push(false);
      } else {
        tradeData[index][activity]["long"].push(false);
        tradeData[index][activity]["short"].push(true);
      }
    }
    if (signal === "crosses_upward") {
      let condition1 =
        trade["signalValue"][activity]["awesome_oscillator"] >
        tradeData[index - 1]["signalValue"][activity]["awesome_oscillator"];
      let condition2 =
        tradeData[index - 1]["signalValue"][activity]["awesome_oscillator"] <
        levelLine;
      let condition3 =
        trade["signalValue"][activity]["awesome_oscillator"] > levelLine;
      if (condition1 && condition2 && condition3) {
        tradeData[index][activity]["long"].push(true);
        tradeData[index][activity]["short"].push(false);
      } else {
        tradeData[index][activity]["long"].push(false);
        tradeData[index][activity]["short"].push(true);
      }
    }
    if (signal === "crosses_downward") {
      let condition1 =
        trade["signalValue"][activity]["awesome_oscillator"] <
        tradeData[index - 1]["signalValue"][activity]["awesome_oscillator"];
      let condition2 =
        tradeData[index - 1]["signalValue"][activity]["awesome_oscillator"] >
        levelLine;
      let condition3 =
        trade["signalValue"][activity]["awesome_oscillator"] < levelLine;
      if (condition1 && condition2 && condition3) {
        tradeData[index][activity]["long"].push(true);
        tradeData[index][activity]["short"].push(false);
      } else {
        tradeData[index][activity]["long"].push(false);
        tradeData[index][activity]["short"].push(true);
      }
    }
  });

  return tradeData;
};
