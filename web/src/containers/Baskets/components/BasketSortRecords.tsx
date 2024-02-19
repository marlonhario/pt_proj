import React from "react"
import { Col, Label } from "reactstrap"
import Select from 'react-select'
import { staticData } from "./data"
import actionBaskets from "./actionBaskets"

export const BasketSortRecords: React.FC = ({ }) => {
    const { collection } = staticData()
    const { handleSorting } = actionBaskets()

    return (
        <Col>
            <h4>Sort Records</h4>
            <div className="basket-panel panel-default" style={{ marginBottom: 30 }}>
                <div className="panel-body">
                    <Col style={{ paddingBottom: 20 }}>
                        <Label
                            style={{
                                display: "inline-block",
                                fontWeight: 700,
                                marginBottom: 5,
                                maxWidth: "100%"
                            }}>
                            Sort collection by
                        </Label>
                        <Select
                            options={collection}
                            defaultValue={{ label: "Net Balance", value: 'net_balance' }}
                            onChange={handleSorting}
                        />
                    </Col>
                </div>
            </div>
        </Col>
    )
}