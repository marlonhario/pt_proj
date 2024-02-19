import React, { Component, useEffect, useState } from "react";
import Select from "react-select";
// import AsyncSelect from "react-select/async";
import { colourOptions, marketData } from "./data";

import {
  useMarketsQuery,
  useGetMarketDataMutation,
  useMarketsSearchMutation,
  useGetMarketListQuery,
} from "../../../../../generated/graphql";
import { Row, Col } from "reactstrap";

const filterColors = (inputValue: string) => {
  return marketData.filter((i) =>
    i.name.toLowerCase().includes(inputValue.toLowerCase())
  );
};
const customFilter = (option, searchText) => {
  if (
    option.data.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
    option.data.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
    option.data.gender.toLowerCase().includes(searchText.toLowerCase())
  ) {
    return true;
  } else {
    return false;
  }
};
const customFilterOption = (option, rawInput) => {
  const words = rawInput.split(" ");
  return words.reduce(
    (acc, cur) => acc && option.name.toLowerCase().includes(cur.toLowerCase()),
    true
  );
};

const promiseOptions = (inputValue) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

let refetchingCount = 0;

export default function WithPromises({ marketValue, onUpdateMarket }) {
  const { data: DataMarketList, loading: LoadingMarketList } = useGetMarketListQuery()
  let [storageMarketList, setStorageMarketList] = useState([]);
  const [
    getMarketSearch,
    { data: marketList, loading: isLoading, error: err },
  ] = useMarketsSearchMutation({
    onCompleted: (data) => {
      console.log("data", data);
      localStorage.setItem("marketList", JSON.stringify(data.marketsSearch));
      // setStorageMarketList(data.marketsSearch);
      refetchingCount = 0;
    },
    onError: (err) => {
      let marketList = JSON.parse(localStorage.getItem("marketList"));
      if (marketList) {
        // setStorageMarketList(marketList);
      }
      refetchingCount += 1;
    },
  });

  // const { data, loading, error } = useMarketsSearchQuery({
  //   variables: {
  //     symbol: "",
  //     haveData: true,
  //   },
  //   onCompleted: (data) => {
  //     console.log("data", data);
  //     // let marketDataList = JSON.parse(localStorage.getItem("marketDataList"));
  //     setStorageMarketList(data.marketsSearch);
  //   },
  //   onError: (err) => {
  //     let marketDataList = JSON.parse(localStorage.getItem("marketList"));
  //     setStorageMarketList(marketDataList);
  //   },
  // });

  console.log("marketValue", marketValue);
  const fetchArtists = async (input: string = "", cb: any) => {
    // if (input && input.trim().length < 1) {
    //   // return [];

    //   return data.marketsSearch.map((row) => ({
    //     name: row.name,
    //     symbol: row.symbol,
    //     exchange: row.currency,
    //   }));
    // }

    // getMarketSearch({
    //   variables: {
    //     symbol: input,
    //   },
    // });

    // console.log(data);

    // if (!loading && data) {
    //   return data.marketsSearch.map((row) => ({
    //     name: row.name,
    //     symbol: row.symbol,
    //     exchange: row.currency,
    //     number_data_records: row.number_data_records,
    //     first_data: row.first_data,
    //     last_data: row.last_data,
    //   }));
    // }
    // if (res.data && res.data.match_artist) {
    //   return res.data.match_artist.map(
    //     (a: { name: string; imageUrl: string }) => ({
    //       label: a.name,
    //       value: a.imageUrl
    //     })
    //   );
    // }

    return [];
  };

  useEffect(() => {
    if (!localStorage.getItem("marketList")) {
      // getMarketSearch({
      //   variables: {
      //     symbol: "",
      //   },
      // });
      let marketList = JSON.parse(localStorage.getItem("marketList"));
      if (marketList) {
        setStorageMarketList(marketList);
      }
    } else {
      getMarketSearch({
        variables: {
          symbol: "",
        },
      });
    }
  }, []);

  useEffect(() => {
    if (err) {
      if (refetchingCount < 5) {
        getMarketSearch({
          variables: {
            symbol: "",
          },
        });
      }
    }
  }, [err]);

  useEffect(() => {
    if (DataMarketList && !LoadingMarketList) {
      const marketList = DataMarketList.getMarketList.market ? DataMarketList.getMarketList.market : []
      setStorageMarketList(marketList)
    }
  }, [DataMarketList])

  if (isLoading) {
    return (
      <>
        <Row>
          <Col lg={8}>
            <Select
              // cacheOptions
              // defaultOptions
              options={storageMarketList.map((row) => ({
                name: row.name,
                symbol: row.symbol,
                exchange: row.currency,
              }))}
              /* Remove to default Select... */
              // value={{
              //   name: marketValue["name"],
              //   symbol: marketValue["symbol"],
              //   exchange: marketValue["currency"],
              // }}
              onChange={onUpdateMarket}
              getOptionLabel={(option) => {
                return `${option.symbol} - ${option.name} - ${option.exchange}`;
              }}
              getOptionValue={(option) => {
                return `${option.symbol}`;
              }}
            />
          </Col>
          <Col lg={4}>
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => {
                getMarketSearch({
                  variables: {
                    symbol: "",
                  },
                });
              }}
            >
              <span className="lnr lnr-cloud-sync"></span>
            </button>
          </Col>
        </Row>
      </>
    );
  }

  if (err) {
    return (
      <>
        <Row>
          <Col lg={8}>
            <Select
              // cacheOptions
              // defaultOptions
              options={storageMarketList.map((row) => ({
                name: row.name,
                symbol: row.symbol,
                exchange: row.currency,
              }))}
              /* Remove to default Select... */
              // value={{
              //   name: marketValue["name"],
              //   symbol: marketValue["symbol"],
              //   exchange: marketValue["currency"],
              // }}
              onChange={onUpdateMarket}
              getOptionLabel={(option) => {
                return `${option.symbol} - ${option.name} - ${option.exchange}`;
              }}
              getOptionValue={(option) => {
                return `${option.symbol}`;
              }}
            />
          </Col>
          <Col lg={4}>
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => {
                getMarketSearch({
                  variables: {
                    symbol: "",
                  },
                });
              }}
            >
              <span className="lnr lnr-cloud-sync"></span>
            </button>
          </Col>
        </Row>
      </>
    );
  }

  console.log("storageMarketList", storageMarketList);

  return (
    <>
      <Row>
        <Col lg={8}>
          <Select
            // cacheOptions
            // defaultOptions
            options={storageMarketList.map((row) => ({
              name: row.name,
              symbol: row.symbol,
              exchange: row.currency,
            }))}
            /* Remove to default Select... */
            // value={{
            //   name: marketValue["name"],
            //   symbol: marketValue["symbol"],
            //   exchange: marketValue["currency"],
            // }}
            onChange={onUpdateMarket}
            getOptionLabel={(option) => {
              return `${option.symbol} - ${option.name} - ${option.exchange}`;
            }}
            getOptionValue={(option) => {
              return `${option.symbol}`;
            }}
          />
        </Col>
        <Col lg={4}>
          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => {
              getMarketSearch({
                variables: {
                  symbol: "",
                },
              });
            }}
          >
            <span className="lnr lnr-cloud-sync"></span>
          </button>
        </Col>
      </Row>
    </>
  );
}
