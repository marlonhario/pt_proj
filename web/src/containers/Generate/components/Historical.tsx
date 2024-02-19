import React, { useContext } from "react";
import { Col, Row, Collapse, Spinner } from "reactstrap";
import Select from "react-select";

import { data } from "./data";
import { useGenerate } from "./action/useGenerate";
import { ContextGenerate } from "../../../hooks/context/Context";
import { DropdownGenerate } from "../../../types/Generate";

interface Props {}

export const Historical: React.FC<Props> = ({}) => {
    const {
        generateState: { symbol, historical, period, stockData },
        generateDispatch,
    } = useContext(ContextGenerate);
    const { period: periodList } = data();
    const { dataGenerate, loadingGenerate } = useGenerate();

    let symbolList = [];

    if (!loadingGenerate && dataGenerate) {
        dataGenerate?.getMarketSymbol.market.map((value) => {
            symbolList.push({
                label: value.symbol + " - " + value.name,
                value: value.id,
            });
        });
    }

    const defaulySymbol = symbol.label.length > 0 ? symbol : "";
    const defaulySymbolValue = symbol.label.length > 0 ? symbol.label : "";

    const handleChangeSymbol = (event: any) => {
        generateDispatch({
            type: "CHANGE_SYMBOL",
            symbol: { label: event.value, value: event.label },
        });
    };

    const handleChangePeriod = (event: DropdownGenerate) => {
        generateDispatch({
            type: "CHANGE_PERIOD",
            period: event,
        });
    };

    const SymbolDropdown = () => {
        return (
            // @ts-ignore
            <Select
                options={dataGenerate?.getMarketSymbol.market.map((value: any) => ({
                    id: value.id,
                    label: value.name,
                    value: value.symbol,
                }))}
                getOptionLabel={(option) => {
                    return `${option.label} - ${option.value}`;
                }}
                getOptionValue={(option) => {
                    return `${option.value}`;
                }}
                onChange={handleChangeSymbol}
                defaultValue={defaulySymbol}
                value={defaulySymbol}
            />
        );
    };

    return (
        <div>
            <h4>Generate new strategies</h4>
            <div className="generate-panel generate-panel-default" style={{ marginBottom: 5, marginTop: 10 }}>
                <div className="generate-panel-heading">
                    <h4
                        className="generate-panel-title"
                        onClick={() =>
                            generateDispatch({
                                type: "HISTORICAL",
                                historical: true,
                            })
                        }
                    >
                        1. Historical data
                    </h4>
                </div>
                <Collapse isOpen={historical ? true : false} className="collapse__content">
                    <Col sm={12} style={{ marginTop: 20 }}>
                        <Row style={{ padding: 5 }}>
                            <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                                <label>Symbol</label>
                            </Col>
                            <Col sm={6}>
                                {defaulySymbolValue ? (
                                    <SymbolDropdown />
                                ) : loadingGenerate ? (
                                    <Col sm={12} md={{ size: 6, offset: 3 }} className="loading-spinner">
                                        <Spinner color="primary" />
                                    </Col>
                                ) : !loadingGenerate && dataGenerate.getMarketSymbol.market ? (
                                    <SymbolDropdown />
                                ) : (
                                    ""
                                )}
                            </Col>
                        </Row>
                        <Row style={{ padding: 5 }}>
                            <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                                <label>Period</label>
                            </Col>
                            <Col sm={6}>
                                <Select options={periodList} onChange={handleChangePeriod} defaultValue={period} value={period} />
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ textAlign: "right", marginTop: 20 }}>{symbol ? <label>Loaded {symbol.label}</label> : ""}</Col>
                        </Row>
                        <Row>
                            <Col style={{ textAlign: "right" }}>
                                <label>From 08/20/2014, 06:00, to 08/27/2020, 02:00.</label>
                            </Col>
                        </Row>
                    </Col>
                </Collapse>
            </div>
        </div>
    );
};
