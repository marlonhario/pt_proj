import React, { useContext, useState } from "react";
import { Button, Col, Row, Collapse } from "reactstrap";
import Select from 'react-select';
import PlusIcon from "mdi-react/PlusIcon";
import { GenerateImage } from "../../../shared/components/Generate/Image";
import { data } from "./data";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";
import ChevronUpIcon from "mdi-react/ChevronUpIcon";
import CheckIcon from "mdi-react/CheckIcon";
import { ContextGenerate } from "../../../hooks/context/Context";

interface Props { }

export const MultilValidation: React.FC<Props> = ({ }) => {
    const { entry_number } = data();

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
                            htmlFor="multi"
                            style={{ marginTop: 0, paddingBottom: 5 }}
                        >
                            <input
                                className="checkbox-btn__checkbox"
                                type="checkbox"
                                id="multi"
                                name="multi"
                                onChange={() => generateDispatch({
                                    type: "CHECK_MULTI_VALIDATION",
                                    checkMultiValidation: !generateState.checkMultiValidation
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
                                type: 'MULTI_VALIDATION',
                                multiValidation: !generateState.multiValidation
                            })}
                        >
                            Multi Market validation
                            <span style={{ float: "right" }}>{view.icon}</span>
                        </h4>
                    </Col>
                </Row>
            </div>
            <Collapse
                isOpen={generateState.multiValidation ? true : false}
                className="collapse__content"
                onEntering={onEntering}
                onEntered={onEntered}
                onExiting={onExiting}
                onExited={onExited}
            >
                <Col sm={{ size: 9, offset: 2 }} style={{ marginTop: 20 }}>
                    <Col>
                        <Button outline><PlusIcon /> Add market</Button>
                    </Col>
                    <hr />
                    <Col>
                        <GenerateImage url={`${process.env.REACT_APP_PUBLIC_URL}` + '/img/multi_validation.PNG'} />
                    </Col>
                    <hr className="hr-text" data-content="Validation" />
                    <Row>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                            <label>Validated markets</label>
                        </Col>
                        <Col sm={6}>
                            <Select
                                options={entry_number}
                                defaultValue={{ label: '3', value: 3 }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Collapse>
        </div>
    )
}