import React, { useReducer, useEffect } from "react";

import {
    ContextBasket,
    ContextMarketDetail,
    ContextFilterBasket,
    ContextTime,
    ContextGenerate,
    ContextDesign,
    ContextGenerateRun,
    ContextGenerateValidation,
} from "../context/Context";
import { marketdetailReducer, timeReducer } from "../context/Reducer";
import { BasketInitialState, MarketDetailInitialState, FilterBasketInitialState, TimeInitialState } from "../context/InitialState";
import { basketReducer, filterBasketReducer } from "../context/reducer/Baskets/reducer";
import { generateReducer, generateRunReducer, validationReducer } from "../context/reducer/Generate/reducer";
import { GenerateInitialState, GenerateRunInitial, GenerateValidationInitial } from "../context/initial/Generate/initial";
import { designReducer } from "../context/reducer/Design/reducer";
import { DesignInitialState } from "../context/initial/Design/initial";

export const RootProdiver = ({ children }) => {
    const [basketState, basketDispatch] = useReducer(basketReducer, BasketInitialState);
    const [marketDetailState, marketDetailDispatch] = useReducer(marketdetailReducer, MarketDetailInitialState);
    const [filterBasketState, filterBasketDispatch] = useReducer(filterBasketReducer, FilterBasketInitialState);
    const [timeState, timeDispatch] = useReducer(timeReducer, TimeInitialState);
    const [generateState, generateDispatch] = useReducer(generateReducer, GenerateInitialState, () => {
        const local = localStorage.getItem("generate_strategies");

        return local ? JSON.parse(local) : GenerateInitialState;
    });
    const [designState, designDispatch] = useReducer(designReducer, DesignInitialState, () => {
        const local = localStorage.getItem("design_data");

        return local ? JSON.parse(local) : DesignInitialState;
    });

    const [generateRState, generateRunDispatch] = useReducer(generateRunReducer, GenerateRunInitial);

    const [generateValidationState, generateValidationDispatch] = useReducer(validationReducer, GenerateValidationInitial, () => {
        const local = localStorage.getItem("generate_validation");

        return local ? JSON.parse(local) : GenerateValidationInitial;
    });

    useEffect(() => {
        localStorage.setItem("generate_strategies", JSON.stringify(generateState));
    }, [generateState]);

    useEffect(() => {
        localStorage.setItem("design_data", JSON.stringify(designState));
    }, [designState]);

    useEffect(() => {
        localStorage.setItem("generate_validation", JSON.stringify(generateValidationState));
    }, [generateValidationState]);

    return (
        <ContextGenerateRun.Provider value={{ generateRState, generateRunDispatch }}>
            <ContextBasket.Provider value={{ basketState, basketDispatch }}>
                <ContextMarketDetail.Provider value={{ marketDetailState, marketDetailDispatch }}>
                    <ContextFilterBasket.Provider value={{ filterBasketState, filterBasketDispatch }}>
                        <ContextTime.Provider value={{ timeState, timeDispatch }}>
                            <ContextGenerate.Provider value={{ generateState, generateDispatch }}>
                                <ContextDesign.Provider value={{ designState, designDispatch }}>
                                    <ContextGenerateValidation.Provider value={{ generateValidationState, generateValidationDispatch }}>
                                        {children}
                                    </ContextGenerateValidation.Provider>
                                </ContextDesign.Provider>
                            </ContextGenerate.Provider>
                        </ContextTime.Provider>
                    </ContextFilterBasket.Provider>
                </ContextMarketDetail.Provider>
            </ContextBasket.Provider>
        </ContextGenerateRun.Provider>
    );
};
