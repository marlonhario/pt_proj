import React, { useContext, useState } from "react";
import { Col, Row, Collapse } from "reactstrap";
import Select from 'react-select';

import CheckIcon from "mdi-react/CheckIcon";
import { data } from "./data";
import { Link } from "react-router-dom";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";
import ChevronUpIcon from "mdi-react/ChevronUpIcon";
import { ContextGenerate } from "../../../hooks/context/Context";

interface Props { }

export const FullOptimization: React.FC<Props> = ({ }) => {
    const { sample, numberic_values_range, search_best } = data();

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

    return (
        <div>
            <h4 style={{ marginBottom: 15 }}>Optimize strategies</h4>
            <div className="generate-panel generate-panel-default" style={{ marginBottom: 5 }}>
                <div className="generate-panel-heading" style={{ paddingTop: 15, paddingBottom: 15 }}>
                    <Row>
                        <Col md={1} xs={1}>
                            <label
                                className=""
                                htmlFor="full_data"
                                style={{ marginTop: 0, paddingBottom: 5 }}
                            >
                                <input
                                    className="checkbox-btn__checkbox"
                                    type="checkbox"
                                    id="full_data"
                                    name="full_data"
                                    onChange={() => generateDispatch({
                                        type: "CHECK_FULL_OPTIMIZATION",
                                        checkFullOptimization: !generateState.checkFullOptimization
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
                                    type: 'FULL_OPTIMIZATION',
                                    fullOptimization: !generateState.fullOptimization
                                })
                                }
                            >
                                Full Data optimization
                            <span style={{ float: "right" }}>{view.icon}</span>
                            </h4>
                        </Col>
                    </Row>
                </div>
                <Collapse
                    isOpen={generateState.fullOptimization ? true : false}
                    className="collapse__content"
                    onEntering={onEntering}
                    onEntered={onEntered}
                    onExiting={onExiting}
                    onExited={onExited}
                >
                    <Col sm={12} style={{ marginTop: 20 }}>
                        <Row style={{ padding: 5 }}>
                            <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                                <label>Out of Sample</label>
                            </Col>
                            <Col sm={6}>
                                <Select
                                    options={sample}
                                    defaultValue={{ label: 'In sample', value: 'is' }}
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
                            <Col sm={12} style={{ textAlign: "center", marginTop: 20 }}>
                                <label
                                    className=""
                                    htmlFor="full_opmitzation_optimize"
                                    style={{ marginTop: 0, paddingBottom: 5 }}
                                >
                                    <input
                                        className="checkbox-btn__checkbox"
                                        type="checkbox"
                                        id="full_opmitzation_optimize"
                                        name="full_opmitzation_optimize"
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
                                    htmlFor="full_opmitzation_optimize_preset"
                                    style={{ marginTop: 0, paddingBottom: 5, marginRight: 48 }}
                                >
                                    <input
                                        className="checkbox-btn__checkbox"
                                        type="checkbox"
                                        id="full_opmitzation_optimize_preset"
                                        name="full_opmitzation_optimize_preset"
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
                                <Col style={{ textAlign: "center", marginTop: 20 }}>
                                    <label
                                        htmlFor="full_opmitzation_optimizer"
                                        style={{ marginTop: 0, paddingBottom: 5 }}
                                    >
                                        <input
                                            className="checkbox-btn__checkbox"
                                            type="checkbox"
                                            id="full_opmitzation_optimizer"
                                            name="full_opmitzation_optimizer"
                                            checked={false}
                                            onChange={onsChange}
                                        />
                                        <span className="checkbox-btn__checkbox-custom" style={{ backgroundColor: "white" }}>
                                            <CheckIcon />
                                        </span>
                                        <span className="checkbox-btn__label">
                                            Use the Optimizer's Acceptance Criteria
                                    </span>
                                    </label>
                                </Col>
                                <Col style={{ textAlign: "center", marginTop: 10 }}>
                                    <label
                                        className=""
                                        htmlFor="full_opmitzation_use_common_acceptance"
                                        style={{ marginTop: 0, paddingBottom: 5 }}
                                    >
                                        <input
                                            className="checkbox-btn__checkbox"
                                            type="checkbox"
                                            id="full_opmitzation_use_common_acceptance"
                                            name="full_opmitzation_use_common_acceptance"
                                            checked={true}
                                            onChange={onsChange}
                                        />
                                        <span className="checkbox-btn__checkbox-custom" style={{ backgroundColor: "white" }}>
                                            <CheckIcon />
                                        </span>
                                        <span className="checkbox-btn__label">
                                            Use the common <Link to="">Acceptance Criteria</Link>
                                        </span>
                                    </label>
                                </Col>
                            </Col>
                        </Row>
                    </Col>
                </Collapse>
            </div>
        </div>
    )
}