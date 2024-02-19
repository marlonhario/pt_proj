import { useContext } from "react";
import { ContextDesign, ContextGenerate } from "../../../../hooks/context/Context";
import PTBackTest from "../../../../trade-library/PTBackTest";

export const useIndicator = () => {
    const { designState } = useContext(ContextDesign);
    const { generateState } = useContext(ContextGenerate);

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

                    record.push({
                        name: indicator_name,
                        options: options,
                    });
                });
            }

            return record;
        };

        let entry = formatIndicator(data.entry);
        let exit = formatIndicator(data.exit);

        if (stockData.length > 0 && entry.length > 0 && exit.length > 0) {
            const BackTestData = new PTBackTest({
                stockData: stockData,
                technicalIndicators: {
                    entry: entry,
                    exit: exit,
                },
                stopLoss: {
                    isEnabled: strategyProperties["stopLoss"] === "Not used" ? false : true,
                    type: "Not used",
                    value: 100,
                },
                takeProfit: {
                    isEnabled: strategyProperties["takeProfit"] === "Not used" ? false : true,
                    value: 100,
                },
                tradeSize: generateState.entry_lots,
                spread: 0,
            }).backtest();

            let bmd = designState.backmarketData.map((item, index) => {
                return {
                    ...item,
                    value: BackTestData[item.accessor],
                };
            });

            return {
                BackTestData,
                bmd,
            };
        }
    };

    return {
        handleAddIndicator,
    };
};
