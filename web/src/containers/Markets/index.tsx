import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Input,
  Label,
  Row,
  FormGroup,
  Card,
  CardBody,
} from "reactstrap";
import MarketCard from "./components/MarketsCard";
import {
  useGetMarketDataMutation,
  useMarketsSearchMutation,
  useAlphavantageSearchLazyQuery,
  useGetAlphavantageMarketDataMutation,
  useAddMarketMutation,
} from "../../generated/graphql";
import { SelectColumnFilter } from "../../shared/components/Markets/SearchFilter";
import { toast } from "react-toastify";

import BaseTable from "../../shared/components/table/BaseReactTable";
import DataReactTable from "./components/DataReactTable.jsx";

import { SearchInput } from "./components/SearchInput";
import { SelectFilter } from "./components/SelectFilter";
// import { useMarketsSearchQuery, useAlphavantageSearchQuery, useGetAlphavantageMarketDataMutation, GetAlphavantageMarketDataMutation } from '../../generated/graphql';
import { Button } from "reactstrap";

interface Props {}

interface MarketState {
  id?: number;
  name?: string;
  symbol?: string;
  equity?: string;
  timezone?: string;
  interval?: string;
  region?: string;
  exchange?: string;
  currency?: string;
  period?: string;
  first_data?: Date;
  last_data?: Date;
  number_data_records?: number;
  data_last_downloaded?: Date;
}

export const Loader: React.FC = (): JSX.Element => (
  <div className="load__icon-wrap">
    <svg className="load__icon">
      <path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
    </svg>
  </div>
);
const options = {
  autoClose: 6000,
  hideProgressBar: false,
  position: toast.POSITION.TOP_RIGHT,
  pauseOnHover: true,
};

export const MarketPage: React.FC<Props> = () => {
  const controller = new window.AbortController();
  const [marketsSearch] = useMarketsSearchMutation({
    onCompleted: (data) => {},
    onError: (err) => {
      toast.error("Error! no markets found!", options);
    },
  });

  let [marketList, setMarketList] = useState([]);
  let [alphavantageSearchList, setAlphavantageSearchList] = useState([]);

  const [
    marketSearch,
    {
      data: marketSearchData,
      // loading: marketSearchLoading
    },
  ] = useMarketsSearchMutation({
    onCompleted: (data) => {
      setMarketList(data.marketsSearch);
    },
    onError: (err) => {
      toast.error("Error! no markets found!", options);
    },
  });

  const [
    alphavantageSearch,
    {
      data: alphavantageData,
      // loading: alphavantageLoading,
      // error: alphavantageError,
    },
  ] = useAlphavantageSearchLazyQuery({
    onCompleted: (data) => {
      if (data.alphavantageSearch.length > 0) {
        toast.success("Sucess!", options);
        setAlphavantageSearchList(
          data.alphavantageSearch.map((item) => {
            let doesExist = marketList.some(
              (market) => market.symbol === item.symbol
            );

            if (doesExist) {
              return {
                ...item,
                disabled: true,
              };
            } else {
              return { ...item, disabled: false };
            }
          })
        );
      } else {
        toast.warn("Error! no Alphavantage symbol found!", options);
      }
    },
    onError: (err) => {
      toast.error("Error! no Alphavantage symbol found!", options);
    },
  });

  let [marketData, setMarketData] = useState<MarketState[] | []>([]);
  const [getMarketData] = useGetMarketDataMutation({
    onCompleted: (data) => {
      if (data.getMarketData.length > 0) {
        toast.success("Success!", options);
      } else {
        toast.warn("No market data found!", options);
      }
    },
    onError: (err) => {
      toast.error("Error! no market data found!", options);
    },
  });

  const [getAlphavantageMarketData] = useGetAlphavantageMarketDataMutation({
    onCompleted: (data) => {},
    onError: (err) => {
      toast.error("Error! no Alphavantage market data found!", options);
    },
  });

  const [addMarket] = useAddMarketMutation({
    onCompleted: (data) => {
      let response = data.addMarket[0];
      if (!response) {
        toast.warn(
          "Symbol isn't found, please double check the Alphavantage API",
          options
        );
      }
      //@ts-ignore
      if (response.newAdded) {
        toast.success("Successfully added new market!", options);
        setMarketList(
          [response, ...marketList].slice().sort((a, b) => {
            if (a.name.toUpperCase() < b.name.toUpperCase()) {
              return -1;
            }
            if (a.name.toUpperCase() > b.name.toUpperCase()) {
              return 1;
            }
            return 0;
          })
        );

        onFetchAlphavantageData({
          interval: "15min",
          symbol: response.symbol,
        });
      } else {
        toast.warn("Symbol already exist in the database", options);
      }
    },
  });
  let [selectedRow, setSelectedRow] = useState({
    marketId: null,
    symbol: null,
    interval: "15min",
  });

  const [selectedAlphavantageRow, selectAlphavantageRow] = useState({
    symbol: null,
    interval: "15min",
  });
  const [alphavantageMarketData, setAlphavantageMarketData] = useState<
    MarketState[] | []
  >([]);
  let onFetchMarketData = async (options) => {
    let { data } = await getMarketData({
      variables: {
        ...options,
      },
    });
    setSelectedRow(options);
    setMarketData(data.getMarketData);
  };

  let onSearchMarketData = async (text) => {
    try {
      await marketSearch({
        variables: {
          symbol: text,
        },
      });
    } catch (e) {}
  };
  useEffect(() => {
    async function initializeMarketSearch() {
      try {
        await marketSearch({
          variables: {
            symbol: "",
          },
        });
      } catch (e) {}
    }

    initializeMarketSearch();
  }, []);

  let onFetchAlphavantageData = async (options) => {
    let { data } = await getAlphavantageMarketData({
      variables: {
        ...options,
      },
    });

    selectAlphavantageRow(options);
    if (data.getAlphavantageMarketData.alphavantage_market_data === null) {
      toast.warn("No Market data found", options);
      setAlphavantageMarketData([]);
    } else {
      toast.success("Found market data", options);
      setAlphavantageMarketData(
        data.getAlphavantageMarketData?.alphavantage_market_data
      );
    }
  };

  let onSearchAlphavantageData = async (text) => {
    alphavantageSearch({
      variables: {
        symbol: text,
      },
    });
  };
  let addNewMarket = async (symbol) => {
    let { data } = await addMarket({
      variables: {
        symbol: symbol,
      },
    });
  };

  React.useEffect(() => {
    if (alphavantageSearchList.length > 0) {
      setAlphavantageSearchList(
        alphavantageSearchList.map((item) => {
          let doesExist = marketList.some(
            (market) => market.symbol === item.symbol
          );

          if (doesExist) {
            return {
              ...item,
              disabled: true,
            };
          } else {
            return { ...item, disabled: false };
          }
        })
      );
    }
  }, [marketList]);

  const alphavantageColumns = [
    {
      Header: "Name",
      accessor: "name",
      width: "10%",
      Cell: (props) => {
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              let value = props.row.original;
              onFetchAlphavantageData({
                symbol: value.symbol,
                interval: "15min",
              });
            }}
          >
            {props.value}
          </div>
        );
      },
    },
    {
      Header: "Symbol",
      accessor: "symbol",
      Cell: (props) => {
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              let value = props.row.original;
              onFetchAlphavantageData({
                symbol: value.symbol,
                interval: "15min",
              });
            }}
          >
            {props.value}
          </div>
        );
      },
    },
    {
      Header: "Action",
      accessor: "action",
      filterable: false,
      Cell: ({ row: { original } }) => {
        console.log({ original });
        return (
          <Button
            color="secondary"
            size="sm"
            onClick={(e) => {
              addNewMarket(original.symbol);
            }}
            disabled={original.disabled}
          >
            {original.disabled ? "Market already in database" : "Add"}
          </Button>
        );
      },
    },
  ];

  const columns = [
    {
      Header: "Name",
      accessor: "name",
      width: "10%",
      Cell: (props) => {
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              let value = props.row.original;
              onFetchMarketData({
                symbol: value.symbol,
                interval: "15min",
                marketId: value.id,
              });
            }}
          >
            {props.value}
          </div>
        );
      },
    },
    {
      Header: "Symbol",
      accessor: "symbol",
      filter: "equals",
      Cell: (props) => {
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              let value = props.row.original;
              onFetchMarketData({
                symbol: value.symbol,
                interval: "15min",
                marketId: value.id,
              });
            }}
          >
            {props.value}
          </div>
        );
      },
    },
  ];

  const columns2 = [
    {
      Header: "Symbol",
      accessor: "symbol",
      width: "10%",
    },
    {
      Header: "Open",
      accessor: "open",
      width: "10%",
    },
    {
      Header: "High",
      accessor: "high",
      width: "10%",
    },
    {
      Header: "Low",
      accessor: "low",
      width: "10%",
    },
    {
      Header: "Close",
      accessor: "close",
      width: "10%",
    },
    {
      Header: "Volume",
      accessor: "volume",
      width: "10%",
    },
    {
      Header: "Last Update",
      accessor: "last_update",
      width: "10%",
    },
  ];
  return (
    <Container className="dashboard">
      <Row>
        <Col md={2}>
          <h3 className="page-title">Markets</h3>
        </Col>
      </Row>
      <Row>
        <DataReactTable
          title={"Search table by api results"}
          filterPlaceholder={"Search by symbol or name"}
          withSearch={false}
          reactTableData={{
            tableHeaderData: alphavantageColumns,
            tableRowsData:
              alphavantageSearchList?.map((item) => ({
                name: item.name,
                ...item,
              })) || [],
          }}
        >
          <SearchInput
            search={onSearchAlphavantageData}
            placeholder={"Search Alphavantage API"}
          />
        </DataReactTable>
      </Row>
      {alphavantageMarketData.length > 0 && (
        <DataReactTable
          withSearch={false}
          title={"Alphavantage Market Data List"}
          reactTableData={{
            tableHeaderData: columns2,
            tableRowsData: alphavantageMarketData,
          }}
        >
          <SelectFilter
            search={onFetchAlphavantageData}
            selectedRow={selectedAlphavantageRow}
          />
        </DataReactTable>
      )}
      <Row>
        {(() => {
          if (!marketSearchData) {
            return (
              <DataReactTable
                title={"Market List"}
                reactTableData={{
                  tableHeaderData: columns,
                  tableRowsData: [],
                }}
              />
            );
          } else {
            return (
              <DataReactTable
                title={"Market List"}
                reactTableData={{
                  tableHeaderData: columns,
                  tableRowsData: marketList,
                }}
              />
            );
          }
        })()}
      </Row>
      {marketData.length > 0 && (
        <DataReactTable
          withSearch={false}
          title={"Market Data List"}
          reactTableData={{
            tableHeaderData: columns2,
            tableRowsData: marketData,
          }}
        >
          <SelectFilter search={onFetchMarketData} selectedRow={selectedRow} />
        </DataReactTable>
      )}
    </Container>
  );
};
