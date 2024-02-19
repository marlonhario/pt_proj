import React, { createContext, Dispatch, useReducer } from 'react';
import { loginReducer, LoginAction } from '../hooks/login/loginReducer';
import { LoginState } from '../types/login';

interface Props {
    children: any
}

const initialState: LoginState = {
    email: '',
    password: '',
    isLoading: false,
    error: '',
    isLoggedIn: false,
    variant: 'login',
};

export const Context = createContext<{ state: LoginState, dispatch: Dispatch<LoginAction> }>({
    state: initialState,
    dispatch: () => null
});

const ContextProvider: React.FC<Props> = (props: Props) => {
    const [state, dispatch] = useReducer(loginReducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
