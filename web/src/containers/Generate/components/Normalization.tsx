import React, { useContext, useState } from "react";
import { Col, Collapse, Row } from "reactstrap";
import Select from 'react-select';

import CheckIcon from "mdi-react/CheckIcon";
import { data } from "./data";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";
import ChevronUpIcon from "mdi-react/ChevronUpIcon";
import { ContextGenerate } from "../../../hooks/context/Context";

interface Props { }

export const Normalization: React.FC<Props> = ({ }) => {
    const { search_best, numberic_values_steps } = data();

    const { generateState, generateDispatch } = useContext(ContextGenerate)

    const [view, setView] = useState({ styleClass: 'closed', icon: <ChevronUpIcon /> });

    const onEntering = () => {
        setView({ styleClass: 'opening', icon: <ChevronDownIcon /> });
    };

    const onEntered = () => {
        setView({ styleClass: 'opened', icon: <ChevronDownIcon /> });
    };

    const onExiting = () => {
        setView({ styleClass: 'closing', icon: <ChevronUpIcon /> });
    };

    const onExited = () => {
        setView({ styleClass: 'closed', icon: <ChevronUpIcon /> });
    };

    const onfChange = () => {
    };

    const onsChange = () => {
    };

    const ontChange = () => {
    };

    const onfoChange = () => {
    };

    const onfiChange = () => {
    };

    return (
        <div className="generate-panel generate-panel-default" style={{ marginBottom: 5 }}>
            <div className="generate-panel-heading" style={{ paddingTop: 15, paddingBottom: 15 }}>
                <Row>
                    <Col md={1} xs={1}>
                        <label
                            className=""
                            htmlFor="normal"
                            style={{ marginTop: 0, paddingBottom: 5 }}
                        >
                            <input
                                className="checkbox-btn__checkbox"
                                type="checkbox"
                                id="normal"
                                name="normal"
                                onChange={() => generateDispatch({
                                    type: "CHECK_NORMALIZATION",
                                    checkNormalization: !generateState.checkNormalization
                                })}
                            />
                            <span className="checkbox-btn__checkbox-custom" style={{ backgroundColor: "white" }}>
                                <CheckIcon />
                            </span>
                        </label>
                    </Col>
                    <Col md={11} xs={11} style={{ paddingLeft: 5 }}>
                        <h4
                            className="generate-panel-title"
                            onClick={() => generateDispatch({
                                type: 'NORMALIZATION',
                                normalization: !generateState.normalization
                            })}
                        >
                            Normalization
                            <span style={{ float: "right" }}>{view.icon}</span>
                        </h4>
                    </Col>
                </Row>
            </div>
            <Collapse
                isOpen={generateState.normalization ? true : false}
                className="collapse__content"
                onEntering={onEntering}
                onEntered={onEntered}
                onExiting={onExiting}
                onExited={onExited}
            >
                <Col sm={12} style={{ marginTop: 20 }}>
                    <hr className="hr-text" data-content="Normalize structure" />
                    <Row>
                        <Col sm={12} style={{ textAlign: "center", marginTop: 5 }}>
                            <label
                                className=""
                                htmlFor=""
                                style={{ marginTop: 0, paddingBottom: 5, marginRight: 48 }}
                            >
                                <input
                                    className="checkbox-btn__checkbox"
                                    type="checkbox"
                                    id=""
                                    name=""
                                    checked={true}
                                    onChange={onfChange}
                                />
                                <span className="checkbox-btn__checkbox-custom" style={{ backgroundColor: "white" }}>
                                    <CheckIcon />
                                </span>
                                <span className="checkbox-btn__label">
                                    Remove Take Profit
                                </span>
                            </label>
                        </Col>
                        <Col sm={12} style={{ textAlign: "center", marginTop: 5 }}>
                            <label
                                className=""
                                htmlFor=""
                                style={{ marginTop: 0, paddingBottom: 5, marginRight: 48 }}
                            >
                                <input
                                    className="checkbox-btn__checkbox"
                                    type="checkbox"
                                    id=""
                                    name=""
                                    checked={true}
                                    onChange={onsChange}
                                />
                                <span className="checkbox-btn__checkbox-custom" style={{ backgroundColor: "white" }}>
                                    <CheckIcon />
                                </span>
                                <span className="checkbox-btn__label">
                                    Remove needless indicators
                                </span>
                            </label>
                        </Col>
                    </Row>
                    <hr className="hr-text" data-content="Normalize values" />
                    <Row>
                        <Col sm={12} style={{ textAlign: "center", marginTop: 5 }}>
                            <label
                                className=""
                                htmlFor=""
                                style={{ marginTop: 0, paddingBottom: 5, marginRight: 48 }}
                            >
                                <input
                                    className="checkbox-btn__checkbox"
                                    type="checkbox"
                                    id=""
                                    name=""
                                    checked={true}
                                    onChange={ontChange}
                                />
                                <span className="checkbox-btn__checkbox-custom" style={{ backgroundColor: "white" }}>
                                    <CheckIcon />
                                </span>
                                <span className="checkbox-btn__label">
                                    Reduce Stop Loss
                                </span>
                            </label>
                        </Col>
                        <Col sm={12} style={{ textAlign: "center", marginTop: 5 }}>
                            <label
                                className=""
                                htmlFor=""
                                style={{ marginTop: 0, paddingBottom: 5, marginRight: 48 }}
                            >
                                <input
                                    className="checkbox-btn__checkbox"
                                    type="checkbox"
                                    id=""
                                    name=""
                                    checked={true}
                                    onChange={onfoChange}
                                />
                                <span className="checkbox-btn__checkbox-custom" style={{ backgroundColor: "white" }}>
                                    <CheckIcon />
                                </span>
                                <span className="checkbox-btn__label">
                                    Reduce Take Profit
                                </span>
                            </label>
                        </Col>
                        <Col sm={12} style={{ textAlign: "center", marginTop: 5 }}>
                            <label
                                className=""
                                htmlFor=""
                                style={{ marginTop: 0, paddingBottom: 5, marginRight: 48 }}
                            >
                                <input
                                    className="checkbox-btn__checkbox"
                                    type="checkbox"
                                    id=""
                                    name=""
                                    checked={true}
                                    onChange={onfiChange}
                                />
                                <span className="checkbox-btn__checkbox-custom" style={{ backgroundColor: "white" }}>
                                    <CheckIcon />
                                </span>
                                <span className="checkbox-btn__label">
                                    Normalize indicator parameters
                                </span>
                            </label>
                        </Col>
                    </Row>
                    <hr className="hr-text" data-content="Optimization options" />
                    <Row style={{ padding: 5 }}>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                            <label>Numeric values steps</label>
                        </Col>
                        <Col sm={6}>
                            <Select
                                options={numberic_values_steps}
                                defaultValue={{ label: '20 steps', value: '20' }}
                            />
                        </Col>
                    </Row>
                    <Row style={{ padding: 5 }}>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                            <label>Search best</label>
                        </Col>
                        <Col sm={6}>
                            <Select
                                options={search_best}
                                defaultValue={{ label: 'Net balance', value: 'net_balance' }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Collapse>
        </div>
    )
}