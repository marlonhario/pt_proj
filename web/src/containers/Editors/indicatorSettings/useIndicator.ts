import React, { useReducer, useState, useEffect } from "react";
import AwesomeOscillator from "./AwesomeOscillator.json";
import MACD from "./MACD.json";

import StockMarketJSON from "./stocks.json";

import { IndicatorHelper } from "../../../services/helper/indicators/indicator.helper";
import PTBackTest from "../../../trade-library/PTBackTest";

/*
send this function:
    - indicator name/ID
    - indicator options
    - stock data

returns: 
    - indicator output
    - indicator values
    - buy/sell signals (true / false)

the function should have full error catching so it gracefully fails if anything is wrong

*/
let stockMarketData = {
    "2020-08-28 17:00:00": {
        "1. open": "125.3000",
        "2. high": "125.3000",
        "3. low": "125.3000",
        "4. close": "125.3000",
        "5. volume": "703",
    },
    "2020-08-29 17:00:00": {
        "1. open": "125.3000",
        "2. high": "125.3000",
        "3. low": "125.3000",
        "4. close": "125.3000",
        "5. volume": "703",
    },
};

// interface CrudTypes {
//   addIndicator: (data: any) => void;
//   removeIndicator: (data: any) => void;
//   updateIndicator: (data: any) => void;
//   updateProperty: (newProperty: any) => void;
// }

// interface EntryItem {
//   name: string;
//   id: string | number;
// }

export const useIndicator = ({ indicator = {}, indicatorOptions = {}, stockData = [] }): any => {
    const [computation, setComputation] = useState([]);
    const [computation2, setComputation2] = useState<any>({});
    function reduceData(data) {
        return data.reduce((arr, cur) => {
            let { id, name, identification, ...rest } = cur;
            let reduceKeys = Object.keys(rest).reduce((obj, key) => {
                let properKey = key.split("-")[0];
                if (key === "signal") {
                    return {
                        ...obj,
                        [key]: rest["signal"],
                    };
                }
                return {
                    ...obj,
                    [`${properKey}`]: rest[`${properKey}-${identification}`],
                };
            }, {});
            return [
                ...arr,
                {
                    indicator: identification,
                    ...reduceKeys,
                },
            ];
        }, []);
    }
    const addIndicator = (data, stockData = [], strategyProperties) => {
        console.log(stockData);
        const formatIndicator = (indicators) => {
            let record = [];

            if (indicators.length > 0) {
                indicators.map((indicator, index) => {
                    let indicator_name = "";
                    let options = {};
                    if (indicator["identification"] === "AO") {
                        indicator_name = "awesome_oscillator";
                        options = {
                            signal: indicator["signal"],
                            levelLine: indicator["levelLine-AO"],
                        };
                    }
                    if (indicator["identification"] === "MACD") {
                        indicator_name = "macd";
                        options = {
                            signal: indicator["signal"],
                            applyTo: "median",
                            fastPeriod: indicator["fastPeriod-MACD"], //fastEma
                            slowPeriod: indicator["slowPeriod-MACD"], //slowEma
                            signalPeriod: indicator["signalPeriod-MACD"], //MACD SMA
                            levelLine: 0, //default
                        };
                    }
                    if (indicator["identification"] === "OBV") {
                        indicator_name = "on_balance_volume";
                        options = {
                            signal: indicator["signal"],
                        };
                    }

                    record.push({
                        name: indicator_name,
                        options: options,
                    });
                });
            }

            return record;
        };
        let entry = formatIndicator(data.longEntryList);
        let exit = formatIndicator(data.longExitList);

        if (stockData.length > 0 && entry.length > 0 && exit.length > 0) {
            var BackTestData = new PTBackTest({
                stockData: stockData,
                technicalIndicators: {
                    entry: entry,
                    exit: exit,
                },
                stopLoss: { type: "fixed", amount: 0 }, //Need to be passed from editor in this format
                takeProfit: strategyProperties?.profitPips ? strategyProperties.profitPips / 100 : 0.5,
                balance: 10000, //Need to be passed from editor
                commission: 0,
                startingBar: 100, //Need to be passed from editor
                share: 1000000, //Need to be passed from editor
            }).backtest();

            setComputation2(BackTestData);

            console.log("BACK TEST");
            console.log(BackTestData);
        }
    };

    useEffect(() => {
        ////console.log("computation values", computation);
    }, [computation]);

    let crud = {
        addIndicator,
    };

    return [computation, crud, computation2];
};
/*

useState
useReducer



*/
