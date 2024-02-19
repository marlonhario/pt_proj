import React from "react";
import { getAccessToken } from "../../../accessToken";
import { useGetPaperTradingByIdQuery } from "../../../generated/graphql";

const usePaperTrading = () => {
  const token = getAccessToken();
  const [paperList, setPaperList] = React.useState<any>([]);
  const { data, loading, refetch } = useGetPaperTradingByIdQuery({
    variables: {
      data: { token },
    },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if(data.getPaperTradingById.paper_trading.length === 0){
        setPaperList([])
      }
      else {
        setPaperList(
          data.getPaperTradingById.paper_trading[0].strategies
            .sort(
              (a, b) =>
                (a.order != null ? a.order : Infinity) -
                (b.order != null ? b.order : Infinity)
            )
            .map((item) => ({
              ...item,
              cumul_return:
                data.getPaperTradingById.paper_trading[0].cumul_return,
            }))
        );
      }
    },
  });
  return {
    paperList: paperList,
    refetch,
    setPaperList,
  };
};

export default usePaperTrading;
