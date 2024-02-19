import { useContext, useEffect } from "react";
import { getAccessToken } from "../../../accessToken";
import { useGetStrategyProfileLazyQuery, useGetMarketListQuery, useInitializeMarketQuery } from "../../../generated/graphql";
import { ContextDesign } from "../../../hooks/context/Context";
import { useFetchStock } from "./useFetchStock";
import { useIndicator } from "./useIndicator";

export const useDesign = () => {
    const token = getAccessToken();

    /* Context */
    const { designState, designDispatch } = useContext(ContextDesign);
    /* Context */

    /* useQuery */
    const [getStrategyProfileQuery, { data: strategyProfile, loading: strategyProfileLoading }] = useGetStrategyProfileLazyQuery();

    const { data: DataMarketList, loading: LoadingMarketList } = useGetMarketListQuery();
    let { data: initialMarket, loading: initialMarketLoading } = useInitializeMarketQuery();
    /* useQuery */

    const {
        longEntryList,
        shortEntryList,
        longExitList,
        shortExitList,
        stockData,
        strategyProperties,
        strategyId,
        computation,
        marketData,
    } = designState;

    const { fetchStockData } = useFetchStock();
    const { handleAddIndicator } = useIndicator();

    /* useEffect */
    useEffect(() => {
        localStorage.setItem("design_data", JSON.stringify(designState));
    }, [designState]);

    useEffect(() => {
        if (designState.storageMarketList.length === 0 && DataMarketList && !LoadingMarketList) {
            const marketList = DataMarketList.getMarketList.market ? DataMarketList.getMarketList.market : [];
            designDispatch({
                type: "SET_STORAGE_MARKET_LIST",
                storageMarketList: marketList,
            });
        }
    }, [designState, DataMarketList]);

    const addIndicator = () => {
        if ((longEntryList.length > 0 || shortEntryList.length > 0) && (longExitList.length > 0 || shortExitList.length > 0)) {
            if (stockData.length > 0) {
                handleAddIndicator(
                    {
                        longEntry: longExitList,
                        shortEntry: shortEntryList,
                        longExit: longExitList,
                        shortExit: longExitList,
                    },
                    stockData,
                    strategyProperties
                );
            } else {
                handleAddIndicator(
                    {
                        longEntry: longExitList,
                        shortEntry: shortEntryList,
                        longExit: longExitList,
                        shortExit: longExitList,
                    },
                    undefined,
                    strategyProperties
                );
            }
        } else {
            designDispatch({
                type: "SET_DEFAULT_BACKMARKET",
                backmarketData: [
                    {
                        id: 1,
                        name: "Net Profit",
                        value: 0,
                        visible: true,
                        index: 0,
                        targetValue: 5000,
                        setting: "GREATER",
                        accessor: "netProfit",
                    },
                    {
                        id: 2,
                        name: "Profit per day",
                        value: 0,
                        visible: true,
                        index: 1,
                        targetValue: 20,
                        setting: "GREATER",
                        accessor: "profitPerDay",
                    },
                    {
                        id: 3,
                        name: "Max drawdown",
                        value: 0,
                        visible: true,
                        index: 2,
                        targetValue: 500,
                        setting: "LESSER",
                        accessor: "maxDrawDown",
                    },
                    {
                        id: 4,
                        name: "Return / drawdown",
                        value: 0,
                        visible: true,
                        index: 3,
                        targetValue: 2,
                        setting: "GREATER",
                        accessor: "drawdown",
                    },
                    {
                        id: 5,
                        name: "Count of trades",
                        value: 0,
                        visible: true,
                        index: 4,
                        targetValue: 4000,
                        setting: "LESSER",
                        accessor: "tradeCount",
                    },
                ],
                balanceChart: [],
            });
        }
    };

    useEffect(() => {
        addIndicator();
    }, [
        shortEntryList,
        shortExitList,
        longEntryList,
        longExitList,
        stockData,
        strategyProperties,
        longEntryList.length,
        longExitList.length,
        marketData,
    ]);

    useEffect(() => {
        if (localStorage.getItem("design_data")) {
            if (strategyId) {
                getStrategyProfileQuery({
                    variables: {
                        id: strategyId,
                        token: getAccessToken(),
                    },
                });
            }
        }

        if (strategyId) {
            getStrategyProfileQuery({
                variables: {
                    id: strategyId,
                    token: token,
                },
            });
        }
    }, []);

    useEffect(() => {
        if (strategyProfile && !strategyProfileLoading) {
            if (strategyProfile.getStrategyProfile.editor_json) {
                let {
                    editor_json: {
                        data: { longEntryList, shortEntryList, longExitList, shortExitList },
                        marketData,
                        strategyProperties,
                        backmarketData,
                        balance_chart,
                        timestamp,
                        netProfit,
                        profitPerDay,
                        drawdown,
                        maxDrawDown,
                        tradeCount,
                    },
                } = strategyProfile.getStrategyProfile;

                designDispatch({
                    type: "SET_MARKET",
                    longEntryList: longEntryList ? longEntryList : [],
                    shortEntryList: shortEntryList ? shortEntryList : [],
                    longExitList: longExitList ? longExitList : [],
                    shortExitList: shortExitList ? shortExitList : [],
                    marketData: marketData, // marketDate is always reset to []
                    strategyProperties: strategyProperties,
                    backmarketData: backmarketData ? backmarketData : [],
                    balance_chart: balance_chart,
                    computation: {
                        timestamp: timestamp,
                        netProfit: netProfit,
                        profitPerDay: profitPerDay,
                        drawdown: drawdown,
                        maxDrawDown: maxDrawDown,
                        tradeCount: tradeCount,
                    },
                });
            }
        }
    }, [strategyProfile]);

    useEffect(() => {
        if (computation) {
            if (Object.keys(computation).length > 0) {
                let backTest = computation;
                let newBackmarketData = designState.backmarketData.map((item: any) => {
                    return {
                        ...item,
                        value: backTest[item.accessor],
                    };
                });

                designDispatch({
                    type: "SET_BACK_MARKET_DATA",
                    backmarketData: newBackmarketData,
                });
            }
        } else {
            designDispatch({
                type: "SET_COMPUTATION_BACK_MARKET",
                drawdown: 0,
                maxDrawDown: 0,
                netProfit: 0,
                profitPerDay: 0,
                tradeCount: 0,
            });
        }
    }, [computation]);
    /* useEffect */

    const fetch = async () => {
        let results = await fetchStockData(marketData.symbol, marketData.interval.value);

        designDispatch({
            type: "SET_NUMBER_DATA_RECORDS",
            number_data_records: results.getMarketData.length,
            stockData: results.data,
            loading: false,
        });
    };

    return {
        designState,
        designDispatch,
    };
};
