interface LoginState {
    email: string;
    password: string;
    isLoading: boolean;
    error: string;
    isLoggedIn: boolean;
    variant: 'login' | 'forgetPassword';
}

export type LoginAction =
    | { type: 'login' | 'success' | 'error' | 'logOut' }
    | { type: 'field'; fieldName: string; payload: string };

export const loginReducer = (state: LoginState, action: LoginAction) => {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload,
            };
        }
        case 'login': {
            return {
                ...state,
                error: '',
                isLoading: true,
            };
        }
        case 'success': {
            return {
                ...state,
                isLoggedIn: true,
                isLoading: false,
            };
        }
        case 'error': {
            return {
                ...state,
                error: 'Incorrect username or password!',
                isLoggedIn: false,
                isLoading: false,
                username: '',
                password: '',
            };
        }
        case 'logOut': {
            return {
                ...state,
                isLoggedIn: false,
            };
        }
        default:
            return state;
    }
}