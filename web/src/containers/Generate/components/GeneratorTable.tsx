import React from "react";
import { Col, Table } from "reactstrap";

interface Data {
    label: string;
    value: string;
}
interface Props {
    title: string;
    table: Data[];
    display: boolean;
}

export const GeneratorTable: React.FC<Props> = ({ title, table, display }) => {
    return (
        <Col style={{ marginBottom: 20, display: display ? 'block' : 'none' }}>
            <h4 style={{ marginBottom: 10 }}>{title}</h4>
            <Table bordered striped>
                <tbody>
                    {
                        table.map((item, key) => {
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
        </Col>
    )
}