import { useContext } from "react";
import { useGetMarketDataMutation } from "../../../generated/graphql";
import { ContextDesign } from "../../../hooks/context/Context";

export const useFetchStock = () => {
  const { designState, designDispatch } = useContext(ContextDesign);
  let [getMarketDataMutation, { data, loading }] = useGetMarketDataMutation();

  const fetchStockData = async (symbol: string, interval: string) => {
    let {
      data: { getMarketData },
    } = await getMarketDataMutation({
      variables: {
        symbol: symbol,
        interval: interval,
        marketId: designState.marketData.id,
      },
    });

    if (getMarketData) {
      const data = getMarketData.reduce((acc, cur) => {
        return [
          ...acc,
          {
            Time: cur["last_update"],
            Open: cur["open"],
            High: cur["high"],
            Low: cur["low"],
            Close: cur["close"],
            Volume: cur["volume"],
          },
        ];
      }, []);

      return {
        data: data,
        getMarketData: getMarketData,
      };
    }
  };

  return {
    fetchStockData,
  };
};
