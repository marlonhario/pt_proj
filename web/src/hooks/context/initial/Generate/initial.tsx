import { number } from "yargs";
import { generateData } from "../../data/Generate/data";

const { data_list, initial_data_list, complete_initial, in_sample_initial, out_sample_initial } = generateData();

export const GenerateInitialState = {
    historical: true,
    strategy: false,
    generator: false,
    fullOptimization: false,
    walkOptimization: false,
    normalization: false,
    walkValidation: false,
    monteValidation: false,
    multiValidation: false,
    checkFullOptimization: false,
    checkWalkOptimization: false,
    checkNormalization: false,
    checkWalkValidation: false,
    checkMonteValidation: false,
    checkMultiValidation: false,
    entry_lots: 10000,
    symbol: { label: "", value: "" },
    period: { label: "H1", value: "60min" },
    stop_loss: { label: "Do not use", value: "dns" },
    type_stop_loss: { label: "Fixed", value: "fixed" },
    min_pips: 10,
    max_pips: 100,
    take_profit: { label: "Do not use", value: "dns" },
    profit_min_pips: 10,
    profit_max_pips: 100,
    working_mins: 30,
    search_best: { label: "Net balance", value: "net_balance" },
    out_sample: { label: "In sample", value: "is" },
    generate_max_entry: { label: "4", value: 4 },
    generate_max_exit: { label: "2", value: 2 },
    generate_preset_indicators: true,
    generate_acceptance_criteria: true,
    stockData: [],
    marketData: {},
    strategyProperties: {},
};

export interface generateState {
    historical: boolean;
    strategy: boolean;
    generator: boolean;
    fullOptimization: boolean;
    walkOptimization: boolean;
    normalization: boolean;
    walkValidation: boolean;
    monteValidation: boolean;
    multiValidation: boolean;
    checkFullOptimization: boolean;
    checkWalkOptimization: boolean;
    checkNormalization: boolean;
    checkWalkValidation: boolean;
    checkMonteValidation: boolean;
    checkMultiValidation: boolean;
    entry_lots: number;
    symbol: genValue;
    period: genValue;
    stop_loss: genValue;
    type_stop_loss: genValue;
    min_pips: number;
    max_pips: number;
    take_profit: genValue;
    profit_min_pips: number;
    profit_max_pips: number;
    working_mins: number;
    search_best: genValue;
    out_sample: genValue;
    generate_max_entry: genValue1;
    generate_max_exit: genValue1;
    generate_preset_indicators: boolean;
    generate_acceptance_criteria: boolean;
    stockData: any;
    marketData: any;
    strategyProperties: any;
}

export interface genValue {
    label: string;
    value: string;
}

export interface genValue1 {
    label: string;
    value: number;
}

export type generateAction = {
    type:
        | "HISTORICAL"
        | "STRATEGY"
        | "GENERATOR"
        | "FULL_OPTIMIZATION"
        | "WALK_OPTIMIZATION"
        | "NORMALIZATION"
        | "WALK_VALIDATION"
        | "MONTE_VALIDATION"
        | "MULTI_VALIDATION"
        | "CHECK_FULL_OPTIMIZATION"
        | "CHECK_WALK_OPTIMIZATION"
        | "CHECK_NORMALIZATION"
        | "CHECK_WALK_VALIDATION"
        | "CHECK_MONTE_VALIDATION"
        | "CHECK_MULTI_VALIDATION";
};

export const GenerateRunInitial = {
    progress: 0,
    start: false,
    count: 0,
    calculated: 0,
    ascended: 0,
};

export interface generateRunState {
    progress: number;
    start: boolean;
    count: number;
    calculated: number;
    ascended: number;
}

export const GenerateValidationInitial = {
    generate_acceptance_data_list: data_list,
    complete_backtest_initial: complete_initial,
    in_sample_initial: in_sample_initial,
    out_sample_initial: out_sample_initial,
};

export interface generateValidationState {
    generate_acceptance_data_list: any;
    complete_backtest_initial: any;
    in_sample_initial: any;
    out_sample_initial: any;
}
