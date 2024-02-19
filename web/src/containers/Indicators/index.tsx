import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import DataTable from "react-data-table-component";
import PTBackTest from "../../trade-library/PTBackTest";
const testData = require("./stocks.json");
const columns = [
  {
    name: "ID",
    selector: "id",
    sortable: true,
  },
  {
    name: "Time",
    selector: "date",
    sortable: true,
  },
  {
    name: "Type",
    selector: "type",
    sortable: false,
  },
  {
    name: "Position",
    selector: "position",
    sortable: false,
  },
  {
    name: "Amount",
    selector: "amount",
    sortable: true,
  },
  {
    name: "Price",
    selector: "price",
    sortable: true,
  },
  {
    name: "Stop Loss",
    selector: "stopLoss",
    sortable: false,
  },
  {
    name: "Take Profit",
    selector: "takeProfit",
    sortable: false,
  },
  {
    name: "Profit",
    selector: "profit",
    sortable: true,
  },
  {
    name: "Balance",
    selector: "balance",
    sortable: true,
  },
];

const Indicators: React.FC = () => {
  /************************************************************
   * STEP 1: Initialize Back Test class with needed settings
   *
   ************************************************************/
  var BackTestData = new PTBackTest({
    stockData: testData,
    technicalIndicators: {
      entry: [
        {
          name: "awesome_oscillator",
          options: {
            signal: "above_level_line",
            levelLine: 0,
          },
        },
      ],
      exit: [
        {
          name: "macd",
          options: {
            signal: "below_zero_line",
            applyTo: "median",
            fastPeriod: 5, //fastEma
            slowPeriod: 34, //slowEma
            signalPeriod: 5, //MACD SMA
            levelLine: 0, //default
          },
        },
      ],
    },
    stopLoss: { type: "fixed", amount: 0 },
    takeProfit: 0,
    balance: 10000,
    commission: 0.23,
    startingBar: 100,
    share: 1000000,
  }).backtest();

  // console.log(BackTestData);

  const displayResult = (data: any = []) => {
    return (
      <DataTable
        title="Back Testing with Indicators"
        data={data}
        columns={columns}
        pagination={true}
        paginationTotalRows={data.length}
      />
    );
  };
  let result = displayResult(BackTestData["trade"]);

  return (
    <Col>
      <Row>
        <Col md={12} lg={12}>
          {result}
          <br />
          <br />
        </Col>
      </Row>
    </Col>
  );
};

export default Indicators;
