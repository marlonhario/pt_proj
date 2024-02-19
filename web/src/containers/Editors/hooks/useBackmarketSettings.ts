import React, { useState } from "react";

const useBackmarketSettings = ({ initialState }) => {
  let [backmarketData, setBackmarketData] = useState([
    {
      id: 1,
      name: "Net Profit",
      value: `0`,
      visible: true,
      index: 0,
      targetValue: 5000,
      setting: "GREATER",
      accessor: "netProfit",
    },
    {
      id: 2,
      name: "Profit per day",
      value: "0",
      visible: true,
      index: 1,
      targetValue: 20,
      setting: "GREATER",
      accessor: "profitPerDay",
    },
    {
      id: 3,
      name: "Max drawdown",
      value: "0",
      visible: true,
      index: 2,
      targetValue: 500,
      setting: "LESSER",
      accessor: "maxDrawDown",
    },
    {
      id: 4,
      name: "Return / drawdown",
      value: "0",
      visible: true,
      index: 3,
      targetValue: 2,
      setting: "GREATER",
      accessor: "drawdown",
    },
    {
      id: 5,
      name: "Count of trades",
      value: "0",
      visible: true,
      index: 4,
      targetValue: 4000,
      setting: "LESSER",
      accessor: "tradeCount",
    },
  ]);

  let [backmarketToggle, setBackmarketToggle] = useState(false);

  let showBackmarketSetting = () => setBackmarketToggle(true);
  let hideBackmarketSetting = () => setBackmarketToggle(false);

  return {
    backmarketData,
    setBackmarketData,
    backmarketToggle,
    showBackmarketSetting,
    hideBackmarketSetting,
  };
};
