import { BASKETSACTIONS } from "../../Actions";
import { basketState, filterBasketInputState } from "../../State"

export const basketReducer = (state: basketState, action: any) => {
    switch (action.type) {
        case BASKETSACTIONS.SORT_COLLECTION: {
            return {
                ...state,
                sort_collection: action.sort_collection,
                sort_order: action.sort_order,
                start: action.start,
                end: action.end,
            }
        }
        case BASKETSACTIONS.LOAD_STRATEGIES: {
            return {
                ...state,
                sort_collection: action.sort_collection,
                sort_order: action.sort_order,
                start: action.start,
                end: action.end,
            }
        }
        case BASKETSACTIONS.TRASH_STRATEGIES: {
            return {
                ...state,
                trash_strategies: [...state.trash_strategies, action.payload]
            }
        }
        case BASKETSACTIONS.SET_TRASH_STRATEGIES: {
            return {
                ...state,
                trash_strategies: action.payload
            }
        }
        default:
            return state;
    }
}

export const filterBasketReducer = (initial: filterBasketInputState, action: any) => {
    switch (action.type) {
        case 'minimum_net_profit': {
            return {
                ...initial,
                minimum_net_profit: action.id,
                minimum_net_profit_value: action.value,
            }
        }
        case 'maximum_average_position_length': {
            console.log(initial)
            return {
                ...initial,
                maximum_average_position_length: action.id,
                maximum_average_position_length_value: action.value
            }
        }
        case 'maximum_bars_in_trade': {
            return {
                ...initial,
                maximum_bars_in_trade: action.id,
                maximum_bars_in_trade_value: action.value
            }
        }
        case 'maximum_consecutive_losses': {
            return {
                ...initial,
                maximum_consecutive_losses: action.id,
                maximum_consecutive_losses_value: action.value
            }
        }
        case 'maximum_count_of_trades': {
            return {
                ...initial,
                maximum_count_of_trades: action.id,
                maximum_count_of_trades_value: action.value
            }
        }
        case 'maximum_equity_drawdown': {
            return {
                ...initial,
                maximum_equity_drawdown: action.id,
                maximum_equity_drawdown_value: action.value
            }
        }
        case 'maximum_equity_drawdown_percent': {
            return {
                ...initial,
                maximum_equity_drawdown_percent: action.id,
                maximum_equity_drawdown_percent_value: action.value
            }
        }
        case 'maximum_stagnation': {
            return {
                ...initial,
                maximum_stagnation: action.id,
                maximum_stagnation_value: action.value
            }
        }
        case 'maximum_stagnation_days': {
            return {
                ...initial,
                maximum_stagnation_days: action.id,
                maximum_stagnation_days_value: action.value
            }
        }
        case 'minimum_average_hpr': {
            return {
                ...initial,
                minimum_average_hpr: action.id,
                minimum_average_hpr_value: action.value
            }
        }
        case 'minimum_average_position_length': {
            return {
                ...initial,
                minimum_average_position_length: action.id,
                minimum_average_position_length_value: action.value
            }
        }
        case 'minimum_backtest_quality': {
            return {
                ...initial,
                minimum_backtest_quality: action.id,
                minimum_backtest_quality_value: action.value
            }
        }
        case 'minimum_balance_stability': {
            return {
                ...initial,
                minimum_balance_stability: action.id,
                minimum_balance_stability_value: action.value
            }
        }
        case 'minimum_bars_in_trade': {
            return {
                ...initial,
                minimum_bars_in_trade: action.id,
                minimum_bars_in_trade_value: action.value
            }
        }
        case 'minimum_count_of_trades': {
            return {
                ...initial,
                minimum_count_of_trades: action.id,
                minimum_count_of_trades_value: action.value
            }
        }
        case 'minimum_months_on_profit': {
            return {
                ...initial,
                minimum_months_on_profit: action.id,
                minimum_months_on_profit_value: action.value
            }
        }
        case 'minimum_profit_factor': {
            return {
                ...initial,
                minimum_profit_factor: action.id,
                minimum_profit_factor_value: action.value
            }
        }
        case 'minimum_profit_per_day': {
            return {
                ...initial,
                minimum_profit_per_day: action.id,
                minimum_profit_per_day_value: action.value
            }
        }
        case 'minimum_r_squared': {
            return {
                ...initial,
                minimum_r_squared: action.id,
                minimum_r_squared_value: action.value
            }
        }
        case 'minimum_return_drawdown': {
            return {
                ...initial,
                minimum_return_drawdown: action.id,
                minimum_return_drawdown_value: action.value
            }
        }
        case 'minimum_sharpe_ratio': {
            return {
                ...initial,
                minimum_sharpe_ratio: action.id,
                minimum_sharpe_ratio_value: action.value
            }
        }
        case 'minimum_system_quality_number': {
            return {
                ...initial,
                minimum_system_quality_number: action.id,
                minimum_system_quality_number_value: action.value
            }
        }
        case 'minimum_win_loss_ratio': {
            return {
                ...initial,
                minimum_win_loss_ratio: action.id,
                minimum_win_loss_ratio_value: action.value
            }
        }
        default:
            return initial;
    }
}