import React from "react";
import { getAccessToken } from "../../../accessToken";
import { useGetPaperTradesQuery } from "../../../generated/graphql";

const usePaperTrades = () => {
  const token = getAccessToken();
  const [paperTradeList, setPaperTradeList] = React.useState<any>([]);
  const { data, loading, refetch } = useGetPaperTradesQuery({
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setPaperTradeList(data.getPaperTrades);
    },
  });
  return {
    paperTradeList: paperTradeList,
    refetch,
    setPaperTradeList,
  };
};

export default usePaperTrades;
