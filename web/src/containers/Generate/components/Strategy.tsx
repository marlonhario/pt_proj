import React, { useContext } from "react";
import { Col, Row, Collapse } from "reactstrap";
import Select from "react-select";

import { data } from "./data";
import { ActionGenerate } from "./actionGenerate";
import { ContextGenerate } from "../../../hooks/context/Context";
import { DropdownGenerate } from "../../../types/Generate";

export const Strategy: React.FC = ({}) => {
    const { generateState, generateDispatch } = useContext(ContextGenerate);
    const { use, typeStopLoss } = data();

    const handleMaxPips = (event: React.ChangeEvent<HTMLInputElement>) => {
        generateDispatch({
            type: "MAX_PIPS",
            max_pips: parseFloat(event.currentTarget.value),
        });
    };

    const handleMinPips = (event: React.ChangeEvent<HTMLInputElement>) => {
        generateDispatch({
            type: "MIN_PIPS",
            min_pips: parseFloat(event.currentTarget.value),
        });
    };

    const handleEntryLots = (event: React.ChangeEvent<HTMLInputElement>) => {
        generateDispatch({
            type: "ENTRY_LOTS",
            entry_lots: parseFloat(event.currentTarget.value),
        });
    };

    const handleChangeTakeProfit = (event: DropdownGenerate) => {
        generateDispatch({
            type: "TAKE_PROFIT",
            take_profit: event,
        });
    };

    const handleProfitMinPips = (event: React.ChangeEvent<HTMLInputElement>) => {
        generateDispatch({
            type: "PROFIT_MIN_PIPS",
            profit_min_pips: event.currentTarget.value,
        });
    };

    const handleChangeStopLoss = (event: DropdownGenerate) => {
        generateDispatch({
            type: "STOP_LOSS",
            stop_loss: event,
        });
    };

    const handleChangeTypeStopLoss = (event: DropdownGenerate) => {
        generateDispatch({
            type: "TYPE_STOP_LOSS",
            type_stop_loss: event,
        });
    };

    const handleProfitMaxPips = (event: React.ChangeEvent<HTMLInputElement>) => {
        generateDispatch({
            type: "PROFIT_MAX_PIPS",
            profit_max_pips: event.currentTarget.value,
        });
    };

    return (
        <div className="generate-panel generate-panel-default" style={{ marginBottom: 5 }}>
            <div className="generate-panel-heading">
                <h4
                    className="generate-panel-title"
                    onClick={() =>
                        generateDispatch({
                            type: "STRATEGY",
                            strategy: true,
                        })
                    }
                >
                    2. Strategy properties
                </h4>
            </div>
            <Collapse isOpen={generateState.strategy ? true : false} className="collapse__content">
                <Col sm={12} style={{ marginTop: 20 }}>
                    <Row style={{ padding: 5 }}>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                            <label>Trade value(USD)</label>
                        </Col>
                        <Col sm={6}>
                            <input
                                className="form-control"
                                type="number"
                                min={0}
                                max={100000}
                                step={1}
                                // value={generateState.entry_lots}
                                onChange={handleEntryLots}
                                onInput={handleEntryLots}
                                defaultValue={generateState.entry_lots}
                            />
                        </Col>
                    </Row>
                    <hr className="hr-text" data-content="Stop Loss" />
                    <Row style={{ padding: 5 }}>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                            <label>Stop Loss</label>
                        </Col>
                        <Col sm={6}>
                            <Select
                                options={use}
                                defaultValue={generateState.stop_loss}
                                onChange={handleChangeStopLoss}
                                value={generateState.stop_loss}
                            />
                        </Col>
                    </Row>
                    <Row style={{ display: generateState.stop_loss.value === "dns" ? "none" : "" }}>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 30, fontWeight: 700 }}>
                            <label>Type</label>
                        </Col>
                        <Col sm={6} style={{ marginTop: 20 }}>
                            <Select
                                options={typeStopLoss}
                                defaultValue={generateState.type_stop_loss}
                                onChange={handleChangeTypeStopLoss}
                                value={generateState.type_stop_loss}
                            />
                        </Col>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 30, fontWeight: 700 }}>
                            <label>Min (pips)</label>
                        </Col>
                        <Col sm={6} style={{ marginTop: 20 }}>
                            <input
                                className="form-control stop-loss-min-pips"
                                type="number"
                                min={0}
                                max={100000}
                                step={1}
                                defaultValue={generateState.min_pips}
                                onChange={handleMinPips}
                                onInput={handleMinPips}
                                // value={generateState.min_pips}
                            />
                        </Col>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 30, fontWeight: 700 }}>
                            <label>Max (pips)</label>
                        </Col>
                        <Col sm={6} style={{ marginTop: 20 }}>
                            <input
                                className="form-control stop-loss-max-pips"
                                type="number"
                                min={0}
                                max={100000}
                                step={1}
                                defaultValue={generateState.max_pips}
                                onChange={handleMaxPips}
                                onInput={handleMaxPips}
                                // value={generateState.max_pips}
                            />
                        </Col>
                    </Row>
                    <hr className="hr-text" data-content="Take Profit" />
                    <Row style={{ padding: 5 }}>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                            <label>Take Profit</label>
                        </Col>
                        <Col sm={6}>
                            <Select
                                options={use}
                                defaultValue={generateState.take_profit}
                                onChange={handleChangeTakeProfit}
                                value={generateState.take_profit}
                            />
                        </Col>
                    </Row>
                    <Row style={{ display: generateState.take_profit.value === "dns" ? "none" : "" }}>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 20, fontWeight: 700 }}>
                            <label>Min (Pips)</label>
                        </Col>
                        <Col sm={6} style={{ marginTop: 20 }}>
                            <input
                                className="form-control stop-loss-min-pips-profit"
                                type="number"
                                min={0}
                                max={100000}
                                step={1}
                                defaultValue={generateState.profit_min_pips}
                                onChange={handleProfitMinPips}
                                onInput={handleProfitMinPips}
                                // value={generateState.profit_min_pips}
                            />
                        </Col>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 20, fontWeight: 700 }}>
                            <label>Max (Pips)</label>
                        </Col>
                        <Col sm={6} style={{ marginTop: 20 }}>
                            <input
                                className="form-control stop-loss-max-pips"
                                type="number"
                                min={0}
                                max={100000}
                                step={1}
                                defaultValue={generateState.profit_max_pips}
                                onChange={handleProfitMaxPips}
                                onInput={handleProfitMaxPips}
                                // value={generateState.profit_max_pips}
                            />
                        </Col>
                    </Row>
                </Col>
            </Collapse>
        </div>
    );
};
