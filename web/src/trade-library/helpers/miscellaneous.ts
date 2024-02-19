import pad from "pad";
import toFixed from "accounting-js/lib/toFixed.js";

/**
 * This is used to format raw stock data to individual group
 *
 * @param rawStock object
 */
export const dataPrepper = (rawStock: any) => {
    let formattedData = {
        // open: [],
        // high: [],
        // low: [],
        // close: [],
        // volume: [],
        // joined: {},
        // stock: [],
        // balanceChart: [],
        medianPrice: [],
        trades: [],
        medianPriceWithDate: [],
    };
    let keys = Object.keys(rawStock);
    //STEP 1: Break data
    keys.forEach((member) => {
        let doTrade = Math.floor(Math.random() * 2);
        let trade = [true, false];
        let open = Number(rawStock[member]["Open"]); //parseFloat(toFixed(parseFloat(rawStock[member]["Open"]), 2));
        let high = Number(rawStock[member]["High"]); //parseFloat(toFixed(parseFloat(rawStock[member]["High"]), 2));
        let low = Number(rawStock[member]["Low"]); //parseFloat(toFixed(parseFloat(rawStock[member]["Low"]), 2));
        let close = Number(rawStock[member]["Close"]); //parseFloat(toFixed(parseFloat(rawStock[member]["Close"]), 2));
        let volume = Number(rawStock[member]["Volume"]);
        let date = (() => {
            let date = new Date(rawStock[member]["Time"]);
            let day = date.getDate().toString();
            let month = (date.getMonth() + 1).toString();
            let year = date.getFullYear();
            let hour = date.getHours().toString();
            let min = date.getMinutes().toString();
            let sec = date.getSeconds().toString();
            return (
                year +
                "-" +
                pad(2, month, "0") +
                "-" +
                pad(2, day, "0") +
                " " +
                pad(2, hour, "0") +
                ":" +
                pad(2, min, "0") +
                ":" +
                pad(2, sec, "0")
            );
        })();
        let medianPrice = (high + low) / 2; //parseFloat(toFixed((high + low) / 2, 2));

        // formattedData.open.push({
        //   date: date,
        //   value: open,
        // });
        // formattedData.high.push({
        //   date: date,
        //   value: high,
        // });
        // formattedData.low.push({
        //   date: date,
        //   value: low,
        // });
        // formattedData.close.push({
        //   date: date,
        //   value: close,
        // });
        // formattedData.volume.push({
        //   date: date,
        //   value: volume,
        // });

        // formattedData.joined[date] = {
        //   stock: {
        //     open: open,
        //     high: high,
        //     low: low,
        //     close: close,
        //     volume: volume,
        //   },
        //   signal: {
        //     AO: { longEntry: "", shortEntry: "", longExit: "", shortExit: "" },
        //     MACD: { longEntry: "", shortEntry: "", longExit: "", shortExit: "" },
        //   },
        //   backtest: {},
        // };

        // formattedData.stock.push({
        //   date: date,
        //   high: high,
        //   low: low,
        //   open: open,
        //   close: close,
        //   volume: volume,
        //   enterPosition: trade[doTrade],
        // });

        // formattedData.balanceChart.push({
        //   open: open,
        //   high: high,
        //   low: low,
        //   close: close,
        // });

        /**
         * Data needed upon code revamp
         *
         */
        formattedData.medianPrice.push(medianPrice);
        formattedData.medianPriceWithDate.push({
            date: date,
            value: medianPrice,
        });
        formattedData.trades.push({
            date: date,
            high: high,
            low: low,
            open: open,
            close: close,
            volume: volume,
            signalValue: {
                enter: {},
                exit: {},
            },
            enter: {
                long: [],
                short: [],
            },
            exit: {
                long: [],
                short: [],
            },
        });
    });

    //STEP 2: Return Data
    return formattedData;
};

export const formatIndicatorValue = (rawData: any, key: string) => {
    let indicatorValue = [];
    if (rawData.length === 0) return indicatorValue;

    rawData.forEach((member) => {
        indicatorValue.push(member[key]);
    });

    return indicatorValue;
};

/**
 * This is used to check payload against policy of data
 *
 * @param data object
 * @param policy object
 */
export const checkHelperParameters = (data: any, policy: any) => {
    /**
     * STEP 1: Check if data and policy params are objects
     *
     */
    if (typeof data !== "object") {
        throw new Error("Data parameter should be an object");
    }
    if (typeof policy !== "object") {
        throw new Error("Policy parameter should be an object");
    }

    /**
     * STEP 2: Create refence arrays
     *
     */
    let missingKeys = [];
    const dataKeys = Object.keys(data);
    const policyKeys = Object.keys(policy);

    /**
     * STEP 3: Check if key size of reference and data are the same. If not, then, throw error.
     *
     */
    if (dataKeys.length !== policyKeys.length) {
        throw new Error(
            "Data and policy doesn't match. Both need to have three keys: indicators, stocks, and callback."
        );
    }

    /**
     * STEP 4: Do policy checking
     *
     */
    policyKeys.forEach((member) => {
        let inList = false;
        dataKeys.forEach((innerMember) => {
            if (innerMember === member) {
                if (policy[member]["type"] === "array") {
                    if (Array.isArray(data[member]) === true) inList = true;
                } else {
                    if (typeof data[member] === policy[member]["type"])
                        inList = true;
                }
            }
        });
        if (inList === false) {
            missingKeys.push(member + ":" + policy[member]["type"]);
        }
    });

    /**
     * STEP 4: Throw error if key and/or data type doesn't match
     *
     */
    if (missingKeys.length > 0) {
        throw new Error(
            "Indicator Helper parameters missing the keys or wrong data type: " +
                missingKeys.join()
        );
    }
};

/**
 * This is used to check validate indicator options
 *
 * @param options object
 * @param requiredKeys object
 */
export const validateUserOptions = (options: any, requiredKeys: any) => {
    let userValidationError = [];

    //STEP 1: Check the parameter data type
    if (typeof options !== "object") {
        throw new Error("IndicatorHelper expects an object parameter");
    }

    //STEP 2: Check the parameter size
    if (Object.keys(options).length === 0) {
        throw new Error("IndicatorHelper parameter receives empty object");
    }

    //STEP 3: Check required keys
    requiredKeys.forEach((item) => {
        let isArray = false;
        //Check if key exists
        if (options.hasOwnProperty(item.key) === true) {
            //Check the option data type
            if (item.type === "array") {
                isArray = Array.isArray(options[item.key]);
            }
            if (typeof options[item.key] === item.type || isArray === true) {
                //Check if further data value has to be checked
                if (item.hasOwnProperty("doDataCheck") === true) {
                    //Check if the value is within acceptable list
                    if (item.doDataCheck === "listed") {
                        if (item.values.includes(options[item.key]) === false) {
                            userValidationError.push(
                                `${item.key} value is not allowed`
                            );
                        }
                    }
                    //Check if the value is empty
                    if (item.doDataCheck === "empty") {
                        if (options[item.key].length === 0) {
                            userValidationError.push(
                                `${item.key} value cannot be empty`
                            );
                        }
                    }
                    //Check if a deeper test is needed
                    if (item.doDataCheck === "validateIndicator") {
                        validateUserOptions(
                            options.data,
                            requiredKeys[1].values[options["indicator"]]
                        );
                    }
                }
            } else {
                userValidationError.push(
                    `${item.key} type is not ${item.type}`
                );
            }
        } else {
            userValidationError.push(`${item.key} is missing`);
        }
    });

    //STEP 4: Check user error
    if (userValidationError.length > 0) {
        throw new Error(
            "IndicatorHelper has invalid user options as follows: " +
                userValidationError.join()
        );
    }
};

export const prepareEditorData = (data: any) => {
    let stock = [];
    let members = Object.keys(data);
    members.forEach((member) => {
        let stockData = data[member]["stock"];

        stock.push({
            date: member,
            open: stockData.open,
            high: stockData.high,
            low: stockData.low,
            close: stockData.close,
            volume: stockData.volume,
            split: "",
            dividend: "",
            absoluteChange: "",
            percentChange: "",
        });
    });

    return stock;
};

export const processSignal = (
    tradeData,
    activity,
    signal,
    levelLine,
    indicator
) => {
    console.log({ tradeData });
    tradeData.map((trade, index) => {
        if (index >= 2) {
            if (signal === "above_level_line") {
                if (trade["signalValue"][activity][indicator] > levelLine) {
                    tradeData[index][activity]["long"].push(true);
                    tradeData[index][activity]["short"].push(false);
                } else {
                    tradeData[index][activity]["long"].push(false);
                    tradeData[index][activity]["short"].push(true);
                }
            }
            if (signal === "below_level_line") {
                if (trade["signalValue"][activity][indicator] < levelLine) {
                    tradeData[index][activity]["long"].push(true);
                    tradeData[index][activity]["short"].push(false);
                } else {
                    tradeData[index][activity]["long"].push(false);
                    tradeData[index][activity]["short"].push(true);
                }
            }
            if (signal === "rises") {
                if (
                    trade["signalValue"][activity][indicator] >
                    tradeData[index - 1]["signalValue"][activity][indicator]
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
                    trade["signalValue"][activity][indicator] <
                    tradeData[index - 1]["signalValue"][activity][indicator]
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
                    trade["signalValue"][activity][indicator] >
                    tradeData[index - 1]["signalValue"][activity][indicator];
                let condition2 =
                    tradeData[index - 1]["signalValue"][activity][indicator] <
                    levelLine;
                let condition3 =
                    trade["signalValue"][activity][indicator] > levelLine;
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
                    trade["signalValue"][activity][indicator] <
                    tradeData[index - 1]["signalValue"][activity][indicator];
                let condition2 =
                    tradeData[index - 1]["signalValue"][activity][indicator] >
                    levelLine;
                let condition3 =
                    trade["signalValue"][activity][indicator] < levelLine;
                if (condition1 && condition2 && condition3) {
                    tradeData[index][activity]["long"].push(true);
                    tradeData[index][activity]["short"].push(false);
                } else {
                    tradeData[index][activity]["long"].push(false);
                    tradeData[index][activity]["short"].push(true);
                }
            }
            if (signal === "change_upward") {
                let condition1 =
                    tradeData[index - 2]["signalValue"][activity][indicator] >
                    tradeData[index - 1]["signalValue"][activity][indicator];
                let condition2 =
                    tradeData[index - 1]["signalValue"][activity][indicator] <
                    trade["signalValue"][activity][indicator];
                if (condition1 && condition2) {
                    tradeData[index][activity]["long"].push(true);
                    tradeData[index][activity]["short"].push(false);
                } else {
                    tradeData[index][activity]["long"].push(false);
                    tradeData[index][activity]["short"].push(true);
                }
            }
            if (signal === "change_downward") {
                let condition1 =
                    tradeData[index - 2]["signalValue"][activity][indicator] <
                    tradeData[index - 1]["signalValue"][activity][indicator];
                let condition2 =
                    tradeData[index - 1]["signalValue"][activity][indicator] >
                    trade["signalValue"][activity][indicator];
                if (condition1 && condition2) {
                    tradeData[index][activity]["long"].push(true);
                    tradeData[index][activity]["short"].push(false);
                } else {
                    tradeData[index][activity]["long"].push(false);
                    tradeData[index][activity]["short"].push(true);
                }
            }

            //Added by Miguel for Envelopes
            if (signal === "higher_than_upper_band") {
                let upperBand =
                    tradeData[index]["signalValue"][activity][indicator][
                        "upper"
                    ];
                let sma =
                    tradeData[index]["signalValue"][activity][indicator][
                        "middle"
                    ];

                if (sma > upperBand) {
                    tradeData[index][activity]["long"].push(true);
                    tradeData[index][activity]["short"].push(false);
                } else {
                    tradeData[index][activity]["long"].push(false);
                    tradeData[index][activity]["short"].push(true);
                }
            }
            if (signal === "lower_than_lower_band") {
                let lowerBand =
                    tradeData[index]["signalValue"][activity][indicator][
                        "lower"
                    ];
                let middle =
                    tradeData[index]["signalValue"][activity][indicator][
                        "middle"
                    ];
                if (middle < lowerBand) {
                    tradeData[index][activity]["long"].push(true);
                    tradeData[index][activity]["short"].push(false);
                } else {
                    tradeData[index][activity]["long"].push(false);
                    tradeData[index][activity]["short"].push(true);
                }
            }
            if (signal === "crosses_upper_band_upwards") {
                let upperBand =
                    tradeData[index]["signalValue"][activity][indicator][
                        "upper"
                    ];
                let middle =
                    tradeData[index]["signalValue"][activity][indicator][
                        "middle"
                    ];

                let prevMiddle =
                    tradeData[index - 1]["signalValue"][activity][indicator][
                        "middle"
                    ];

                //Check if current index's middle value higher than the upperband
                let condition1 = middle > upperBand;
                let condition2 = prevMiddle < upperBand;
                if (condition1 && condition2) {
                    tradeData[index][activity]["long"].push(true);
                    tradeData[index][activity]["short"].push(false);
                } else {
                    tradeData[index][activity]["long"].push(false);
                    tradeData[index][activity]["short"].push(true);
                }
            }
            if (signal === "crosses_upper_band_downwards") {
                let upperBand =
                    tradeData[index]["signalValue"][activity][indicator][
                        "upper"
                    ];
                let middle =
                    tradeData[index]["signalValue"][activity][indicator][
                        "middle"
                    ];

                let prevUpperBand =
                    tradeData[index - 1]["signalValue"][activity][indicator][
                        "upper"
                    ];
                let prevMiddle =
                    tradeData[index - 1]["signalValue"][activity][indicator][
                        "middle"
                    ];

                //Check if current index's middle value lower than the upperband
                let condition1 = middle < upperBand;
                //Check if the previous index's middle value is higher than the previous upperband
                let condition2 = prevMiddle > prevUpperBand;
                if (condition1 && condition2) {
                    tradeData[index][activity]["long"].push(true);
                    tradeData[index][activity]["short"].push(false);
                } else {
                    tradeData[index][activity]["long"].push(false);
                    tradeData[index][activity]["short"].push(true);
                }
            }
            if (signal === "crosses_lower_band_upwards") {
                let lowerBand =
                    tradeData[index]["signalValue"][activity][indicator][
                        "lower"
                    ];
                let middle =
                    tradeData[index]["signalValue"][activity][indicator][
                        "middle"
                    ];

                let prevLowerBand =
                    tradeData[index - 1]["signalValue"][activity][indicator][
                        "lower"
                    ];
                let prevMiddle =
                    tradeData[index - 1]["signalValue"][activity][indicator][
                        "middle"
                    ];

                //Check if current index's middle value lower than the lowerband
                let condition1 = middle > lowerBand;
                //Check if the previous index's middle value is lower than the previous lowerband
                let condition2 = prevMiddle < prevLowerBand;
                if (condition1 && condition2) {
                    tradeData[index][activity]["long"].push(true);
                    tradeData[index][activity]["short"].push(false);
                } else {
                    tradeData[index][activity]["long"].push(false);
                    tradeData[index][activity]["short"].push(true);
                }
            }

            if (signal === "crosses_lower_band_downwards") {
                let lowerBand =
                    tradeData[index]["signalValue"][activity][indicator][
                        "lower"
                    ];
                let middle =
                    tradeData[index]["signalValue"][activity][indicator][
                        "middle"
                    ];
                let prevLowerBand =
                    tradeData[index - 1]["signalValue"][activity][indicator][
                        "lower"
                    ];
                let prevMiddle =
                    tradeData[index - 1]["signalValue"][activity][indicator][
                        "middle"
                    ];

                //Check if current index's middle value lower than the upperband
                let condition1 = middle < lowerBand;
                //Check if the previous index's middle value is higher than the previous upperband
                let condition2 = prevMiddle > prevLowerBand;
                if (condition1 && condition2) {
                    tradeData[index][activity]["long"].push(true);
                    tradeData[index][activity]["short"].push(false);
                } else {
                    tradeData[index][activity]["long"].push(false);
                    tradeData[index][activity]["short"].push(true);
                }
            }

            if (signal === "bar_opens_above") {
                let bar = tradeData[index]["signalValue"][activity][indicator];
                let open = tradeData[index]["open"];

                let condition1 = open > bar;
                if (condition1) {
                    tradeData[index][activity]["long"].push(true);
                    tradeData[index][activity]["short"].push(false);
                } else {
                    tradeData[index][activity]["long"].push(false);
                    tradeData[index][activity]["short"].push(true);
                }
            }

            if (signal === "bar_opens_below") {
                let bar = tradeData[index]["signalValue"][activity][indicator];
                let open = tradeData[index]["open"];

                let condition1 = open < bar;
                if (condition1) {
                    tradeData[index][activity]["long"].push(true);
                    tradeData[index][activity]["short"].push(false);
                } else {
                    tradeData[index][activity]["long"].push(false);
                    tradeData[index][activity]["short"].push(true);
                }
            }

            if (signal === "bar_opens_above_after_opening_below") {
                let bar = tradeData[index]["signalValue"][activity][indicator];
                let open = tradeData[index]["open"];
                let prevBar =
                    tradeData[index - 1]["signalValue"][activity][indicator];
                let prevOpen = tradeData[index - 1]["open"];

                let condition1 = open > bar;
                let condition2 = prevOpen < prevBar;
                if (condition1 && condition2) {
                    tradeData[index][activity]["long"].push(true);
                    tradeData[index][activity]["short"].push(false);
                } else {
                    tradeData[index][activity]["long"].push(false);
                    tradeData[index][activity]["short"].push(true);
                }
            }
            if (signal === "bar_opens_below_after_opening_above") {
                let bar = tradeData[index]["signalValue"][activity][indicator];
                let open = tradeData[index]["open"];
                let prevBar =
                    tradeData[index - 1]["signalValue"][activity][indicator];
                let prevOpen = tradeData[index - 1]["open"];

                let condition1 = open < bar;
                let condition2 = prevOpen > prevBar;
                if (condition1 && condition2) {
                    tradeData[index][activity]["long"].push(true);
                    tradeData[index][activity]["short"].push(false);
                } else {
                    tradeData[index][activity]["long"].push(false);
                    tradeData[index][activity]["short"].push(true);
                }
            }
        }
    });

    return tradeData;
};
