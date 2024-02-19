import React, { useEffect, useState } from "react";
import { Card, CardBody, Table, Input, Col, Spinner } from "reactstrap";
import Select, { OptionTypeBase } from "react-select";

import { TableTitle, TableTitleText } from "../DesignTable";
import { staticData } from "../data";
import { useDesign } from "../../../../services/graphQL/Design/useDesign";
import { useFetchStock } from "../../../../services/graphQL/Design/useFetchStock";
import { useIndicator } from "../../../../services/graphQL/Design/useIndicator";

export const DesignMarketInfo: React.FC = ({}) => {
    const { designState, designDispatch } = useDesign();
    const { marketInterval } = staticData();
    const { fetchStockData } = useFetchStock();
    const { handleAddIndicator } = useIndicator();

    const {
        marketData: { name, interval, number_data_records, first_data, last_data, spread, symbol, exchange },
        loading,
        loadingInterval,
        longEntryList: longEntry,
        longExitList: longExit,
        shortEntryList: shortEntry,
        shortExitList: shortExit,
        strategyProperties,
    } = designState;

    const marketValue =
        name.length > 0
            ? {
                  name: name ? name : "",
                  symbol: symbol ? symbol : "",
                  exchange: exchange ? exchange : "",
              }
            : "";

    const intervalValue = interval.value.length > 0 ? interval : "";

    const customStyles = {
        container: (styles) => ({
            ...styles,
            width: !loading ? 255 : 250,
            marginLeft: 25,
        }),
        control: (styles, { isDisabled }) => {
            return {
                ...styles,
                cursor: isDisabled ? "not-allowed" : "default",
                color: isDisabled ? "#aaa" : "white",
            };
        },
        option: (styles) => {
            return {
                ...styles,
                disabled: true,
            };
        },
    };

    const customStyles1 = {
        container: (styles) => {
            return {
                ...styles,
                width: !loading ? 255 : 250,
                marginLeft: 25,
            };
        },
    };

    const handleChangeMarket = async (event: OptionTypeBase) => {
        designDispatch({
            type: "SET_MARKET_SELECTION",
            name: event.name,
            symbol: event.symbol,
            exchange: event.exchange,
            loading: interval.value ? true : false,
        });

        if (interval.value) {
            fetch(event.symbol, interval.value);
        }
    };

    const handleChangeInterval = async (event: OptionTypeBase) => {
        designDispatch({
            type: "SET_MARKET_INTERVAL",
            interval: event,
            loadingInterval: true,
        });

        fetch(symbol, event.value);
    };

    const handleChangeSpread = (event: any) => {
        designDispatch({
            type: "SET_INPUT_SPREAD",
            spread: event.target.value,
        });
    };

    const fetch = async (symbol: string, interval: string) => {
        const results = await fetchStockData(symbol, interval);

        if (results) {
            if (longEntry.length > 0 || longExit.length > 0 || shortEntry.length > 0 || shortExit.length > 0) {
                if (results.data) {
                    handleAddIndicator(
                        {
                            longEntry,
                            shortEntry,
                            longExit,
                            shortExit,
                        },
                        results.data,
                        strategyProperties
                    );
                }
            }

            designDispatch({
                type: "SET_NUMBER_DATA_RECORDS",
                number_data_records: results.getMarketData.length,
                stockData: results.data,
                loading: false,
                loadingInterval: false,
            });
        }
    };

    return (
        <Col md={12} xs={12}>
            <Card>
                <CardBody style={{ padding: 0 }}>
                    <Table striped responsive>
                        <TableTitle>
                            <TableTitleText>Market Info</TableTitleText>
                        </TableTitle>
                        <tbody>
                            <tr>
                                <td>Market</td>
                                <td style={{ textAlign: "right", paddingRight: 20 }}>
                                    <Col
                                        style={{
                                            display: loading ? "flex" : "",
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                        }}
                                    >
                                        <Select
                                            options={designState.storageMarketList.map((row) => ({
                                                name: row.name,
                                                symbol: row.symbol,
                                                exchange: row.currency,
                                            }))}
                                            onChange={handleChangeMarket}
                                            getOptionLabel={(option) => {
                                                return `${option.symbol} - ${option.name} - ${option.exchange}`;
                                            }}
                                            getOptionValue={(option) => {
                                                return `${option.symbol}`;
                                            }}
                                            maxMenuHeight={150}
                                            value={marketValue}
                                            isDisabled={loading}
                                            styles={customStyles}
                                        />
                                        {loading ? <Spinner color="primary" style={{ marginLeft: 6, float: "right" }} /> : ""}
                                    </Col>
                                </td>
                            </tr>
                            <tr>
                                <td>Market Interval</td>
                                <td style={{ textAlign: "right", paddingRight: 20 }}>
                                    <Col
                                        style={{
                                            display: loadingInterval ? "flex" : "",
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                        }}
                                    >
                                        <Select
                                            options={marketInterval}
                                            maxMenuHeight={150}
                                            onChange={handleChangeInterval}
                                            styles={customStyles1}
                                            value={intervalValue}
                                            isDisabled={!loadingInterval ? (name && !loading ? false : true) : true}
                                        />
                                        {loadingInterval ? <Spinner color="primary" style={{ marginLeft: 6, float: "right" }} /> : ""}
                                    </Col>
                                </td>
                            </tr>
                            <tr>
                                <td>Count of bars</td>
                                <td style={{ textAlign: "right", paddingRight: 20 }}>{number_data_records}</td>
                            </tr>
                            <tr>
                                <td>Data start</td>
                                <td style={{ textAlign: "right", paddingRight: 20 }}>{first_data}</td>
                            </tr>
                            <tr>
                                <td>Data end</td>
                                <td style={{ textAlign: "right", paddingRight: 20 }}>{last_data}</td>
                            </tr>
                            <tr>
                                <td>Spread</td>
                                <td style={{ textAlign: "right", paddingRight: 20 }}>
                                    <Input
                                        type="number"
                                        value={(() => {
                                            let theSpread = spread.toString();
                                            let char = theSpread.split("");
                                            let true_spread =
                                                char[0] === "0" && theSpread.length > 1 ? theSpread.substring(1, theSpread.length) : theSpread;
                                            return true_spread;
                                        })()}
                                        min={0}
                                        max={100}
                                        onChange={handleChangeSpread}
                                    />
                                    {spread ? spread : 0} %
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </Col>
    );
};
