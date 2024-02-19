export const BackTesting = (data: any, options: any) => {
  let dataKeys = Object.keys(data).sort();
  let shortPosition = 1;
  let longPosition = 1;
  let balance = 10000; //Starting Capital

  /**
   * Short, Long, Close, Take Profit, Stop Loss
   * @param signals object
   */
  let determineTrade = (position: string, signals: any) => {
    let keys = Object.keys(signals);
    let trade = "No";
    keys.forEach((key: string) => {
      if (signals[key][position] == false) trade = "Yes";
    });
    return trade;
  };

  let determinePosition = (trade: string, key: string) => {
    let position: number;

    if (trade === "Long") {
      position = longPosition;
      longPosition++;
    } else {
      position = shortPosition;
      shortPosition++;
    }

    return position;
  };

  dataKeys.forEach((key) => {
    let trade = data[key];

    //STEP 1: Determine Buy or Sell
    //If stopLoss is met then force closing of trade. Another way to check is the closing(exit) indicator
    data[key]["backtest"]["enterTrade"] = determineTrade("entry", trade.signal);
    data[key]["backtest"]["exitTrade"] = determineTrade("exit", trade.signal);
    data[key]["backtest"]["closeTrade"] = determineTrade("close", trade.signal);

    //STEP 2: Determine Trade Position
    data[key]["backtest"]["position"] = "---"; //determinePosition(tradeType, key);

    //STEP 3: Determine Amount -- Currently at zero no formula yet
    data[key]["backtest"]["amount"] = 10000;

    //STEP 8: Determine Slippage Factor
    data[key]["backtest"]["slippage"] =
      (trade.stock.high - trade.stock.open) * options.slippage;

    //STEP 4: Determine Price based on slippage
    data[key]["backtest"]["price"] =
      trade.stock.open + data[key]["backtest"]["slippage"];

    //STEP 5: Determine Stop Loss (Fixed or Trailing)
    data[key]["backtest"]["stopLoss"] = trade.stock.open * options.stopLoss;

    //Take Profit --> Manually entered (Not Used or Fixed)

    //STEP 6: Determine Take Profit -- Currently at zero no formula yet bar.close - position.entryPrice
    data[key]["backtest"]["profit"] = trade.stock.close - trade.stock.open;

    //STEP 7: Determine Balance -- Currently at zero no formula yet
    //Capital + Profit --> Need to add Capital as input key
    data[key]["backtest"]["balance"] =
      balance + parseFloat(data[key]["backtest"]["profit"]);
    balance = parseFloat(data[key]["backtest"]["balance"]);
  });

  return data;
};
