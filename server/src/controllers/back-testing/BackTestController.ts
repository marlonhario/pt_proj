import PTBackTest from "../../../../web/src/trade-library/PTBackTest";
const dataForge = require("data-forge");
require("data-forge-fs"); // For loading files.
require("data-forge-indicators"); // For the moving average indicator.
require("data-forge-plot"); // For rendering charts.
require("@data-forge-plot/render"); // Extends Data-Forge Plot with the 'renderImage' function.
const { backtest, analyze } = require("grademark");
const sample_data = require("./sample-data.json");

export default class BackTestController {
    /**
     * The function that process back testing
     *
     * @param data object the trade data
     * @param callback function the value to call after processing request
     */
    async processRequest(data: any, callback: any) {
        var test = new PTBackTest(sample_data).backtest();
        callback(test);

        /***************************************************************************
         * Variable declaration
         ***************************************************************************/
        const lotAmount: number = 10000; //default lot value
        let resultData = {
            balanceChart: [],
        };
        let response: any = {
            status: 200,
            message: "",
            data: { statistics: {}, balance: {} },
        };
        let inputSeries = new dataForge.DataFrame(data.stock); //The one that receives data

        const balanceData = (stock: any) => {
            let backTestBalance = lotAmount + (stock.high - stock.open) * data.slippage;
            resultData.balanceChart.push({
                date: stock.date,
                originalBalance: lotAmount,
                backtestBalance: backTestBalance,
                amt: backTestBalance * 2,
            });
        };

        const strategy = {
            entryRule: (enterPosition: any, args: any) => {
                if (args.bar.enterPosition === true) {
                    balanceData(args.bar);
                    enterPosition();
                }
            },
            exitRule: (exitPosition: any, args: any) => {
                if (args.bar.enterPosition === false) {
                    balanceData(args.bar);
                    exitPosition();
                }
            },
            stopLoss: (args: any) => {
                let price = (args.bar.high - args.bar.open) * data.slippage;
                return price * data.stoploss;
            },
        };

        //Run the backtest
        const trades = backtest(strategy, inputSeries);

        //Generate the Stats
        const analysis = analyze(lotAmount, trades);
        for (const key of Object.keys(analysis)) {
            response.data.statistics[key] = analysis[key];
        }
        response.data.balance = resultData.balanceChart;

        //Return data via callback
        callback(response);
    }
}
