import { indicatorCalculator } from "./others/indicator.calculator";
import { dataPrepper, prepareEditorData } from "./others/miscellaneous";
import { BackTesting } from "./strategies/back.testing";
import { PaperTrading } from "./strategies/paper.trading";
import axios from "axios";

export const IndicatorHelper = (options: any) => {
  let stockData;
  let indicators;
  let results = {
    status: 200,
    message: "",
    data: {
      stocks: {},
      indicators: { AO: {}, MACD: {} },
      backTestData: {},
      paperTrade: {},
    },
  };
  let editorData = {
    status: 200,
    message: "",
    data: {
      graph: [],
      backTest: {
        netProfit: 0,
        profitPerDay: 0,
        maxDrawdown: 0,
        drawdown: 0,
        tradeCount: 0,
      },
      balanceChart: [],
    },
  };
  let resultType =
    options["resultType"] === undefined || options["resultType"] === "editor"
      ? "editor"
      : "page";

  //STEP 1: Check parameters
  if (
    Object.keys(options.stocks).length === 0 || //{}
    (options.indicators.longEntryList.length === 0 &&
      options.indicators.shortEntryList.length === 0) ||
    (options.indicators.longExitList.length === 0 &&
      options.indicators.shortExitList.length === 0)
  ) {
    options.callback(editorData);
    return;
  }

  //STEP 2: Define variables
  stockData = dataPrepper(options.stocks);
  results.data.stocks = stockData;
  results.data.backTestData = stockData.joined;
  indicators = options.indicators;

  //STEP 3: Loop through indicator request
  let groupKeys = Object.keys(indicators);
  groupKeys.forEach((group) => {
    indicators[group].forEach((member) => {
      //For AO
      if (member.indicator === "AO") {
        indicatorCalculator({
          trade: group,
          indicator: "AO",
          data: {
            high: stockData.high,
            low: stockData.low,
            fastPeriod: member.fastPeriod,
            slowPeriod: member.slowPeriod,
            levelLine: member.levelLine,
            signal: member.signal,
            joinedData: results.data.backTestData,
            format: (a) => parseFloat(a.toFixed(2)),
          },
          callback: (result) => {
            results["data"]["indicators"]["AO"][group] = result.data.signal;
            results["data"]["backTestData"] = result.data.joinedData;
          },
        });
      }

      //For MACD
      if (member.indicator === "MACD") {
        indicatorCalculator({
          trade: group,
          indicator: "MACD",
          data: {
            values: stockData.close,
            fastPeriod: member.fastPeriod,
            slowPeriod: member.slowPeriod,
            signalPeriod: member.signalPeriod,
            SimpleMAOscillator: member.simpleMAOscillator,
            SimpleMASignal: member.simpleMASignal,
            signal: member.signal,
            joinedData: results.data.backTestData,
          },
          callback: (result) => {
            results["data"]["indicators"]["MACD"][group] = result.data.signal;
            results["data"]["backTestData"] = result.data.joinedData;
          },
        });
      }
    });
  });

  //STEP 6: Editor Data
  if (resultType === "editor") {
    let editorData = {
      status: 200,
      message: "",
      data: {
        graph: prepareEditorData(results["data"]["stocks"]["joined"]),
        backTest: {},
        balanceChart: [],
      },
    };

    axios({
      method: "post",
      url: `${process.env.REACT_APP_HOST}/request-back-testing`,
      data: {
        stoploss: options.stopLoss,
        stock: stockData.stock,
        slippage: options.slippage,
      },
    }).then((response) => {
      let datasource = response.data.data.statistics;
      editorData.data.backTest = {
        netProfit: datasource.profit,
        profitPerDay: datasource.profitPct,
        maxDrawdown: datasource.maxDrawdown,
        drawdown: datasource.maxDrawdownPct,
        tradeCount: datasource.totalTrades,
      };
      editorData.data.balanceChart = response.data.data.balance;
      options.callback(editorData);
    });
  } else {
    results["data"]["backTestData"] = BackTesting(
      results["data"]["backTestData"],
      {
        stopLoss: options.stopLoss,
        slippage: options.slippage,
      }
    );

    results["data"]["paperTrade"] = PaperTrading(stockData, options);
    options.callback(results);
  }
};
