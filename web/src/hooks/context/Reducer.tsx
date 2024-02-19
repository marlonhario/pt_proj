import { MARKETDETAILACTIONS } from "../context/Actions"
import { marketdetailState, timeState } from "../context/State"

export const marketdetailReducer = (state: marketdetailState, action: any) => {
    switch (action.type) {
        case MARKETDETAILACTIONS.SET_SYMBOLS: {
            return {
                ...state,
                input_symbols: action.payload
            }
        }
        default:
            return state;
    }
}

export const timeReducer = (state: timeState, action: any) => {
    switch (action.type) {
        case 'increment': {
            return {
                ...state,
                count: state.count + 1
            }
        }
        case 'decrement': {
            return {
                ...state,
                count: state.count - 1
            }
        }
        default:
            return state;
    }
}