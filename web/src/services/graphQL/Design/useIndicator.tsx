import React, { useContext } from "react";
import { ContextDesign } from "../../../hooks/context/Context";
import PTBackTest from "../../../trade-library/PTBackTest";

export const useIndicator = () => {
    const { designState, designDispatch } = useContext(ContextDesign);
    const { longEntryList, longExitList, marketData, strategyProperties, stockData } = designState;

    const handleAddIndicator = (data, stockData = [], strategyProperties) => {
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
                            fastPeriod: indicator["fastPeriod-AO"],
                            slowPeriod: indicator["slowPeriod-AO"],
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

                    if (indicator["identification"] === "MA") {
                        indicator_name = "moving_average";
                        console.log({ indicator });
                        options = {
                            signal: indicator["signal"],
                            maMethod: indicator["maMethod-MA"],
                            applyTo: indicator["applyTo-MA"],
                            period: indicator["period-MA"],
                        };
                    }
                    if (indicator["identification"] === "OBV") {
                        indicator_name = "on_balance_volume";
                        options = {
                            signal: indicator["signal"],
                        };
                    }
                    if (indicator["identification"] === "MFI") {
                        indicator_name = "money_flow_index";
                        options = {
                            signal: indicator["signal"],
                            period: indicator["period-MFI"],
                            levelLine: indicator["levelLine-MFI"],
                        };
                    }
                    if (indicator["identification"] === "CCI") {
                        indicator_name = "commodity_channel_index";
                        options = {
                            period: indicator["period-CCI"],
                            applyTo: indicator["applyTo-CCI"],
                            levelLine: indicator["levelLine-CCI"],
                        };
                    }

                    if (indicator["identification"] === "ADX") {
                        indicator_name = "adx";
                        options = {
                            signal: indicator["signal"],
                            period: indicator["period-ADX"],
                            levelLine: indicator["levelLine-ADX"],
                        };
                    }

                    if (indicator["identification"] === "RSI") {
                        indicator_name = "rsi";
                        options = {
                            signal: indicator["signal"],
                            period: indicator["period-RSI"],
                            applyTo: indicator["applyTo-RSI"],
                            levelLine: indicator["levelLine-RSI"],
                        };
                    }

                    if (indicator["identification"] === "BB") {
                        indicator_name = "bollinger_bands";
                        options = {
                            signal: indicator["signal"],
                            period: indicator["period-BB"],
                            applyTo: indicator["applyTo-BB"],
                            deviation: indicator["deviation-BB"],
                        };
                    }

                    if (indicator["identification"] === "KST") {
                        indicator_name = "know_sure_thing";
                        options = {
                            roc1: indicator["roc1-KST"],
                            roc2: indicator["roc2-KST"],
                            roc3: indicator["roc3-KST"],
                            roc4: indicator["roc4-KST"],
                            rocSma1: indicator["rocSma1-KST"],
                            rocSma2: indicator["rocSma2-KST"],
                            rocSma3: indicator["rocSma3-KST"],
                            rocSma4: indicator["rocSma4-KST"],
                            signal: indicator["signal"],
                        };
                    }

                    if (indicator["identification"] === "FI") {
                        indicator_name = "force_index";
                        options = {
                            signal: indicator["signal"],
                            deviation: indicator["maMethod-FI"],
                        };
                    }

                    if (indicator["identification"] === "WPR") {
                        indicator_name = "williams_r";
                        options = {
                            signal: indicator["SIGNAL"],
                            level: indicator["level-WPR"],
                        };
                    }

                    if (indicator["identification"] === "ADL") {
                        indicator_name = "accumulation_distribution";
                        options = {
                            signal: indicator["signal"],
                        };
                    }

                    if (indicator["identification"] === "ALMA") {
                        indicator_name = "alma";
                        options = {
                            signal: indicator["signal"],
                            period: indicator["period-ALMA"],
                            offset: indicator["offset-ALMA"],
                            sigma: indicator["sigma-ALMA"],
                            applyTo: indicator["applyTo-ALMA"],
                        };
                    }

                    if (indicator["identification"] === "CO") {
                        indicator_name = "co";
                        options = {
                            signal: indicator["signal"],
                            fastPeriod: indicator["fastPeriod-CO"],
                            slowPeriod: indicator["slowPeriod-CO"],
                        };
                    }

                    if (indicator["identification"] === "LSMA") {
                        indicator_name = "lsma";
                        options = {
                            signal: indicator["signal"],
                            period: indicator["period-LSMA"],
                            offset: indicator["offset-LSMA"],
                            applyTo: indicator["applyTo-LSMA"],
                        };
                    }

                    if (indicator["identification"] === "UO") {
                        indicator_name = "ultimate_oscillator";
                        options = {
                            signal: indicator["signal"],
                            levelLine: indicator["levelLine-UO"],
                            period1: indicator["period1-UO"],
                            period2: indicator["period2-UO"],
                            period3: indicator["period3-UO"],
                            applyTo: indicator["applyTo-UO"],
                        };
                    }

                    if (indicator["identification"] === "AROON") {
                        indicator_name = "aroon";
                        options = {
                            signal: indicator["signal"],
                            levelLine: indicator["levelLine-AROON"],
                            period: indicator["period-AROON"],
                            aroonType: indicator["aroonType-AROON"],
                        };
                    }

                    if (indicator["identification"] === "BOP") {
                        indicator_name = "bop";
                        options = {
                            signal: indicator["signal"],
                        };
                    }

                    if (indicator["identification"] === "PB") {
                        indicator_name = "pb";
                        options = {
                            signal: indicator["signal"],
                            applyTo: indicator["applyTo-PB"],
                            levelLine: indicator["levelLine-PB"],
                            period: indicator["period-PB"],
                            deviation: indicator["deviation-PB"],
                        };
                    }

                    if (indicator["identification"] === "BBW") {
                        indicator_name = "bollinger_bands_width";
                        options = {
                            signal: indicator["signal"],
                            applyTo: indicator["applyTo-BBW"],
                            levelLine: indicator["levelLine-BBW"],
                            period: indicator["period-BBW"],
                            deviation: indicator["deviation-BBW"],
                        };
                    }

                    if (indicator["identification"] === "CMF") {
                        indicator_name = "cmf";
                        options = {
                            signal: indicator["signal"],
                            levelLine: indicator["levelLine-CMF"],
                            period: indicator["period-CMF"],
                        };
                    }

                    if (indicator["identification"] === "VWMA") {
                        indicator_name = "volume_weighted_moving_average";
                        options = {
                            signal: indicator["signal"],
                            applyTo: indicator["applyTo-VWMA"],
                            period: indicator["period-VWMA"],
                            offset: indicator["offset-VWMA"],
                        };
                    }

                    if (indicator["identification"] === "CHOP") {
                        indicator_name = "chop";
                        options = {
                            signal: indicator["signal"],
                            levelLine: indicator["levelLine-CHOP"],
                            period: indicator["period-CHOP"],
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

        let entry = formatIndicator(longEntryList);
        let exit = formatIndicator(longExitList);
        if (stockData.length > 0 && entry.length > 0 && exit.length > 0) {
            console.log({ entry });
            const BackTestData = new PTBackTest({
                stockData: stockData,
                technicalIndicators: {
                    entry: entry,
                    exit: exit,
                },
                stopLoss: {
                    isEnabled: strategyProperties["stopLoss"] === "Not used" ? false : true,
                    type: strategyProperties["stopLoss"],
                    value: strategyProperties["lossPips"],
                },
                takeProfit: {
                    isEnabled: strategyProperties["takeProfit"] === "Not used" ? false : true,
                    value: strategyProperties["profitPips"],
                },
                tradeSize: strategyProperties["entryLots"],
                spread: marketData["spread"],
            }).backtest();

            let bmd = designState.backmarketData.map((item, index) => {
                return {
                    ...item,
                    value: BackTestData[item.accessor],
                };
            });

            //PT-279 Trade Journal
            sessionStorage.setItem("tradeJournal", JSON.stringify(BackTestData["trade"]));
            BackTestData["trade"] = [];

            designDispatch({
                type: "SET_COMPUTATION",
                computation: BackTestData,
                balance_chart: BackTestData.balanceChart,
                backmarketData: bmd,
                shouldCompute: false,
            });
        }
    };

    return {
        handleAddIndicator,
    };
};
