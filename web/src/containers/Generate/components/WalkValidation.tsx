import React, { useContext, useState } from "react";
import { Col, Collapse, Row } from "reactstrap";
import Select from 'react-select';

import CheckIcon from "mdi-react/CheckIcon";
import { data } from "./data";
import { Link } from "react-router-dom";
import ChevronUpIcon from "mdi-react/ChevronUpIcon";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";
import { ContextGenerate } from "../../../hooks/context/Context";

interface Props { }

export const WalkValidation: React.FC<Props> = () => {
    const { sample, entry_number, numberic_values_range, search_best } = data();

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

    return (
        <div>
            <h4 style={{ marginBottom: 15, marginTop: 20 }}>Perform robustness testing</h4>
            <div className="generate-panel generate-panel-default" style={{ marginBottom: 5 }}>
                <div className="generate-panel-heading" style={{ paddingTop: 15, paddingBottom: 15 }}>
                    <Row>
                        <Col md={1} xs={1}>
                            <label
                                className=""
                                htmlFor="walk_val"
                                style={{ marginTop: 0, paddingBottom: 5 }}
                            >
                                <input
                                    className="checkbox-btn__checkbox"
                                    type="checkbox"
                                    id="walk_val"
                                    name="walk_val"
                                    onChange={() => generateDispatch({
                                        type: "CHECK_WALK_VALIDATION",
                                        checkWalkValidation: !generateState.checkWalkValidation
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
                                    type: 'WALK_VALIDATION',
                                    walkValidation: !generateState.walkValidation
                                })}
                            >
                                Walk Forward validation
                            <span style={{ float: "right" }}>{view.icon}</span>
                            </h4>
                        </Col>
                    </Row>
                </div>
                <Collapse
                    isOpen={generateState.walkValidation ? true : false}
                    className="collapse__content"
                    onEntering={onEntering}
                    onEntered={onEntered}
                    onExiting={onExiting}
                    onExited={onExited}
                >
                    <Col sm={12} style={{ marginTop: 20 }}>
                        <Row style={{ padding: 5 }}>
                            <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                                <label>Segments</label>
                            </Col>
                            <Col sm={6}>
                                <Select
                                    options={entry_number}
                                    defaultValue={{ label: '5', value: 5 }}
                                />
                            </Col>
                        </Row>
                        <hr className="hr-text" data-content="Optimization options" />
                        <Row style={{ padding: 5 }}>
                            <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                                <label>Out of Sample</label>
                            </Col>
                            <Col sm={6}>
                                <Select
                                    options={sample.slice(1, 6)}
                                    defaultValue={{ label: '30 % OOS', value: '30' }}
                                />
                            </Col>
                        </Row>
                        <Row style={{ padding: 5 }}>
                            <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                                <label>Numeric values range</label>
                            </Col>
                            <Col sm={6}>
                                <Select
                                    options={numberic_values_range}
                                    defaultValue={{ label: '± 20 steps', value: '20steps' }}
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
                        <Row style={{ padding: 5 }}>
                            <Col sm={12} style={{ textAlign: "center", marginTop: 20 }}>
                                <label
                                    className=""
                                    htmlFor=""
                                    style={{ marginTop: 0, paddingBottom: 5 }}
                                >
                                    <input
                                        className="checkbox-btn__checkbox"
                                        type="checkbox"
                                        id=""
                                        name=""
                                        onChange={onfChange}
                                    />
                                    <span className="checkbox-btn__checkbox-custom" style={{ backgroundColor: "white" }}>
                                        <CheckIcon />
                                    </span>
                                    <span className="checkbox-btn__label">
                                        Optimize Stop Loss and Take Profit
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
                                        onChange={onsChange}
                                    />
                                    <span className="checkbox-btn__checkbox-custom" style={{ backgroundColor: "white" }}>
                                        <CheckIcon />
                                    </span>
                                    <span className="checkbox-btn__label">
                                        Optimize <Link to="">Preset Indicators </Link>
                                    </span>
                                </label>
                            </Col>
                        </Row>
                        <hr className="hr-text" data-content="Validation" />
                        <Row>
                            <Col>
                                <Row>
                                    <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                                        <label>Validated segments</label>
                                    </Col>
                                    <Col sm={6}>
                                        <Select
                                            options={entry_number}
                                            defaultValue={{ label: '5', value: 5 }}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Collapse>
            </div>
        </div>
    )
}