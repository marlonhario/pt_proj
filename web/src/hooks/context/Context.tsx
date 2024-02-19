import React, { createContext } from "react";
import { basketState, marketdetailState, filterBasketInputState, timeState } from "./State";
import { BasketInitialState, MarketDetailInitialState, FilterBasketInitialState, TimeInitialState } from "./InitialState";
import {
    GenerateInitialState,
    GenerateRunInitial,
    GenerateValidationInitial,
    generateRunState,
    generateState,
    generateValidationState,
} from "./initial/Generate/initial";
import { DesignInitialState, designState } from "./initial/Design/initial";

export const ContextBasket = createContext<{
    basketState: basketState;
    basketDispatch: React.Dispatch<any>;
}>({ basketState: BasketInitialState, basketDispatch: () => null });

export const ContextMarketDetail = createContext<{
    marketDetailState: marketdetailState;
    marketDetailDispatch: React.Dispatch<any>;
}>({
    marketDetailState: MarketDetailInitialState,
    marketDetailDispatch: () => null,
});

export const ContextFilterBasket = createContext<{
    filterBasketState: filterBasketInputState;
    filterBasketDispatch: React.Dispatch<any>;
}>({
    filterBasketState: FilterBasketInitialState,
    filterBasketDispatch: () => null,
});

export const ContextTime = createContext<{
    timeState: timeState;
    timeDispatch: React.Dispatch<any>;
}>({ timeState: TimeInitialState, timeDispatch: () => null });

export const ContextGenerate = React.createContext<{
    generateState: generateState;
    generateDispatch: React.Dispatch<any>;
}>({ generateState: GenerateInitialState, generateDispatch: () => null });

export const ContextDesign = React.createContext<{
    designState: designState;
    designDispatch: React.Dispatch<any>;
}>({ designState: DesignInitialState, designDispatch: () => null });

export const ContextGenerateRun = createContext<{
    generateRState: generateRunState;
    generateRunDispatch: React.Dispatch<any>;
}>({ generateRState: GenerateRunInitial, generateRunDispatch: () => null });

export const ContextGenerateValidation = createContext<{
    generateValidationState: generateValidationState;
    generateValidationDispatch: React.Dispatch<any>;
}>({
    generateValidationState: GenerateValidationInitial,
    generateValidationDispatch: () => null,
});
