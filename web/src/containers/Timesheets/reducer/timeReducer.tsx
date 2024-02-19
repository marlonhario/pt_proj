interface timeState {
    count: number;
}

type timeAction = | { type: 'increment' | 'decrement' }

export const timeReducer = (state: timeState, action: timeAction) => {
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