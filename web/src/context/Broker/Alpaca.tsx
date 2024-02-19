import React, { useReducer, useEffect, createContext, useCallback } from 'react';
import {
	usePlaidLinkQuery
} from "../../generated/graphql";
import { initialState } from "../InitialState";
import { toastify } from "../../components/Toastify";

interface Props {
	state: { linkToken: string };
}


export const AlpacaContext = createContext<Partial<Props>>({});

const SET_LINK_TOKEN = 'SET_LINK_TOKEN';


const reducer = (state, action) => {

	if (action.type === SET_LINK_TOKEN) {
		return { ...state, linkToken: action.payload };
	}

	return state;
};

export const AlpacaProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { data } = usePlaidLinkQuery();

	const addToken = useCallback((token) => {
		dispatch({
			type: SET_LINK_TOKEN,
			payload: token
		});
	}, [dispatch]);

	const value = { state, addToken };

	return (
		<AlpacaContext.Provider value={value}>
			{children}
		</AlpacaContext.Provider>
	)
}