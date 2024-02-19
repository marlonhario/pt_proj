import { useContext } from "react";
import { useGetTrashQuery, useGetStrategiesQuery } from "../../../generated/graphql";
import { ContextBasket, ContextFilterBasket } from "../../../hooks/context/Context";
import { getAccessToken } from "../../../accessToken";

const useBaskets = () => {
    const token = getAccessToken();

    /* Context */
    const { basketState, basketDispatch } = useContext(ContextBasket);
    const { filterBasketState } = useContext(ContextFilterBasket);
    /* Context */

    /* useQuery */
    const { data: dataStrategies, loading: loadingStrategies, refetch: refetchStrategies } = useGetStrategiesQuery({
        variables: {
            token: token,
            sort_id: basketState.sort_collection,
            type: basketState.sort_order,
            data: filterBasketState,
        },
        fetchPolicy: "network-only",
    });

    const { data: dataTrash, loading: loadingTrash, refetch: refetchTrash } = useGetTrashQuery({
        variables: {
            token: token,
        },
        fetchPolicy: "network-only",
    });
    /* useQuery */

    return {
        dataStrategies,
        loadingStrategies,
        refetchStrategies,
        dataTrash,
        loadingTrash,
        refetchTrash,
        basketState,
        basketDispatch,
    };
};

export default useBaskets;
