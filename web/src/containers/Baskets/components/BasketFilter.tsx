import React, { useState } from "react"
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Label, Row } from "reactstrap"
import CheckIcon from 'mdi-react/CheckIcon'
import DeleteIcon from "mdi-react/DeleteIcon"
import RefreshIcon from "mdi-react/RefreshIcon"
import CloseIcon from "mdi-react/CloseIcon"

import actionBaskets from "./actionBaskets"
import useBaskets from "../../../services/graphQL/Baskets/useBaskets"

interface Props { }

export const BasketFilter: React.FC<Props> = () => {
    const [performance, setPerformance] = useState<boolean>(false)
    const [showDropdown, setShowDropDown] = useState<boolean>(false)

    const { dataStrategies, loadingStrategies } = useBaskets()

    const { handleDropDown, dropDown, inputRecord, handleInput, handleRemove } = actionBaskets()

    const count_start = !loadingStrategies && dataStrategies.getStrategies.start
    const count_last = !loadingStrategies && dataStrategies.getStrategies.end

    return (
        <Col>
            <h4>Filter Records</h4>
            <div className="basket-panel panel-default" style={{ marginBottom: 30 }}>
                <div className="panel-body">
                    <label
                        className=""
                        htmlFor="performance_filter"
                    >
                        <input
                            className="checkbox-btn__checkbox"
                            type="checkbox"
                            id="performance_filter"
                            name="performance_filter"
                            onChange={() => {
                                setPerformance(!performance)
                            }}
                            checked={performance}
                        />
                        <span className="checkbox-btn__checkbox-custom">
                            <CheckIcon />
                        </span>
                        <span className="checkbox-btn__label">
                            Use performance filters.
                        </span>
                    </label>
                    {
                        performance ?
                            <div>
                                <Row>
                                    <Col sm={12}>
                                        <span>Passed strategies: </span>
                                        <span className="label-basket label-default-num">{count_start} of {count_last}</span>
                                        <Button
                                            className="icon"
                                            outline
                                            style={{
                                                float: "right",
                                                paddingTop: 7,
                                                paddingRight: 7,
                                                paddingBottom: 10,
                                                paddingLeft: 10
                                            }}
                                        >
                                            <p><DeleteIcon /></p>
                                        </Button>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm={12}>
                                        <Row>
                                            <Col style={{ display: "flex", justifyContent: "center" }}>
                                                <Dropdown
                                                    isOpen={showDropdown}
                                                    toggle={() => {
                                                        setShowDropDown(!showDropdown)
                                                    }}
                                                >
                                                    <DropdownToggle
                                                        style={{ backgroundColor: "white" }}>
                                                        Add validation criteria
                                                    </DropdownToggle>
                                                    <DropdownMenu
                                                        modifiers={{
                                                            setMaxHeight: {
                                                                enabled: true,
                                                                order: 890,
                                                                fn: (data) => {
                                                                    return {
                                                                        ...data,
                                                                        styles: {
                                                                            ...data.styles,
                                                                            overflow: 'auto',
                                                                            maxHeight: '200px',
                                                                        },
                                                                    };
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        {
                                                            dropDown.map((item, key) => (
                                                                <DropdownItem
                                                                    key={key}
                                                                    onClick={(e) => {
                                                                        handleDropDown(e)
                                                                    }}
                                                                    value={item.value}
                                                                    name={item.text}
                                                                    hidden={item.hidden}
                                                                >
                                                                    {item.label}
                                                                </DropdownItem>
                                                            ))
                                                        }
                                                    </DropdownMenu>
                                                </Dropdown>
                                                <Button
                                                    className="icon"
                                                    outline
                                                >
                                                    <p><RefreshIcon /></p>
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={11} xs={11}>
                                                <div className="form-group form-group-sm" style={{ display: "block" }}>
                                                    {
                                                        inputRecord.map((item, row) => {
                                                            return (
                                                                <div key={row}>
                                                                    <Label
                                                                        style={{
                                                                            display: "inline-block",
                                                                            fontWeight: 700,
                                                                            marginBottom: 5,
                                                                            maxWidth: "100%"
                                                                        }}>
                                                                        {item.label}
                                                                    </Label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="number"
                                                                        min={0}
                                                                        max={100000}
                                                                        step={1}
                                                                        onChange={(e) => {
                                                                            handleInput(e)
                                                                        }}
                                                                        name={item.defaultId}
                                                                        defaultValue={item.defaultValue}
                                                                    />
                                                                    <div
                                                                        onClick={() => {
                                                                            handleRemove(row, item.defaultId)
                                                                        }}
                                                                        className="form-control-close-button"
                                                                        style={{ marginTop: -31, marginRight: -35 }}
                                                                    >
                                                                        <CloseIcon color="red" />
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            : ""
                    }
                </div>
            </div>
        </Col>
    )
}