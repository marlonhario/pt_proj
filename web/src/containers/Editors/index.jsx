import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, Button, Card, CardBody, Table } from "reactstrap";
import { StrategyCard } from "./components/StrategyCard";
import { DefaultTabs } from "./components/DefaultTabs";
import { EditorDropdownBtn } from "./components/EditorDropdownBtn";
import IndicatorChartTest from "../../shared/components/Charts/baseline";
import { CardTable, TableTitle, TableTitleText } from "./components/Table";
import TableDnd from "./components/TableDnD";
import CogIcon from "mdi-react/CogIcon";
import axios from "axios";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
// } from "recharts";

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  FlexibleHeightXYPlot,
  FlexibleWidthXYPlot,
  VerticalGridLines,
} from "react-vis";

import "./index.scss";
import { useIndicatorFormStore } from "./components/store";
import { IndicatorProperties } from "./components/IndicatorProperties";
import { BalanceChart } from "./components/BalanceChart";

import { useIndicator } from "./indicatorSettings/useIndicator";

import { StrategyForm } from "./components/StrategyForm";
import { MarketSettings } from "./components/MarketSettings/MarketSettings";

import {
  useSaveStrategyMutation,
  useUpdateStrategyMutation,
  useGetStrategyProfileQuery,
  useGetStrategyProfileLazyQuery,
  useGetMarketDataMutation,
  useInitializeMarketQuery,
} from "../../generated/graphql";

import { getAccessToken, setAccessToken } from "../../accessToken";
import useBaskets from "../../services/graphQL/Baskets/useBaskets";
const testData = require("./indicatorSettings/testChartData.json");
// interface Props {}
// interface ItemList {
//   longEntryList: EntryItem[];
//   // shortEntryList: EntryItem[];
// }

// interface EntryItem {
//   name: string;
//   subName: string;
//   id: string | number;
// }
// interface ComputationType {}
// interface UseIndicatorHook {
//   computation: [];
//   crud: {
//     addIndicator: (data: any) => void;
//     removeIndicator: (data: any) => void;
//     updateIndicator: (data: any) => void;
//     updateProperty: (newProperty: any) => void;
//   };
// }

export const EditorPage = () => {
  const { refetchStrategies } = useBaskets();
  let isIndicatorOpen = useIndicatorFormStore((state) => state.isIndicatorOpen);
  let closeIndicatorForm = useIndicatorFormStore(
    (state) => state.closeIndicatorForm
  );
  // let isIndicatorOpen = useIndicatorFormStore((state) => state.isIndicatorOpen);
  let openIndicatorForm = useIndicatorFormStore(
    (state) => state.openIndicatorForm
  );
  let [selectedIndicatorData, setSelectedIndicatorData] = useState({});
  let [isLongEntryRules, toggleLongEntryRules] = useState(false);

  let [longEntryList, setLongEntryList] = useState([]);
  let [longExitList, setLongExitList] = useState([]);
  let [shortEntryList, setShortEntryList] = useState([]);
  let [shortExitList, setShortExitList] = useState([]);

  let [backmarketToggle, setBackmarketToggle] = useState(false);
  let [computation, crud, computation2] = useIndicator({});
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
      name: "Max drawdown %",
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

  let [strategyProperties, setStrategyProperties] = useState({
    entryLots: 10000,
    stopLoss: "Not used",
    lossPips: 100,
    takeProfit: "Not used",
    profitPips: 100,
  });
  let [isStrategyOpen, toggleStrategyOpen] = useState(false);
  let [stockData, setStockData] = useState([]);
  let [strategyId, setStrategyId] = useState(null);
  let [marketData, setMarketData] = useState({
    symbol: "IBM",
    name: "International Business Machines Corporation",
    exchange: "NYSE",
    id: 0,
    interval: "15min",
    number_data_records: 0,
    first_data: "08/2020/2014, 06:00",
    last_data: "09/04/2020, 01:00",
    spread: 0,
  });

  let [isMarketInfoSettingsOpen, toggleMarketInfoSettingsOpen] = useState(
    false
  );
  let [balanceChartData, setBalanceChartData] = useState([]);

  let [getMarketDataMutation, { data, loading }] = useGetMarketDataMutation();
  let {
    data: initialMarket,
    loading: initialMarketLoading,
  } = useInitializeMarketQuery();

  let fetchStockData = async (symbol, interval = "15min") => {
    // let { data } = await axios.get(
    //   `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${process.env.REACT_APP_ALPHAVANTAGE_APIKEY}`
    // );
    let {
      data: { getMarketData },
    } = await getMarketDataMutation({
      variables: {
        symbol: symbol,
        interval: interval,
        marketId: marketData.id,
      },
    });

    if (getMarketData) {
      setMarketData({
        ...marketData,
        number_data_records: getMarketData.length,
      });
      setStockData(
        getMarketData.reduce((acc, cur) => {
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
        }, [])
      );
    }
  };

  const balanceGraph = [
    {
      date: "10/02/2020",
      originalBalance: 10000,
      backtestBalance: 8400,
      amt: 25000,
    },
    {
      date: "10/04/2020",
      originalBalance: 10000,
      backtestBalance: 12400,
      amt: 25000,
    },
    {
      date: "10/05/2020",
      originalBalance: 10000,
      backtestBalance: 11000,
      amt: 25000,
    },
    {
      date: "10/06/2020",
      originalBalance: 10000,
      backtestBalance: 5120,
      amt: 25000,
    },
    {
      date: "10/07/2020",
      originalBalance: 10000,
      backtestBalance: 13440,
      amt: 25000,
    },
    {
      date: "10/08/2020",
      originalBalance: 10000,
      backtestBalance: 23400,
      amt: 25000,
    },
    {
      date: "10/09/2020",
      originalBalance: 10000,
      backtestBalance: 12400,
      amt: 25000,
    },
  ];

  let onUpdateMarketData = (data) => {
    setMarketData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };
  let fileRef = useRef();

  let strategyToggle = () => {
    toggleStrategyOpen((prevState) => !prevState);
  };

  let marketSettingsToggle = () => {
    toggleMarketInfoSettingsOpen((prevState) => !prevState);
  };

  let addEntry = (value) => {
    let [long, short] = value;
    if (setLongEntryList.length <= 5) {
      setLongEntryList([...longEntryList, long]);
    }
    if (setShortEntryList.length <= 5) {
      setShortEntryList([...shortEntryList, short]);
    }
  };

  let addExit = (value) => {
    let [long, short] = value;
    if (setLongEntryList.length <= 5) {
      setLongExitList([...longExitList, long]);
    }
    if (setShortEntryList.length <= 5) {
      setShortExitList([...shortExitList, short]);
    }
  };

  let updateEntry = (value) => {
    let [long, short] = value;
    setLongEntryList(
      longEntryList.map((item) => {
        if (item.id === long.id) {
          return {
            ...long,
          };
        }

        return item;
      })
    );
    setShortEntryList(
      shortEntryList.map((item) => {
        if (item.id === short.id) {
          return {
            ...short,
          };
        }

        return item;
      })
    );
  };

  let updateExit = (value) => {
    let [long, short] = value;
    setLongExitList(
      longExitList.map((item) => {
        if (item.id === long.id) {
          return {
            ...long,
          };
        }

        return item;
      })
    );
    setShortExitList(
      shortExitList.map((item) => {
        if (item.id === short.id) {
          return {
            ...short,
          };
        }

        return item;
      })
    );
  };

  let deleteItem = (id, isExit) => {
    let longId = `${id}-long`;
    let shortId = `${id}-short`;
    if (isExit) {
      setLongExitList(longExitList.filter((item) => item.id !== longId));
      setShortExitList(shortExitList.filter((item) => item.id !== shortId));
    } else {
      setLongEntryList(longEntryList.filter((item) => item.id !== longId));
      setShortEntryList(shortEntryList.filter((item) => item.id !== shortId));
    }
  };
  let selectIndicator = (data) => {
    openIndicatorForm();
    setSelectedIndicatorData(data);
  };
  let showBackmarketSetting = () => setBackmarketToggle(true);
  let hideBackmarketSetting = () => setBackmarketToggle(false);

  let setRowVisiblity = (newRow) => {
    let newRowVisibility = {
      ...newRow.original,
      visible: !newRow.original.visible,
    };

    setBackmarketData(
      backmarketData.map((row) => {
        if (row.id === newRowVisibility.id) {
          return newRowVisibility;
        }
        return row;
      })
    );
  };

  let setBackmarketTargetSetting = (originalRow, newValue) => {
    let key = Object.keys(newValue)[0];
    let newRow = {
      ...originalRow.original,
      [key]: newValue[key],
    };

    setBackmarketData(
      backmarketData.map((row) => {
        if (originalRow.id === row.id) {
          return newRow;
        }

        return row;
      })
    );
  };

  const downloadFile = async () => {
    const myData = {
      longEntryList: longEntryList,
      shortEntryList: shortEntryList,
      longExitList: longExitList,
      shortExitList: shortExitList,
      backmarketData: backmarketData,
    }; // I am assuming that "this.state.myData"
    // is an object and I wrote it to file as
    // json
    const fileName = "file";
    const json = JSON.stringify(myData);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onFileChange = (e) => {
    let files = fileRef.current.files;
    // Update the state

    if (files.length <= 0) {
      return false;
    }
    var fr = new FileReader();

    fr.onload = function (e) {
      var result = JSON.parse(e.target.result);
      var formatted = JSON.stringify(result, null, 2);

      setLongEntryList(result["longEntryList"]);
      setShortEntryList(result["shortEntryList"]);
      setLongExitList(result["longExitList"]);
      setShortExitList(result["shortExitList"]);
    };

    fr.readAsText(files.item(0));
  };

  const updateStrategy = (data) => {
    setStrategyProperties((prevState) => ({
      ...prevState,
      ...data,
    }));

    strategyToggle();
  };

  let [saveStrategyMutation] = useSaveStrategyMutation();
  let [updateStrategyMutation] = useUpdateStrategyMutation();
  let [
    getStrategyProfileQuery,
    { data: strategyProfile, loading: strategyProfileLoading },
  ] = useGetStrategyProfileLazyQuery();

  const addStrategyToBasketFun = async () => {
    if (!strategyId) {
      let { data } = await saveStrategyMutation({
        variables: {
          token: getAccessToken(),
          options: {
            editor_json: {
              data: JSON.parse(localStorage.getItem("data")),
              marketData: JSON.parse(localStorage.getItem("marketData")),
              strategyProperties: JSON.parse(
                localStorage.getItem("strategyProperties")
              ),
              backmarketData: backmarketData,
            },
          },
        },
      });

      if (data) {
        setStrategyId(data["saveStrategy"]["id"]);
      }
      refetchStrategies();
    } else {
      let updateStrategy = await updateStrategyMutation({
        variables: {
          token: getAccessToken(),
          options: {
            id: strategyId,
            editor_json: {
              data: JSON.parse(localStorage.getItem("data")),
              marketData: JSON.parse(localStorage.getItem("marketData")),
              strategyProperties: JSON.parse(
                localStorage.getItem("strategyProperties")
              ),
              backmarketData: backmarketData,
            },
          },
        },
      });

      refetchStrategies();
    }
  };

  const newStrategy = () => {
    const data = localStorage.getItem("data");
    const parseData = JSON.parse(data);
    // clear the Long & Short Entry/Exit
    parseData.longEntryList = [];
    parseData.longExitList = [];
    parseData.shortEntryList = [];
    parseData.shortExitList = [];

    //strategyProperties/
    //marketData
    //strategyId
    //stockData
    localStorage.setItem("strategyProperties", null);
    localStorage.setItem("marketData", null);
    localStorage.setItem("strategyId", null);
    localStorage.setItem("stockData", null);
    localStorage.removeItem("marketList");
    localStorage.setItem("data", JSON.stringify(parseData));

    setStrategyId(null);
    setLongEntryList([]);
    setLongExitList([]);
    setShortEntryList([]);
    setShortExitList([]);
    setMarketData([]);
  };

  useEffect(() => {
    if (initialMarket) {
      setMarketData({
        ...marketData,
        ...initialMarket["initializeMarket"],
      });
    }
  }, [initialMarket]);
  useEffect(() => {
    if (!localStorage.getItem("stockData")) {
      if (marketData?.id) {
        fetchStockData(marketData.symbol, marketData.interval);
      }
    }
  }, []);
  useEffect(() => {
    if (marketData) {
      if (marketData.id) {
        fetchStockData(marketData.symbol, marketData.interval);
      }
    }
  }, [marketData.symbol, marketData.interval]);
  useEffect(() => {
    let strId = localStorage.getItem("strategyId")
      ? localStorage.getItem("strategyId")
      : null;
    if (strId == "null") {
      strId = "";
    }

    if (localStorage.getItem("data")) {
      let {
        longEntryList,
        longExitList,
        shortEntryList,
        shortExitList,
      } = JSON.parse(localStorage.getItem("data"));

      if (localStorage.getItem("strategyId")) {
        getStrategyProfileQuery({
          variables: {
            id: strId,
            token: getAccessToken(),
          },
        });
      }

      setLongExitList(longExitList);
      setLongEntryList(longEntryList);
      setShortEntryList(shortEntryList);
      setShortExitList(shortExitList);
    } else {
      if (getAccessToken()) {
        if (localStorage.getItem("strategyId")) {
        }
        // getStrategyProfileQuery({
        //   variables: {
        //     id: Number(localStorage.getItem("strategyId")),
        //     token: getAccessToken(),
        //   },
        // });
      }
    }
    if (localStorage.getItem("strategyId")) {
      getStrategyProfileQuery({
        variables: {
          id: strId,
          token: getAccessToken(),
        },
      });
    }

    let stratId = localStorage.getItem("strategyId")
      ? localStorage.getItem("strategyId")
      : null;
    if (stratId == "null") {
      stratId = null;
    }

    setStrategyId(stratId);
  }, []);

  useEffect(() => {
    const myData = {
      longEntryList: longEntryList,
      shortEntryList: shortEntryList,
      longExitList: longExitList,
      shortExitList: shortExitList,
      backmarketData: backmarketData,
    };

    localStorage.setItem("data", JSON.stringify(myData));
  }, [longExitList, longEntryList, shortEntryList, shortExitList]);

  useEffect(() => {
    localStorage.setItem(
      "strategyProperties",
      JSON.stringify(strategyProperties)
    );
  }, [strategyProperties]);

  useEffect(() => {
    localStorage.setItem("marketData", JSON.stringify(marketData));
  }, [marketData]);

  useEffect(() => {
    if (Object.keys(strategyProperties).length === 0) {
      let strategyProperty = JSON.parse(
        localStorage.getItem("strategyProperties")
      );
      if (Object.keys(strategyProperty).length !== 0) {
        setStrategyProperties(strategyProperty);
      } else {
        setStrategyProperties({
          entryLots: 10000,
          stopLoss: "notUsed",
          lossPips: 100,
          takeProfit: "Not used",
          profitPips: 100,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(marketData).length === 0) {
      let storedMarketData = JSON.parse(localStorage.getItem("marketData"));

      if (storedMarketData) {
        setMarketData(storedMarketData);
      }
    }
  }, []);

  useEffect(() => {
    if (
      longExitList.length > 0 ||
      longEntryList.length > 0 ||
      shortExitList.length > 0 ||
      shortEntryList.length > 0
    ) {
      if (stockData.length > 0) {
        crud.addIndicator(
          {
            longEntryList,
            shortEntryList,
            longExitList,
            shortExitList,
          },
          stockData,
          strategyProperties
        );
      } else {
        crud.addIndicator(
          {
            longEntryList,
            shortEntryList,
            longExitList,
            shortExitList,
          },
          undefined,
          strategyProperties
        );
      }
    } else {
      if (stockData.length > 0) {
        crud.addIndicator(
          {
            longEntryList,
            shortEntryList,
            longExitList,
            shortExitList,
          },
          stockData,
          strategyProperties
        );
      } else {
        crud.addIndicator(
          {
            longEntryList,
            shortEntryList,
            longExitList,
            shortExitList,
          },
          undefined,
          strategyProperties
        );
      }
      // crud.addIndicator({
      //   longEntryList,
      //   shortEntryList,
      //   longExitList,
      //   shortExitList,
      // });
    }
  }, [
    longEntryList,
    shortEntryList,
    longExitList,
    shortExitList,
    stockData,
    longEntryList.length,
    shortEntryList.length,
    longExitList.length,
    shortExitList.length,
  ]);

  useEffect(() => {
    if (strategyProfile && !strategyProfileLoading) {
      if (strategyProfile.getStrategyProfile.editor_json) {
        let {
          editor_json: {
            data: {
              longEntryList,
              shortEntryList,
              longExitList,
              shortExitList,
            },
            marketData,
            strategyProperties,
            backmarketData,
          },
        } = strategyProfile.getStrategyProfile;
        setLongExitList(longExitList);
        setLongEntryList(longEntryList);
        setShortEntryList(shortEntryList);
        setShortExitList(shortExitList);
        setMarketData(marketData);
        setStrategyProperties(strategyProperties);
        if (backmarketData) {
          setBackmarketData(backmarketData);
        }
      }
    }
  }, [strategyProfile]);

  useEffect(() => {
    //console.log("computation", computation);
    if (computation2) {
      // if (computation2.maxDrawDown) {
      let backTest = computation2;
      let newBackmarketData = backmarketData.map((item) => {
        return {
          ...item,
          value: backTest[item.accessor],
        };
      });

      setBackmarketData(newBackmarketData);
      // }
    } else {
      setBackmarketData({
        drawdown: 0,
        maxDrawdown: 0,
        netProfit: 0,
        profitPerDay: 0,
        tradeCount: 0,
      });
    }
  }, [computation2]);

  useEffect(() => {
    if (localStorage.getItem("strategyId")) {
    }
    if (strategyId) {
      localStorage.setItem("strategyId", strategyId);
    }
  }, [strategyId]);

  useEffect(() => {
    if (computation2) {
      setBalanceChartData(computation2.balanceChart);
    } else {
      setBalanceChartData([]);
    }
  }, [computation2]);

  if (initialMarketLoading) {
    return <>Loading</>;
  }

  return (
    <Container className="dashboard">
      <Row>
        <Col md={2}>
          <h3 className="page-title">Editor</h3>
        </Col>
        <Col md={2}>
          <EditorDropdownBtn
            downloadFile={downloadFile}
            onFileChange={onFileChange}
            fileRef={fileRef}
          />
        </Col>
        <Col>
          <label htmlFor="file-upload" className="custom-file-upload">
            <i className="fa fa-cloud-upload"></i> Upload Strategy
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={onFileChange}
            ref={fileRef}
          />
        </Col>
        <Col>
          <Button
            onClick={() => {
              downloadFile();
            }}
          >
            Download Strategy
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              addStrategyToBasketFun();
            }}
          >
            {strategyId
              ? "Update strategy in basket"
              : "Add strategy to basket"}
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              // addStrategyToBasketFun();\
              newStrategy();
            }}
          >
            New Strategy
          </Button>
        </Col>
      </Row>
      <input type="file" onChange={onFileChange} />
      <Row>
        <Col lg={4}>
          {(() => {
            if (isIndicatorOpen) {
              return (
                <IndicatorProperties
                  isLongEntryRules={isLongEntryRules}
                  addLongEntry={addEntry}
                  addLongExit={addExit}
                  updateEntry={updateEntry}
                  updateExit={updateExit}
                  selectedIndicatorData={selectedIndicatorData}
                />
              );
            } else {
              if (isStrategyOpen) {
                return (
                  <StrategyForm
                    data={strategyProperties}
                    updateStrategy={updateStrategy}
                    strategyToggle={strategyToggle}
                    isStrategyOpen={isStrategyOpen}
                  />
                );
              } else {
                if (isMarketInfoSettingsOpen) {
                  return (
                    <>
                      <Row>
                        <MarketSettings
                          data={marketData}
                          fetchStockData={fetchStockData}
                          onUpdateMarketData={onUpdateMarketData}
                        >
                          {/* <TableTitle> */}
                          <TableTitleText>
                            Market Info Settings
                            <CogIcon
                              className="cog-icon"
                              onClick={marketSettingsToggle}
                            />
                          </TableTitleText>
                          {/* </TableTitle> */}
                          {/* <MarketSettings /> */}
                        </MarketSettings>
                      </Row>
                      <Row>
                        <div style={{ width: "100%", height: 250 }}>
                          <IndicatorChartTest />
                        </div>
                      </Row>
                    </>
                  );
                }
                return (
                  <>
                    <Row>
                      <Col sm={12}>
                        <Card>
                          <CardBody>
                            <Table striped responsive>
                              {/* <TableTitle> */}
                              <thead>
                                <TableTitleText>
                                  Market Info
                                  <CogIcon
                                    className="cog-icon"
                                    onClick={marketSettingsToggle}
                                  />
                                </TableTitleText>
                              </thead>

                              {/* </TableTitle> */}
                              <tbody>
                                <tr>
                                  <td>Market</td>
                                  <td>
                                    {`${marketData.symbol} - ${marketData.name} - ${marketData.exchange}`}
                                    ; {marketData.interval}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Count of bars</td>
                                  <td>{marketData.number_data_records}</td>
                                </tr>
                                <tr>
                                  <td>Data start</td>
                                  <td>{marketData.first_data}</td>
                                </tr>
                                <tr>
                                  <td>Data end</td>
                                  <td>{marketData.last_data}</td>
                                </tr>
                                <tr>
                                  <td>Spread</td>
                                  <td>{marketData.spread}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <div style={{ width: "100%", height: 250 }}>
                        {/* <IndicatorChartTest
                          backtestData={computation}
                          strategies={[
                            ...longEntryList,
                            ...shortEntryList,
                            ...longExitList,
                            ...shortExitList,
                          ]}
                        /> */}
                        {/* {computation.graph ? (
                          <IndicatorChartTest
                            backtestData={computation}
                            strategies={[
                              ...longEntryList,
                              ...shortEntryList,
                              ...longExitList,
                              ...shortExitList,
                            ]}
                          />
                        ) : (
                          <IndicatorChartTest />
                        )} */}
                      </div>
                    </Row>
                  </>
                );
              }
            }
          })()}
        </Col>
        <Col lg={3}>
          <h5 className="bold-text" style={{ margin: "1.25rem" }}>
            STRATEGY
          </h5>
          {(() => {
            if (Object.keys(strategyProperties).length !== 0) {
              return (
                <StrategyCard
                  strategyToggle={strategyToggle}
                  strategyProperties={strategyProperties}
                  isStrategyOpen={isStrategyOpen}
                />
              );
            }
          })()}
          <DefaultTabs
            longEntryList={longEntryList}
            shortEntryList={shortEntryList}
            toggleLongEntryRules={toggleLongEntryRules}
            deleteItem={deleteItem}
            selectIndicator={selectIndicator}
          />
          <DefaultTabs
            isExit={true}
            longEntryList={longExitList}
            shortEntryList={shortExitList}
            toggleLongEntryRules={toggleLongEntryRules}
            deleteItem={deleteItem}
            selectIndicator={selectIndicator}
          />
        </Col>
        <Col lg={5}>
          <Row>
            {backmarketToggle ? (
              <TableDnd
                data={backmarketData}
                setData={setBackmarketData}
                setRowVisiblity={setRowVisiblity}
                setBackmarketTargetSetting={setBackmarketTargetSetting}
              >
                {/* <TableTitle> */}
                <TableTitleText>
                  Backtest Result{" "}
                  <CogIcon
                    className="cog-icon"
                    onClick={hideBackmarketSetting}
                  />
                </TableTitleText>
                {/* </TableTitle> */}
              </TableDnd>
            ) : (
              <CardTable data={backmarketData} key={Math.round()}>
                {/* <TableTitle> */}
                <table>
                  <tbody>
                    <TableTitleText>
                      Backtest Result{" "}
                      <CogIcon
                        className="cog-icon"
                        onClick={showBackmarketSetting}
                      />
                    </TableTitleText>
                  </tbody>
                </table>

                {/* </TableTitle> */}
              </CardTable>
            )}
          </Row>
          <Row>
            <Col className="balanceChart" md={12} lg={12} xl={12}>
              <Card>
                <CardBody>
                  <div className="card__title">
                    <h5 className="bold-text">Balance chart</h5>
                  </div>
                  <BalanceChart
                    id={computation2?.timestamp}
                    balanceChartData={balanceChartData}
                    key={computation2?.timestamp}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
