import React, { useContext, useState } from "react";
import { Col, Collapse, Row } from "reactstrap";
import Select from 'react-select';

import CheckIcon from "mdi-react/CheckIcon";
import { data } from "./data";
import { Link } from "react-router-dom";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";
import ChevronUpIcon from "mdi-react/ChevronUpIcon";
import { ContextGenerate } from "../../../hooks/context/Context";

interface Props {
    display?: string;
}

export const MonteValidation: React.FC<Props> = ({ display }) => {
    const { count_of_tests, validated_tests } = data();

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

    return (
        <div className="generate-panel generate-panel-default" style={{ marginBottom: 5 }}>
            <div className="generate-panel-heading" style={{ paddingTop: 15, paddingBottom: 15 }}>
                <Row>
                    <Col md={1} xs={1}>
                        <label
                            className=""
                            htmlFor="monte"
                            style={{ marginTop: 0, paddingBottom: 5 }}
                        >
                            <input
                                className="checkbox-btn__checkbox"
                                type="checkbox"
                                id="monte"
                                name="monte"
                                onChange={() => generateDispatch({
                                    type: "CHECK_MONTE_VALIDATION",
                                    checkMonteValidation: !generateState.checkMonteValidation
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
                                type: 'MONTE_VALIDATION',
                                monteValidation: !generateState.monteValidation
                            })}
                        >
                            Monte Carlo validation
                            <span style={{ float: "right" }}>{view.icon}</span>
                        </h4>
                    </Col>
                </Row>
            </div>
            <Collapse
                isOpen={generateState.monteValidation ? true : false}
                className="collapse__content"
                onEntering={onEntering}
                onEntered={onEntered}
                onExiting={onExiting}
                onExited={onExited}
            >
                <Col sm={12} style={{ marginTop: 20 }}>
                    <Row style={{ padding: 5 }}>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                            <label>Count of tests</label>
                        </Col>
                        <Col sm={6}>
                            <Select
                                options={count_of_tests}
                                defaultValue={{ label: 20, value: 20 }}
                            />
                        </Col>
                        <Col style={{ textAlign: "center", marginTop: 15 }}>
                            <label>Monte Carlo validation uses settings from <Link to="">Monte Carlo</Link>.</label>
                        </Col>
                    </Row>
                    <hr className="hr-text" data-content="Validation" />
                    <Row>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                            <label>Validated tests</label>
                        </Col>
                        <Col sm={6}>
                            <Select
                                options={validated_tests}
                                defaultValue={{ label: "80 %", value: "80" }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Collapse>
        </div>
    )
}