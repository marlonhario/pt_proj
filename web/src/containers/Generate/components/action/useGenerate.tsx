import { useContext, useEffect } from "react";
import { getAccessToken } from "../../../../accessToken";
import { useSaveStrategyMutation, useGetMarketSymbolQuery, useGetMarketDataSymbolQuery } from "../../../../generated/graphql";
import { ContextGenerate } from "../../../../hooks/context/Context";
import useBaskets from "../../../../services/graphQL/Baskets/useBaskets";

export const useGenerate = () => {
    const token = getAccessToken();

    const [saveStrategyMutation] = useSaveStrategyMutation();
    const { refetchStrategies } = useBaskets();

    const {
        generateState: { stockData, symbol, period, entry_lots },
        generateDispatch,
    } = useContext(ContextGenerate);

    /* useQuery */
    const { data: dataGenerate, loading: loadingGenerate, refetch: refetchGenerate } = useGetMarketSymbolQuery({
        fetchPolicy: "network-only",
    });

    const { data: dataGenerateSymbol, loading: loadingGenerateSymbol, refetch: refetchGenerateSymbol } = useGetMarketDataSymbolQuery({
        variables: {
            symbol: symbol.label,
            interval: period.value,
        },
        fetchPolicy: "network-only",
    });
    /* useQuery */

    useEffect(() => {
        if (symbol.value && period) {
            if (dataGenerateSymbol && dataGenerateSymbol.getMarketDataSymbol && !loadingGenerateSymbol) {
                const data = dataGenerateSymbol.getMarketDataSymbol.market_data.reduce((acc, cur) => {
                    return [
                        ...acc,
                        {
                            Time: cur["last_update"],
                            Open: cur["open"],
                            High: cur["high"],
                            Low: cur["low"],
                            Close: cur["close"],
                            Volume: cur["volume"],
                        },
                    ];
                }, []);

                generateDispatch({
                    type: "SET_STOCKDATA",
                    stockData: data,
                    marketData: {
                        exchange: dataGenerateSymbol.getMarketDataSymbol.market.currency,
                        first_data: "",
                        id: 0,
                        interval: period,
                        name: dataGenerateSymbol.getMarketDataSymbol.market.name,
                        number_data_records: dataGenerateSymbol.getMarketDataSymbol.market_data.length,
                        spread: 0,
                        symbol: symbol.label,
                    },
                });
            }
        }
    }, [symbol, period, dataGenerateSymbol]);

    async function saveRandomStrategy(indicators, details) {
        const { entryDetails, exitDetails } = indicators;

        const { data } = await saveStrategyMutation({
            variables: {
                token: token,
                options: {
                    editor_json: {
                        data: {
                            longEntryList: entryDetails.entryLong,
                            shortEntryList: entryDetails.entryShort,
                            longExitList: exitDetails.exitLong,
                            shortExitList: exitDetails.exitShort,
                        },
                        marketData: details.marketData,
                        strategyProperties: {
                            entryLots: entry_lots,
                            lossPips: 0,
                            profitPips: 0,
                            stopLoss: details.stop_loss.label,
                            takeProfit: details.take_profit.label,
                        },
                        balance_chart: details.balance_chart,
                        timestamp: details.timestamp,
                        backmarketData: details.backmarketData,
                        netProfit: details.backmarketData[0].value,
                        profitPerDay: details.backmarketData[1].value,
                        drawdown: details.backmarketData[2].value,
                        maxDrawDown: details.backmarketData[3].value,
                        tradeCount: details.backmarketData[4].value,
                    },
                },
            },
        });

        refetchStrategies();
    }

    return {
        dataGenerate,
        loadingGenerate,
        refetchGenerate,
        saveRandomStrategy,
    };
};
