import React from "react";
import { Col, Table } from "reactstrap";
import { staticData } from "./data";

interface Props { }

export const BasketRecords: React.FC<Props> = ({ }) => {
    const { records } = staticData();
    return (
        <Col>
            <h4>Records stats</h4>
            <div className="basket-panel panel-default" style={{ marginBottom: 30 }}>
                <div className="panel-body">
                    <Table striped>
                        <tbody>
                            {
                                records.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{item.label}</td>
                                            <td>{item.value}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </Col>
    )
}