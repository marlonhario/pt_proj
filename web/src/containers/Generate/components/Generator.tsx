import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Collapse } from "reactstrap";
import Select from "react-select";

import CheckIcon from "mdi-react/CheckIcon";

import { data } from "./data";
import { ActionGenerate } from "./actionGenerate";
import { ContextGenerate, ContextGenerateValidation } from "../../../hooks/context/Context";
import { GeneratorAcceptance } from "./generator/GeneratorAcceptance";
import { GeneratorDropdown } from "./generator/GeneratorDropdown";

interface Props {}

export const Generator: React.FC<Props> = ({}) => {
    const { generateState, generateDispatch } = useContext(ContextGenerate);
    const {
        generateValidationState: { generate_acceptance_data_list, complete_backtest_initial, in_sample_initial, out_sample_initial },
    } = useContext(ContextGenerateValidation);
    const { out_sample } = generateState;
    const {
        handleMaxEntry,
        handleMaxExit,
        handleWorkingMins,
        handleSearchBest,
        handleOutSample,
        handleAcceptanceCriteria,
        handleAcceptanceCriteria1,
        handleAcceptanceCriteria2,
        handleAcceptanceInput,
        handleAcceptanceInput1,
        handleAcceptanceInput2,
        handleRefreshComplete,
        handleRefreshInSample,
        handleRefreshOutSample,
        handleDeleteInput,
        handleDeleteInput1,
        handleDeleteInput2,
    } = ActionGenerate();
    const { sample, search_best, entry_number } = data();

    return (
        <div className="generate-panel generate-panel-default" style={{ marginBottom: 30 }}>
            <div className="generate-panel-heading">
                <h4
                    className="generate-panel-title"
                    onClick={() =>
                        generateDispatch({
                            type: "GENERATOR",
                            generator: true,
                        })
                    }
                >
                    3. Generator settings
                </h4>
            </div>
            <Collapse isOpen={generateState.generator ? true : false} className="collapse__content">
                <Col sm={12} style={{ marginTop: 20 }}>
                    <Row style={{ padding: 5 }}>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                            <label>Working minutes</label>
                        </Col>
                        <Col sm={6}>
                            <input
                                className="form-control"
                                type="number"
                                min={0}
                                max={100000}
                                step={1}
                                defaultValue={generateState.working_mins}
                                onChange={handleWorkingMins}
                                onInput={handleWorkingMins}
                                // value={generateState.working_mins}
                            />
                        </Col>
                    </Row>
                    <Row style={{ padding: 5 }}>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                            <label>Search Best</label>
                        </Col>
                        <Col sm={6}>
                            <Select
                                options={search_best}
                                defaultValue={generateState.search_best}
                                onChange={handleSearchBest}
                                value={generateState.search_best}
                            />
                        </Col>
                    </Row>
                    <Row style={{ padding: 5 }}>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                            <label>Out of Sample</label>
                        </Col>
                        <Col sm={6}>
                            <Select
                                options={sample}
                                defaultValue={generateState.out_sample}
                                onChange={handleOutSample}
                                value={generateState.out_sample}
                            />
                        </Col>
                    </Row>
                    <hr className="hr-text" data-content="Indicators" />
                    <Row style={{ padding: 5 }}>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                            <label>Max entry indicators</label>
                        </Col>
                        <Col sm={6}>
                            <Select
                                options={entry_number.slice(0, 8)}
                                defaultValue={generateState.generate_max_entry}
                                onChange={handleMaxEntry}
                                value={generateState.generate_max_entry}
                            />
                        </Col>
                    </Row>
                    <Row style={{ padding: 5 }}>
                        <Col sm={6} style={{ textAlign: "right", marginTop: 10, fontWeight: 700 }}>
                            <label>Max exit indicators</label>
                        </Col>
                        <Col sm={6}>
                            <Select
                                options={entry_number.slice(0, 4)}
                                defaultValue={generateState.generate_max_exit}
                                onChange={handleMaxExit}
                                value={generateState.generate_max_exit}
                            />
                        </Col>
                    </Row>
                    <Row style={{ padding: 5 }}>
                        <Col sm={12} style={{ textAlign: "center" }}>
                            <label className="" htmlFor="generator_checkbox_generate">
                                <input
                                    className="checkbox-btn__checkbox"
                                    type="checkbox"
                                    id="generator_checkbox_generate"
                                    name="generator_checkbox_generate"
                                    onChange={() => {
                                        generateDispatch({
                                            type: "GENERATE_PRESET",
                                            generate_preset_indicators: !generateState.generate_preset_indicators,
                                        });
                                    }}
                                    checked={generateState.generate_preset_indicators}
                                />
                                <span className="checkbox-btn__checkbox-custom">
                                    <CheckIcon />
                                </span>
                                <span className="checkbox-btn__label">
                                    Generate strategies with <Link to="">Preset Indicators</Link>
                                </span>
                            </label>
                        </Col>
                    </Row>
                    <hr className="hr-text" data-content="Validation" />
                    <Row style={{ padding: 5 }}>
                        <Col sm={12}>
                            <GeneratorDropdown
                                title={"Complete backtest"}
                                subTitle={"Add acceptance criteria"}
                                data={generate_acceptance_data_list}
                                handleChange={handleAcceptanceCriteria}
                                handleRefresh={handleRefreshComplete}
                                some={complete_backtest_initial}
                            />
                            <Row>
                                <GeneratorAcceptance
                                    data={complete_backtest_initial}
                                    handleOnChange={handleAcceptanceInput}
                                    handleOnDelete={handleDeleteInput}
                                />
                            </Row>
                            <hr />
                            {out_sample.value !== "is" ? (
                                <>
                                    <Row style={{ padding: 5 }}>
                                        <Col sm={12}>
                                            <GeneratorDropdown
                                                title={"In Sample (training) part"}
                                                subTitle={"Add acceptance criteria"}
                                                data={generate_acceptance_data_list}
                                                handleChange={handleAcceptanceCriteria1}
                                                handleRefresh={handleRefreshInSample}
                                                some={in_sample_initial}
                                            />
                                            <Row>
                                                <GeneratorAcceptance
                                                    data={in_sample_initial}
                                                    handleOnChange={handleAcceptanceInput1}
                                                    handleOnDelete={handleDeleteInput1}
                                                />
                                            </Row>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row style={{ padding: 5 }}>
                                        <Col sm={12}>
                                            <GeneratorDropdown
                                                title={"Out of Sample (trading) part"}
                                                subTitle={"Add acceptance criteria"}
                                                data={generate_acceptance_data_list}
                                                handleChange={handleAcceptanceCriteria2}
                                                handleRefresh={handleRefreshOutSample}
                                                some={out_sample_initial}
                                            />
                                            <Row>
                                                <GeneratorAcceptance
                                                    data={out_sample_initial}
                                                    handleOnChange={handleAcceptanceInput2}
                                                    handleOnDelete={handleDeleteInput2}
                                                />
                                            </Row>
                                        </Col>
                                    </Row>
                                </>
                            ) : (
                                ""
                            )}
                        </Col>
                    </Row>
                </Col>
            </Collapse>
        </div>
    );
};
