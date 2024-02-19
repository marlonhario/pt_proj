import { GenerateInitialState, GenerateRunInitial } from "../../initial/Generate/initial";

export const generateReducer = (state: any, action: any) => {
    switch (action.type) {
        case "HISTORICAL":
            return {
                ...state,
                historical: action.historical,
                strategy: false,
                generator: false,
                fullOptimization: false,
                walkOptimization: false,
                normalization: false,
                walkValidation: false,
                monteValidation: false,
                multiValidation: false,
            };
        case "STRATEGY":
            return {
                ...state,
                historical: false,
                strategy: action.strategy,
                generator: false,
                fullOptimization: false,
                walkOptimization: false,
                normalization: false,
                walkValidation: false,
                monteValidation: false,
                multiValidation: false,
            };
        case "GENERATOR":
            return {
                ...state,
                historical: false,
                strategy: false,
                generator: action.generator,
                fullOptimization: false,
                walkOptimization: false,
                normalization: false,
                walkValidation: false,
                monteValidation: false,
                multiValidation: false,
            };
        case "FULL_OPTIMIZATION":
            return {
                ...state,
                historical: false,
                strategy: false,
                generator: false,
                fullOptimization: action.fullOptimization,
                walkOptimization: false,
                normalization: false,
                walkValidation: false,
                monteValidation: false,
                multiValidation: false,
            };
        case "WALK_OPTIMIZATION":
            return {
                ...state,
                historical: false,
                strategy: false,
                generator: false,
                fullOptimization: false,
                walkOptimization: action.walkOptimization,
                normalization: false,
                walkValidation: false,
                monteValidation: false,
                multiValidation: false,
            };
        case "NORMALIZATION":
            return {
                ...state,
                historical: false,
                strategy: false,
                generator: false,
                fullOptimization: false,
                walkOptimization: false,
                normalization: action.normalization,
                walkValidation: false,
                monteValidation: false,
                multiValidation: false,
            };
        case "WALK_VALIDATION":
            return {
                ...state,
                historical: false,
                strategy: false,
                generator: false,
                fullOptimization: false,
                walkOptimization: false,
                normalization: false,
                walkValidation: action.walkValidation,
                monteValidation: false,
                multiValidation: false,
            };
        case "MONTE_VALIDATION":
            return {
                ...state,
                historical: false,
                strategy: false,
                generator: false,
                fullOptimization: false,
                walkOptimization: false,
                normalization: false,
                walkValidation: false,
                monteValidation: action.monteValidation,
                multiValidation: false,
            };
        case "MULTI_VALIDATION":
            return {
                ...state,
                historical: false,
                strategy: false,
                generator: false,
                fullOptimization: false,
                walkOptimization: false,
                normalization: false,
                walkValidation: false,
                monteValidation: false,
                multiValidation: action.multiValidation,
            };
        case "CHECK_FULL_OPTIMIZATION":
            return {
                ...state,
                checkFullOptimization: action.checkFullOptimization,
            };
        case "CHECK_WALK_OPTIMIZATION":
            return {
                ...state,
                checkWalkOptimization: action.checkWalkOptimization,
            };
        case "CHECK_NORMALIZATION":
            return {
                ...state,
                checkNormalization: action.checkNormalization,
            };
        case "CHECK_WALK_VALIDATION":
            return {
                ...state,
                checkWalkValidation: action.checkWalkValidation,
            };
        case "CHECK_MONTE_VALIDATION":
            return {
                ...state,
                checkMonteValidation: action.checkMonteValidation,
            };
        case "CHECK_MULTI_VALIDATION":
            return {
                ...state,
                checkMultiValidation: action.checkMultiValidation,
            };
        case "CHANGE_SYMBOL":
            return {
                ...state,
                symbol: action.symbol,
            };
        case "CHANGE_PERIOD":
            return {
                ...state,
                period: action.period,
            };
        case "STOP_LOSS":
            return {
                ...state,
                stop_loss: action.stop_loss,
            };
        case "TYPE_STOP_LOSS":
            return {
                ...state,
                type_stop_loss: action.type_stop_loss,
            };
        case "ENTRY_LOTS":
            return {
                ...state,
                entry_lots: action.entry_lots,
            };
        case "MIN_PIPS":
            return {
                ...state,
                min_pips: action.min_pips,
            };
        case "MAX_PIPS":
            return {
                ...state,
                max_pips: action.max_pips,
            };
        case "TAKE_PROFIT":
            return {
                ...state,
                take_profit: action.take_profit,
            };
        case "PROFIT_MIN_PIPS":
            return {
                ...state,
                profit_min_pips: action.profit_min_pips,
            };
        case "PROFIT_MAX_PIPS":
            return {
                ...state,
                profit_max_pips: action.profit_max_pips,
            };
        case "WORKING_MINS":
            return {
                ...state,
                working_mins: action.working_mins,
            };
        case "SEARCh_BEST":
            return {
                ...state,
                search_best: action.search_best,
            };
        case "OUT_SAMPLE":
            return {
                ...state,
                out_sample: action.out_sample,
            };
        case "MAX_ENTRY":
            return {
                ...state,
                generate_max_entry: action.generate_max_entry,
            };
        case "MIN_ENTRY":
            return {
                ...state,
                generate_max_exit: action.generate_max_exit,
            };
        case "GENERATE_PRESET":
            return {
                ...state,
                generate_preset_indicators: action.generate_preset_indicators,
            };
        case "GENERATE_ACCEPTANCE":
            return {
                ...state,
                generate_acceptance_criteria: action.generate_acceptance_criteria,
            };
        case "SET_STOCKDATA":
            return {
                ...state,
                stockData: action.stockData,
                marketData: action.marketData,
            };
        case "GENERATE_RESET":
            return GenerateInitialState;
        default:
            return state;
    }
};

export const generateRunReducer = (state, action) => {
    switch (action.type) {
        case "SET_RANDOM_START":
            return {
                ...state,
                progress: action.progress,
            };
        case "SET_START_COUNT":
            return {
                ...state,
                count: action.count,
            };
        case "SET_START":
            return {
                ...state,
                start: action.start,
            };
        case "SET_CALCULATED":
            return {
                ...state,
                calculated: action.calculated,
                ascended: action.ascended,
            };
        case "SET_ASCENDED":
            return {
                ...state,
                ascended: action.ascended,
            };
        case "SET_RESET":
            return GenerateRunInitial;
        default:
            return state;
    }
};

export const validationReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_ACCEPTANCE_VALUE":
            return {
                ...state,
                complete_backtest_initial: action.complete_backtest_initial,
            };
        case "UPDATE_ACCEPTANCE_VALUE1":
            return {
                ...state,
                in_sample_initial: action.in_sample_initial,
            };
        case "UPDATE_ACCEPTANCE_VALUE2":
            return {
                ...state,
                out_sample_initial: action.out_sample_initial,
            };
        case "UPDATE_ACCEPTANCE_CRITERIA":
            return {
                ...state,
                complete_backtest_initial: action.complete_backtest_initial,
            };
        case "UPDATE_ACCEPTANCE_CRITERIA1":
            return {
                ...state,
                in_sample_initial: action.in_sample_initial,
            };
        case "UPDATE_ACCEPTANCE_CRITERIA2":
            return {
                ...state,
                out_sample_initial: action.out_sample_initial,
            };
        case "RESET_ACCEPTANCE_VALUE":
            return {
                ...state,
                complete_backtest_initial: action.complete_initial,
            };
        case "RESET_ACCEPTANCE_VALUE1":
            return {
                ...state,
                in_sample_initial: action.in_sample_initial,
            };
        case "RESET_ACCEPTANCE_VALUE2":
            return {
                ...state,
                out_sample_initial: action.out_sample_initial,
            };
        case "DELETE_ACCEPTANCE_VALUE":
            return {
                ...state,
                complete_backtest_initial: action.complete_backtest_initial,
            };
        case "DELETE_ACCEPTANCE_VALUE1":
            return {
                ...state,
                in_sample_initial: action.in_sample_initial,
            };
        case "DELETE_ACCEPTANCE_VALUE2":
            return {
                ...state,
                out_sample_initial: action.out_sample_initial,
            };
        default:
            return state;
    }
};
