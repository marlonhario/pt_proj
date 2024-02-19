import { dataPrepper, processSignal } from "./helpers/miscellaneous";
import { awesomeoscillator } from "./technical-indicators/awesomeoscillator";
import { PTMacd as macd } from "./technical-indicators/macd";
import toFixed from "accounting-js/lib/toFixed.js";
import PortfolioAnalytics from "portfolio-analytics";
import { movingaverage } from "./technical-indicators/movingaverage";
import { obv } from "./technical-indicators/obv";
import { mfi } from "./technical-indicators/mfi";
import { cci } from "./technical-indicators/cci";
import { adx } from "./technical-indicators/adx";
import { rsi } from "./technical-indicators/rsi";
import { bb } from "./technical-indicators/bb";
import { fi } from "./technical-indicators/fi";
import { kst } from "./technical-indicators/kst";
import { wpr } from "./technical-indicators/wpr";
import { adl } from "./technical-indicators/adl";
import { atr } from "./technical-indicators/atr";
import { alma } from "./technical-indicators/alma";
import { co } from "./technical-indicators/co";
import { env } from "./technical-indicators/envelope";
import { lsma } from "./technical-indicators/lsma";
import { uo } from "./technical-indicators/ultimateoscillator";
import { aroon } from "./technical-indicators/aroon";
import { vwma } from "./technical-indicators/vwma";
import { bop } from "./technical-indicators/bop";
import { percentBandwidth } from "./technical-indicators/percentbandwidth";
import { bbw } from "./technical-indicators/bbw";
import { cmf } from "./technical-indicators/cmf";
import { chop } from "./technical-indicators/chop";

//Test Marx - 4
const Window = require("window");

const window = new Window();
export default class PTBackTest {
    /**
     *Required settings for back testing - Merged Automation added
     */
    settings = {
        stockData: {},
        technicalIndicators: [],
        stopLoss: { isEnabled: false, type: "fixed", value: 0 }, //Type = fixed or trail
        takeProfit: { isEnabled: false, value: 0 },
        balance: 10000,
        startingBar: 100,
        tradeSize: 10000,
        spread: 0,
    };
    isValidatingBackTest = false;

    /**
     * Initialize back test settings
     *
     * @param options any
     */
    constructor(options) {
        this.isValidatingBackTest = window.location.hash === "#validate" ? true : false;

        if (this.isValidatingBackTest) {
            console.log("############# VALIDATING BACK TEST #############");
            let testData = require("./testing/validation-data.json");
            options = require("./testing/validation-settings.json");
            this.settings.stockData = dataPrepper(testData);
            this.settings.technicalIndicators = options["technicalIndicators"];
            this.settings.stopLoss = options.hasOwnProperty("stopLoss") ? options["stopLoss"] : this.settings.stopLoss;
            this.settings.takeProfit = options.hasOwnProperty("takeProfit") ? options["takeProfit"] : this.settings.takeProfit;
            this.settings.balance = options.hasOwnProperty("balance") ? options["balance"] : this.settings.balance;
            this.settings.startingBar = options.hasOwnProperty("startingBar") ? options["startingBar"] : this.settings.startingBar;
            this.settings.tradeSize = options.hasOwnProperty("tradeSize") ? options["tradeSize"] : this.settings.tradeSize;
            this.settings.spread = options.hasOwnProperty("spread") ? options["spread"] : this.settings.spread;
        } else {
            console.log("############# BACKTEST RECEIVED PARAMS #############");
            // console.log(options);

            this.settings.stockData =
                typeof options["stockData"] !== "object" ? dataPrepper(JSON.parse(options["stockData"])) : dataPrepper(options["stockData"]);
            this.settings.technicalIndicators = options["technicalIndicators"];
            options["stockData"] = [];
            // console.log(JSON.stringify(options));
            this.settings.stopLoss = options.hasOwnProperty("stopLoss") ? options["stopLoss"] : this.settings.stopLoss;
            this.settings.takeProfit = options.hasOwnProperty("takeProfit") ? options["takeProfit"] : this.settings.takeProfit;
            this.settings.balance = options.hasOwnProperty("balance") ? options["balance"] : this.settings.balance;
            this.settings.startingBar = options.hasOwnProperty("startingBar") ? options["startingBar"] : this.settings.startingBar;
            this.settings.tradeSize = options.hasOwnProperty("tradeSize") ? options["tradeSize"] : this.settings.tradeSize;
            this.settings.spread = options.hasOwnProperty("spread") ? options["spread"] : this.settings.spread;
            console.log("test", this.settings.stockData, options);
        }
    }

    backtest() {
        /*******************************************************************************
         * Bact Test Variable Declaration
         *
         *******************************************************************************/
        let indicatorsList = { enter: [], exit: [] };
        let tradeList = [];
        let previousTradePosition = "";
        let currentTradePosition = "";
        let runningBalance = this.settings.tradeSize;
        let tradeId = 1;
        let netProfit = 0;
        let dateList = [];
        let tradePosition = 1;
        let backTestResult = {
            netProfit: 0,
            profitPerDay: 0,
            maxDrawDown: 0,
            drawdown: 0,
            tradeCount: 0,
            trade: [],
            balanceChart: [],
            timestamp: Math.random(),
        };
        let prevBalance = this.settings.tradeSize;
        let profit = 0;
        let prevProfit = 0;
        let currProfit = 0;
        let tradeTime = "";
        let amount = this.settings.tradeSize;
        let price = 0;
        let prevPrice = 0;
        let takeProfit = 0;
        let drawdownList = [];
        let tradeCount = 0;
        let prevailingStopLoss = 0;
        let currentStopLoss = 0;
        let isInTrade = false;
        let isSimilarBar = false;
        let priceTypeAdjustment = "";
        let skipOtherTradeActivity = false;
        const countDays = (date) => {
            let dateComponent = date.split(" ");
            let calendarDate = dateComponent[0];
            if (dateList.includes(calendarDate) === false) {
                dateList.push(calendarDate);
            }
        };
        const computeBarProfit = (balance, price) => {
            let step1 = parseInt((balance / price).toString());
            let step2 = toFixed(step1 * price, 2);
            return Number(step2);
        };
        const computeTotalProfit = (price, curBal, prevBal) => {
            let theProfit = Number(toFixed(curBal - prevBal, 2));
            return isNaN(theProfit) ? 0 : theProfit;
        };
        const recordDrawdown = function (prevBal, currBal) {
            drawdownList.push(currBal);
        };

        const adjustPriceBySpread = (price, trade = "buy") => {
            let adjustedPrice = 0;
            let spread = Number(toFixed(this.settings.spread / 100, 2));

            if (trade === "buy") {
                adjustedPrice = price + price * spread;
            } else if (trade === "sell") {
                adjustedPrice = price - price * spread;
            } else {
                adjustedPrice = price;
            }

            return Number(adjustedPrice);
        };

        const computeTakeProfit = (price) => {
            let takeProfitPercentage = Number(toFixed(this.settings.takeProfit.value / 100, 2));
            let takeProfitNow = Number(toFixed(price * takeProfitPercentage, 2));
            return takeProfitNow;
        };

        const computeStopLoss = (price) => {
            let stopLosstPercentage = Number(toFixed(this.settings.stopLoss.value / 100, 2));
            currentStopLoss = Number(toFixed(price * stopLosstPercentage, 2));

            //If stop loss is fixed, you set the prevailing stop loss per bar computation
            if (this.settings.stopLoss.type === "Fixed") {
                prevailingStopLoss = currentStopLoss;
            }

            //If stop loss is trailing, you update prevailing stop loss when current computation is greater
            if (this.settings.stopLoss.type === "Trailing" && currentStopLoss > prevailingStopLoss) {
                prevailingStopLoss = currentStopLoss;
            }
        };
        const addToTradeList = (index, bar, tradeType, is_profit_zero = false, show_in_balancechart = true, do_count_as_trade = true) => {
            switch (previousTradePosition) {
                case "Open Long":
                    priceTypeAdjustment = "buy";
                    break;
                case "Open Short":
                    priceTypeAdjustment = "sell";
                    break;
                default:
                    priceTypeAdjustment = "";
            }
            countDays(bar["date"]);
            price = adjustPriceBySpread(bar["open"], priceTypeAdjustment);
            prevPrice = index >= 1 ? adjustPriceBySpread(this.settings.stockData["trades"][index - 1]["open"], priceTypeAdjustment) : 0;
            prevProfit = computeBarProfit(prevBalance, prevPrice);
            currProfit = computeBarProfit(runningBalance, price);
            profit = is_profit_zero === true ? 0 : computeTotalProfit(price, currProfit, prevProfit);
            takeProfit = computeTakeProfit(price);
            currentTradePosition = tradeType;
            tradeCount = do_count_as_trade === true ? tradeCount + 1 : tradeCount;
            if (tradeType !== "Open Long" && tradeType !== "Open Short") {
                runningBalance = Number(toFixed(runningBalance + profit, 2));
                recordDrawdown(prevBalance, runningBalance);
            }
            prevBalance = runningBalance;
            netProfit = Number(toFixed(netProfit + profit, 2));
            if (show_in_balancechart === true) {
                backTestResult["balanceChart"].push({
                    time: tradeTime,
                    value: runningBalance,
                });
            }

            tradeList.push({
                id: tradeId,
                date: tradeTime,
                type: tradeType,
                position: tradePosition,
                amount: amount,
                price: price,
                stopLoss: tradeType === "Stop Loss" ? currentStopLoss : "",
                takeProfit: tradeType === "Take Profit" ? takeProfit : "",
                profit: profit,
                balance: runningBalance,
                rawData: bar,
            });

            if (tradeType !== "Open Long" && tradeType !== "Open Short") {
                tradePosition++;
            }
            tradeId++;
        };
        const checkTakeProfit = (index, bar) => {
            switch (previousTradePosition) {
                case "Open Long":
                    priceTypeAdjustment = "buy";
                    break;
                case "Open Short":
                    priceTypeAdjustment = "sell";
                    break;
                default:
                    priceTypeAdjustment = "";
            }
            price = adjustPriceBySpread(bar["open"], priceTypeAdjustment);
            prevPrice = index >= 1 ? adjustPriceBySpread(this.settings.stockData["trades"][index - 1]["open"], priceTypeAdjustment) : 0;
            prevProfit = computeBarProfit(prevBalance, prevPrice);
            currProfit = computeBarProfit(runningBalance, price);
            takeProfit = computeTakeProfit(price);
            profit = computeTotalProfit(price, currProfit, prevProfit);
            if (profit >= takeProfit) {
                isInTrade = false;
                skipOtherTradeActivity = true;
                addToTradeList(index, bar, "Take Profit", false, true, false);
            }
        };
        const checkStopLoss = (index, bar) => {
            switch (previousTradePosition) {
                case "Open Long":
                    priceTypeAdjustment = "buy";
                    break;
                case "Open Short":
                    priceTypeAdjustment = "sell";
                    break;
                default:
                    priceTypeAdjustment = "";
            }
            price = adjustPriceBySpread(bar["open"], priceTypeAdjustment);
            prevPrice = index >= 1 ? adjustPriceBySpread(this.settings.stockData["trades"][index - 1]["open"], priceTypeAdjustment) : 0;
            prevProfit = computeBarProfit(prevBalance, prevPrice);
            currProfit = computeBarProfit(runningBalance, price);
            takeProfit = computeTakeProfit(price);
            profit = computeTotalProfit(price, currProfit, prevProfit);
            computeStopLoss(price);

            if (profit <= prevailingStopLoss) {
                isInTrade = false;
                skipOtherTradeActivity = true;
                addToTradeList(index, bar, "Stop Loss", false, true, false);
            }
        };

        /************************************************************************************************
         * STEP 1: Create a list of Technical Indicators to compute.
         * Separate them into enter and exit groups.
         *
         ************************************************************************************************/
        this.settings.technicalIndicators["entry"].map((indicator) => {
            indicatorsList["enter"].push({
                name: indicator["name"],
                options: indicator["options"],
            });
        });
        this.settings.technicalIndicators["exit"].map((indicator) => {
            indicatorsList["exit"].push({
                name: indicator["name"],
                options: indicator["options"],
            });
        });
        /************************************************************************************************
         * STEP 2: Compute the value of the technical indicators
         * for enter and exit groups
         *
         ************************************************************************************************/
        indicatorsList["enter"].map((indicator: any) => {
            //Indicator: Awesome Oscillator
            if (indicator["name"] === "awesome_oscillator") {
                this.settings.stockData["trades"] = awesomeoscillator(
                    "enter",
                    this.settings.stockData,
                    indicator["options"]["slowPeriod"],
                    indicator["options"]["fastPeriod"]
                );
            }
            //Indicator: MACD
            if (indicator["name"] === "macd") {
                this.settings.stockData["trades"] = macd("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Moving Average
            if (indicator["name"] === "moving_average") {
                this.settings.stockData["trades"] = movingaverage("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: On Balance Volume
            if (indicator["name"] === "on_balance_volumne") {
                this.settings.stockData["trades"] = obv("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Money Flow Index
            if (indicator["name"] === "money_flow_index") {
                this.settings.stockData["trades"] = mfi("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Commodity Channel Index
            if (indicator["name"] === "commodity_channel_index") {
                this.settings.stockData["trades"] = cci("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: ADX
            if (indicator["name"] === "adx") {
                this.settings.stockData["trades"] = adx("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: RSI
            if (indicator["name"] === "rsi") {
                this.settings.stockData["trades"] = rsi("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Bollinger Bands (BB)
            if (indicator["name"] === "bollinger_bands") {
                this.settings.stockData["trades"] = bb("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Know Sure Thing (KST)
            if (indicator["name"] === "know_sure_thing") {
                this.settings.stockData["trades"] = kst("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Force Index (FI)
            if (indicator["name"] === "force_index") {
                this.settings.stockData["trades"] = fi("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: WilliamsR (WPR)
            if (indicator["name"] === "williams_r") {
                this.settings.stockData["trades"] = wpr("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Accumulation Distribution (ADL)
            if (indicator["name"] === "accumulation_distribution") {
                this.settings.stockData["trades"] = adl("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Average True Trange (ATR)
            if (indicator["name"] === "average_true_range") {
                this.settings.stockData["trades"] = atr("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Arnaud Legoux Moving Average (ALMA)
            if (indicator["name"] === "alma") {
                this.settings.stockData["trades"] = alma("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Chaikin Oscillator (CO)
            if (indicator["name"] === "co") {
                this.settings.stockData["trades"] = co("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Envelopes (ENV)
            if (indicator["name"] === "envelopes") {
                this.settings.stockData["trades"] = env("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Least Squares Moving Average (LSMA)
            if (indicator["name"] === "lsma") {
                this.settings.stockData["trades"] = lsma("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Ultimate Oscillator (UO)
            if (indicator["name"] === "ultimate_oscillator") {
                this.settings.stockData["trades"] = uo("enter", indicator.options, this.settings.stockData);
            }
            //Indicator: Aroon (Aroon)
            if (indicator["name"] === "aroon") {
                this.settings.stockData["trades"] = aroon("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Volume-Weighted Moving Average  (VWMA)
            if (indicator["name"] === "vwma") {
                this.settings.stockData["trades"] = vwma("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Balance of Power  (BOP)
            if (indicator["name"] === "bop") {
                this.settings.stockData["trades"] = bop("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Percentage Bandwidth  (%B)
            if (indicator["name"] === "pb") {
                this.settings.stockData["trades"] = percentBandwidth("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Bollinger Bands Width  (BBW)
            if (indicator["name"] === "bollinger_bands_width") {
                this.settings.stockData["trades"] = bbw("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Chaikin Money Flow (CMF)
            if (indicator["name"] === "cmf") {
                this.settings.stockData["trades"] = cmf("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Volume-Weighted Moving Average  (VWMA)
            if (indicator["name"] === "volume_weighted_moving_average") {
                this.settings.stockData["trades"] = vwma("enter", indicator.options, this.settings.stockData);
            }

            //Indicator: Choppiness Index (CHOP)
            if (indicator["name"] === "chop") {
                this.settings.stockData["trades"] = chop("enter", indicator.options, this.settings.stockData);
            }
        });

        indicatorsList["exit"].map((indicator: any) => {
            //Indicator: Awesome Oscillator
            if (indicator["name"] === "awesome_oscillator") {
                this.settings.stockData["trades"] = awesomeoscillator(
                    "exit",
                    this.settings.stockData,
                    indicator["options"]["slowPeriod"],
                    indicator["options"]["fastPeriod"]
                );
            }
            //Indicator: MACD
            if (indicator["name"] === "macd") {
                this.settings.stockData["trades"] = macd("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Moving Average
            if (indicator["name"] === "moving_average") {
                this.settings.stockData["trades"] = movingaverage("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: On Balance Volume
            if (indicator["name"] === "on_balance_volumne") {
                this.settings.stockData["trades"] = obv("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Money Flow Index
            if (indicator["name"] === "money_flow_index") {
                this.settings.stockData["trades"] = mfi("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Commodity Channel Index
            if (indicator["name"] === "commodity_channel_index") {
                this.settings.stockData["trades"] = cci("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: ADX
            if (indicator["name"] === "adx") {
                this.settings.stockData["trades"] = adx("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: RSI
            if (indicator["name"] === "rsi") {
                this.settings.stockData["trades"] = rsi("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Bollinger Bands (BB)
            if (indicator["name"] === "bollinger_bands") {
                this.settings.stockData["trades"] = bb("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Know Sure Thing (KST)
            if (indicator["name"] === "know_sure_thing") {
                this.settings.stockData["trades"] = kst("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Force Index (FI)
            if (indicator["name"] === "force_index") {
                this.settings.stockData["trades"] = fi("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: WilliamsR (WPR)
            if (indicator["name"] === "williams_r") {
                this.settings.stockData["trades"] = wpr("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Accumulation Distribution (ADL)
            if (indicator["name"] === "accumulation_distribution") {
                this.settings.stockData["trades"] = adl("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Average True Trange (ATR)
            if (indicator["name"] === "average_true_range") {
                this.settings.stockData["trades"] = atr("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Arnaud Legoux Moving Average (ALMA)
            if (indicator["name"] === "alma") {
                this.settings.stockData["trades"] = alma("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Chaikin Oscillator (CO)
            if (indicator["name"] === "co") {
                this.settings.stockData["trades"] = co("exit", indicator.options, this.settings.stockData);
            }
            //Indicator: Envelopes (ENV)
            if (indicator["name"] === "envelopes") {
                this.settings.stockData["trades"] = env("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Least Squares Moving Average (LSMA)
            if (indicator["name"] === "lsma") {
                this.settings.stockData["trades"] = lsma("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Ultimate Oscillator (UO)
            if (indicator["name"] === "ultimate_oscillator") {
                this.settings.stockData["trades"] = uo("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Aroon (Aroon)
            if (indicator["name"] === "aroon") {
                this.settings.stockData["trades"] = aroon("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Volume-Weighted Moving Average  (VWMA)
            if (indicator["name"] === "vwma") {
                this.settings.stockData["trades"] = vwma("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Balance of Power  (BOP)
            if (indicator["name"] === "bop") {
                this.settings.stockData["trades"] = bop("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Percentage Bandwidth  (%B)
            if (indicator["name"] === "pb") {
                this.settings.stockData["trades"] = percentBandwidth("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Bollinger Bands Width  (BBW)
            if (indicator["name"] === "bollinger_bands_width") {
                this.settings.stockData["trades"] = bbw("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Chaikin Money Flow (CMF)
            if (indicator["name"] === "cmf") {
                this.settings.stockData["trades"] = cmf("exit", indicator.options, this.settings.stockData);
            }
            //Indicator: Volume-Weighted Moving Average  (VWMA)
            if (indicator["name"] === "volume_weighted_moving_average") {
                this.settings.stockData["trades"] = vwma("exit", indicator.options, this.settings.stockData);
            }

            //Indicator: Choppiness Index (CHOP)
            if (indicator["name"] === "chop") {
                this.settings.stockData["trades"] = chop("exit", indicator.options, this.settings.stockData);
            }
        });
        //Check enter and exit list
        // console.log({trades: this.settings.stockData['trades'].filter(item => item['enter']['long'].length > 0 || item['enter']['short'].length > 0 || item['exit']['long'].length > 0 || item['exit']['short'].length > 0) })

        /************************************************************************************************
         * STEP 3: Check the Buy and Sell activity
         *
         ************************************************************************************************/
        indicatorsList["enter"].map((indicator) => {
            this.settings.stockData["trades"] = processSignal(
                this.settings.stockData["trades"],
                "enter",
                indicator["options"]["signal"],
                indicator["options"]["levelLine"],
                indicator["name"]
            );
        });
        indicatorsList["exit"].map((indicator) => {
            this.settings.stockData["trades"] = processSignal(
                this.settings.stockData["trades"],
                "exit",
                indicator["options"]["signal"],
                indicator["options"]["levelLine"],
                indicator["name"]
            );
        });

        /************************************************************************************************
         * STEP 4: Determine the final bar entry and exit result
         *
         ************************************************************************************************/
        this.settings.stockData["trades"].map((trade) => {
            if (trade["enter"]["long"].includes(false) === false) {
                trade["enter"]["long-final"] = true;
            } else {
                trade["enter"]["long-final"] = false;
            }

            if (trade["enter"]["short"].includes(false) === false) {
                trade["enter"]["short-final"] = true;
            } else {
                trade["enter"]["short-final"] = false;
            }

            if (trade["exit"]["long"].includes(false) === false) {
                trade["exit"]["long-final"] = true;
            } else {
                trade["exit"]["long-final"] = false;
            }

            if (trade["exit"]["short"].includes(false) === false) {
                trade["exit"]["short-final"] = true;
            } else {
                trade["exit"]["short-final"] = false;
            }
        });

        /************************************************************************************************
         * STEP 6: Do the backtest
         *
         ************************************************************************************************/
        this.settings.stockData["trades"].map((bar, index) => {
            /**
             * This condition is added to avoid duplicate bars based on date or timestamp
             *
             */
            if (index > 0) {
                isSimilarBar = bar["date"] === this.settings.stockData["trades"][index - 1]["date"];
            }

            if (isSimilarBar === false && index >= this.settings.startingBar) {
                /**
                 * Set trading values
                 */
                tradeTime = bar["date"];

                //For initial bar, close, take profit, and stop loss
                if (isInTrade === false) {
                    if (bar["enter"]["long-final"] === true && previousTradePosition !== "Open Long") {
                        isInTrade = true;
                        previousTradePosition = "Open Long";
                        addToTradeList(index, bar, "Open Long", true, false, true);
                    }
                    if (isInTrade === false && bar["enter"]["long-final"] === true && previousTradePosition !== "Open Short") {
                        isInTrade = true;
                        previousTradePosition = "Open Short";
                        addToTradeList(index, bar, "Open Short", true, false, true);
                    }
                } else {
                    skipOtherTradeActivity = false;

                    //Take Profit
                    if (this.settings.takeProfit.isEnabled === true) {
                        checkTakeProfit(index, bar);
                    }

                    //Stop Loss
                    if (this.settings.stopLoss.isEnabled === true && skipOtherTradeActivity === false) {
                        checkStopLoss(index, bar);
                    }

                    //OPEN LONG TO CLOSE
                    if (currentTradePosition === "Open Long" && bar["exit"]["long-final"] === true && skipOtherTradeActivity === false) {
                        isInTrade = false;
                        addToTradeList(index, bar, "Close", false, true, false);
                    }

                    //OPEN SHORT TO CLOSE
                    if (currentTradePosition === "Open Short" && bar["exit"]["short-final"] === true && skipOtherTradeActivity === false) {
                        isInTrade = false;
                        addToTradeList(index, bar, "Close", false, true, false);
                    }
                }
            }
        });

        /************************************************************************************************
         * STEP 7: Prepare result
         *
         ************************************************************************************************/
        // console.log(tradeList);
        // console.log(netProfit);
        if (netProfit !== 0 && isNaN(netProfit) === false) {
            backTestResult["netProfit"] = netProfit;
            backTestResult["profitPerDay"] = Number(toFixed(netProfit / dateList.length, 2));
            backTestResult["tradeCount"] = tradeCount;
            backTestResult["trade"] = tradeList;
            backTestResult["date"] = dateList;
            backTestResult["maxDrawDown"] = Number(toFixed(this.settings.tradeSize * PortfolioAnalytics.maxDrawdown(drawdownList), 2));
            backTestResult["drawdown"] = (function () {
                let val = backTestResult["maxDrawDown"] == 0 ? 0 : toFixed(netProfit / backTestResult["maxDrawDown"], 2);
                return Number(val);
            })();
        } else {
            //If net profit is zero or none, then reset balance charts
            backTestResult["balanceChart"] = [];
        }

        console.log("############# BACKTEST RESULTS #############");
        // console.log(backTestResult);
        if (this.isValidatingBackTest === true) {
            console.log("############# EXPERT ADVISOR RESULTS #############");
            console.log({
                netProfit: -574.5,
                profitPerDay: -12.27,
                maxDrawDown: 610.8,
                return: -0.94,
                tradeCount: 2263,
            });
        }

        return backTestResult;
    }
}
