import { DesignInitialState } from "../../initial/Design/initial";

export const designReducer = (state: any, action: any) => {
    switch (action.type) {
        case "SET_TOGGLE_MARKET":
            return {
                ...state,
                toggleMarket: action.toggleMarket,
            };
        case "SET_TOGGLE_BACKTEST_RESULLT":
            return {
                ...state,
                toggleBackTestResult: action.toggleBackTestResult,
            };
        case "SET_INPUT_SPREAD":
            return {
                ...state,
                marketData: {
                    ...state.marketData,
                    spread: Number(action.spread),
                },
            };
        case "SET_MARKET_SELECTION":
            return {
                ...state,
                marketData: {
                    ...state.marketData,
                    name: action.name,
                    symbol: action.symbol,
                    exchange: action.exchange,
                },
                loading: action.loading,
            };
        case "SET_MARKET_INTERVAL":
            return {
                ...state,
                marketData: {
                    ...state.marketData,
                    interval: action.interval,
                },
                loadingInterval: action.loadingInterval,
            };
        case "SET_MARKET":
            return {
                ...state,
                longEntryList: action.longEntryList,
                shortEntryList: action.shortEntryList,
                longExitList: action.longExitList,
                shortExitList: action.shortExitList,
                marketData: action.marketData,
                strategyProperties: action.strategyProperties,
                backmarketData: action.backmarketData,
                balance_chart: action.balance_chart,
                computation: action.computation,
            };
        case "SET_COMPUTATION_BACK_MARKET":
            return {
                ...state,
                backmarketData: {
                    ...state.backmarketData,
                    drawdown: action.drawdown,
                    maxDrawDown: action.maxDrawDown,
                    netProfit: action.netProfit,
                    profitPerDay: action.profitPerDay,
                    tradeCount: action.tradeCount,
                },
            };

        case "SET_DEFAULT_BACKMARKET":
            return {
                ...state,
                balance_chart: [],
                backmarketData: action.backmarketData,
                computation: {},
            };

        case "SET_MARKET_STRATEGY":
            return {
                ...state,
                strategyId: action.strategyId,
            };
        case "SET_BACK_MARKET_DATA":
            return {
                ...state,
                backmarketData: action.backmarketData,
            };
        case "SET_STORAGE_MARKET_LIST":
            return {
                ...state,
                storageMarketList: action.storageMarketList,
            };
        case "SET_INITIALIZE_MARKET":
            return {
                ...state,
                marketData: {
                    ...state.marketData,
                    market: action.initialMarket.market,
                },
            };
        case "SET_NUMBER_DATA_RECORDS":
            return {
                ...state,
                marketData: {
                    ...state.marketData,
                    number_data_records: action.number_data_records,
                },
                stockData: action.stockData,
                loading: action.loading,
                loadingInterval: action.loadingInterval,
            };
        case "SET_ENTRY_EXIT_LIST":
            return {
                ...state,
                longEntryList: action.longEntryList,
                longExitList: action.longExitList,
                shortEntryList: action.shortEntryList,
                shortExitList: action.shortExitList,
            };
        case "SET_DELETE_ITEM":
            return {};
        case "SET_LOADING":
            return {
                ...state,
                loading: action.loading,
            };
        case "SET_SELECTED_INDICATORS":
            return {
                ...state,
                selectedIndicatorData: action.selectedIndicatorData,
            };
        case "SET_TOGGLE_LONG_ENTRY_RULES":
            return {
                ...state,
                isLongEntryRules: action.isLongEntryRules,
                selectedIndicatorData: action.selectedIndicatorData,
            };
        case "SET_SELECTED_INDICATOR":
            return {
                ...state,
                selectedIndicator: action.selectedIndicator,
            };
        case "UPDATE_FORM_PROPERTY":
            return {
                ...state,
                formProperty: {
                    ...state.formProperty,
                    ...action.formProperty,
                },
            };
        case "UPDATE_IDENTIFICATION":
            return {
                ...state,
                identification: action.identification,
            };
        case "SET_LONG_ENTRY":
            return {
                ...state,
                longEntryList: action.long,
            };
        case "SET_SHORT_ENTRY":
            return {
                ...state,
                shortEntryList: action.short,
            };
        case "SET_LONG_EXIT":
            return {
                ...state,
                longExitList: action.long,
            };
        case "SET_SHORT_EXIT":
            return {
                ...state,
                shortExitList: action.short,
            };
        case "UPDATE_ENTRY_INDICATOR":
            return {
                ...state,
                longEntryList: action.long,
                shortEntryList: action.short,
            };
        case "UPDATE_EXIT_INDICATOR":
            return {
                ...state,
                longExitList: action.long,
                shortExitList: action.short,
            };
        case "UPDATE_SIGNAL":
            return {
                ...state,
                signal: action.signal,
            };
        case "UPDATE_SELECTED_SIGNAL":
            return {
                ...state,
                selectedSignal: action.selectedSignal,
            };
        case "UPDATE_INDICATORS_JSON":
            return {
                ...state,
                indicatorName: action.indicatorName,
                signal: action.signal,
                selectedSignal: action.selectedSignal,
                formProperty: action.formProperty,
                identification: action.identification,
            };
        case "UPDATE_INDICATORS_JSON_1":
            return {
                ...state,
                selectedIndicator: action.selectedIndicator,
                identification: action.identification,
                signal: action.signal,
                formProperty: action.formProperty,
                selectedSignal: action.selectedSignal,
            };
        case "UPDATE_INDICATORS_JSON_2":
            return {
                ...state,
                properties: action.properties,
                signal: action.signal,
                identification: action.identification,
            };
        case "UPDATE_INDICATORS_JSON_3":
            return {
                ...state,
                selectedSignal: action.selectedSignal,
            };
        case "SET_STRATEGY_TOGGLE":
            return {
                ...state,
                isStrategyOpen: action.isStrategyOpen,
            };
        case "UPDATE_STRATEGIY_PROPERTIES":
            return {
                ...state,
                strategyProperties: action.strategyProperties,
            };
        case "DELETE_ENTRY_STRATEGY":
            return {
                ...state,
                longEntryList: action.longEntryList,
                shortEntryList: action.shortEntryList,
            };
        case "DELETE_EXIT_STRATEGY":
            return {
                ...state,
                longExitList: action.longExitList,
                shortExitList: action.shortExitList,
            };
        case "SET_COMPUTATION":
            return {
                ...state,
                computation: action.computation,
                backmarketData: action.backmarketData,
                balance_chart: action.balance_chart,
            };
        case "UPDATE_BACK_TEST_BALANCE_CHART":
            return {
                ...state,
                backmarketData: action.backmarketData,
                balance_chart: action.balance_chart,
            };
        case "RESET_SELECTION":
            return {
                ...state,
                selectedIndicatorData: action.selectedIndicatorData,
                signal: action.signal,
                selectedSignal: action.selectedSignal,
            };
        case "SET_STRATEGY_RESET":
            return DesignInitialState;
        default:
            return state;
    }
};
