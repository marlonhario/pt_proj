import { initialState, PasswordState } from "../type/passwordType";

type passwordAction =
    | { type: 'field'; fieldName: string; payload: string };

export const passwordReducer = (state: PasswordState, action: passwordAction) => {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        }
        default:
            return state;
    }
}