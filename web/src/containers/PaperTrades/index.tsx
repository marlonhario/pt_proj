import React from "react";
import BasicTable from "../../shared/components/table/BaseReactTable";
import usePaperTradesQuery from "./hooks/usePaperTradingQuery";
function PaperTrades() {
  const tableConfig = {
    isEditable: false,
    isSortable: false,
    isResizable: false,
    withPagination: true,
    withSearchEngine: false,
    manualPageSize: [10, 20, 30, 40],
    placeholder: "Search...",
  };

  let { paperTradeList } = usePaperTradesQuery();

  let columnNames = [
    "id",
    "net_profit",
    "count_of_trades",
    "max_drawdown_number",
    "months_of_profit",
    "profit_factor",
  ];
  let columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Strategy ID",
      accessor: "strategy_id",
    },
    {
      Header: "Market ID",
      accessor: "market_id",
    },
    {
      Header: "Symbol",
      accessor: "symbol",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Trade Amount",
      accessor: "trade_amount",
    },
    {
      Header: "Stop Loss",
      accessor: "stop_loss",
    },
    {
      Header: "Take Profit",
      accessor: "take_profit",
    },
    {
      Header: "Profit",
      accessor: "profit",
    },
    {
      Header: "Balance",
      accessor: "balance",
    },
    {
      Header: "Datetime",
      accessor: "date_time",
    },
    {
      Header: "Open",
      accessor: "open",
    },
    {
      Header: "High",
      accessor: "high",
    },
    {
      Header: "Low",
      accessor: "low",
    },
    {
      Header: "Close",
      accessor: "close",
    },
    {
      Header: "Volume",
      accessor: "volume",
    },
    {
      Header: "Trade Type",
      accessor: "trade_type",
    },
  ];
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <h3 className="page-title">Trades</h3>
            </div>
          </div>
          <div className="row react-table__wrapper">
            <div className="col-md-12 col-lg-12">
              <BasicTable
                columns={columns}
                data={paperTradeList || []}
                defaultColumn={[]}
                tableConfig={tableConfig}
                updateData={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PaperTrades };
