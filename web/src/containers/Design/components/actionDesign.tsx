import { useContext, useRef } from "react";
import { getAccessToken } from "../../../accessToken";
import {
    useSaveStrategyMutation,
    useUpdateStrategyMutation,
} from "../../../generated/graphql";
import { ContextDesign } from "../../../hooks/context/Context";
import useBaskets from "../../../services/graphQL/Baskets/useBaskets";

import Swal from "sweetalert2";
import { useIndicatorFormStore } from "../../Editors/components/store";
import { marketData } from "../../Editors/components/MarketSettings/components/data";

export const ActionDesign = () => {
    const { designState, designDispatch } = useContext(ContextDesign);
    const {
        strategyId,
        longEntryList,
        shortEntryList,
        longExitList,
        shortExitList,
        backmarketData,
        strategyProperties,
        marketData,
    } = designState;
    const { refetchStrategies } = useBaskets();

    let [saveStrategyMutation] = useSaveStrategyMutation();
    let [updateStrategyMutation] = useUpdateStrategyMutation();

    let openIndicatorForm = useIndicatorFormStore(
        (state) => state.openIndicatorForm
    );
    let closeIndicatorForm = useIndicatorFormStore(
        (state) => state.closeIndicatorForm
    );

    const token = getAccessToken();

    const handleDownloadStrategy = async () => {
        Swal.fire({
            title: "Information",
            text: "Are you sure you want to download?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            allowOutsideClick: false,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = {
                    longEntryList: longEntryList,
                    shortEntryList: shortEntryList,
                    longExitList: longExitList,
                    shortExitList: shortExitList,
                    backmarketData: backmarketData,
                };
                const fileName = "file";
                const json = JSON.stringify(data);
                const blob = new Blob([json], { type: "application/json" });
                const href = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = href;
                link.download = fileName + ".json";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    };

    const handleAddStrategy = async () => {
        const designData = {
            longEntryList,
            shortEntryList,
            longExitList,
            shortExitList,
            backmarketData,
        };

        Swal.fire({
            title: "Information",
            text: strategyId
                ? "Are you sure you want to update this strategy?"
                : "Are you sure you want to add this strategy?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            allowOutsideClick: false,
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (!strategyId) {
                    const { data } = await saveStrategyMutation({
                        variables: {
                            token: token,
                            options: {
                                editor_json: {
                                    data: {
                                        longEntryList,
                                        shortEntryList,
                                        longExitList,
                                        shortExitList,
                                    },
                                    marketData: marketData,
                                    strategyProperties: strategyProperties,
                                    backmarketData: backmarketData,
                                },
                            },
                        },
                    });

                    if (data) {
                        Swal.fire({
                            title: "Successful!",
                            text: "Your strategies is successfully updated!",
                            icon: "success",
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                designDispatch({
                                    type: "SET_MARKET_STRATEGY",
                                    strategyId: data.saveStrategy.id,
                                });
                                refetchStrategies();
                            }
                        });
                    }
                } else {
                    const updateStrategy = await updateStrategyMutation({
                        variables: {
                            token: token,
                            options: {
                                id: strategyId,
                                editor_json: {
                                    data: designData,
                                    marketData: marketData,
                                    strategyProperties: strategyProperties,
                                    backmarketData: backmarketData,
                                },
                            },
                        },
                    });

                    if (updateStrategy.data.updateStrategy) {
                        Swal.fire({
                            title: "Successful!",
                            text: "Your strategies is successfully added!",
                            icon: "success",
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                refetchStrategies();
                            }
                        });
                    }
                }
            }
        });
    };

    const handleNewStrategy = () => {
        designDispatch({
            type: "SET_STRATEGY_RESET",
        });
    };

    const selectIndicator = (data: any) => {
        console.log({ selectedIndicator: data });
        openIndicatorForm();
        designDispatch({
            type: "SET_SELECTED_INDICATORS",
            selectedIndicatorData: data,
        });
    };

    const handleUpdateSignal = (data: any) => {
        console.log({ data });
        designDispatch({
            type: "UPDATE_SELECTED_SIGNAL",
            selectedSignal: data,
        });
    };

    return {
        handleDownloadStrategy,
        handleAddStrategy,
        handleNewStrategy,
        selectIndicator,
        handleUpdateSignal,
    };
};
