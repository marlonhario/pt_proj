import React from "react";
import { Table } from "reactstrap";

interface DataTypes {
    name: string;
    value: number;
    visible: boolean;
    targetValue?: number;
    setting?: string;
}

interface DesignBackTestProps {
    data: DataTypes[];
}

export const DesignBackTestTable: React.FC<DesignBackTestProps> = ({ data }) => {
    return (
        <Table striped responsive>
            <tbody>
                {data.map((row, index) => {
                    if (row.targetValue && row.setting && row.visible) {
                        if (row.setting === "LESSER") {
                            if (row.value < row.targetValue) {
                                return (
                                    <tr key={index}>
                                        <td>{row.name}</td>
                                        <td className="marketoutput-green" style={{ textAlign: "center" }}>
                                            {row.value}
                                        </td>
                                    </tr>
                                );
                            } else {
                                return (
                                    <tr key={index}>
                                        <td>{row.name}</td>
                                        <td className="marketoutput-red" style={{ textAlign: "center" }}>
                                            {row.value}
                                        </td>
                                    </tr>
                                );
                            }
                        } else {
                            if (row.value > row.targetValue) {
                                return (
                                    <tr key={index}>
                                        <td>{row.name}</td>
                                        <td className="marketoutput-green" style={{ textAlign: "center" }}>
                                            {row.value}
                                        </td>
                                    </tr>
                                );
                            } else {
                                return (
                                    <tr key={index}>
                                        <td>{row.name}</td>
                                        <td className="marketoutput-red" style={{ textAlign: "center" }}>
                                            {row.value}
                                        </td>
                                    </tr>
                                );
                            }
                        }
                    }

                    if (row.visible) {
                        return (
                            <tr key={index}>
                                <td>{row.name}</td>
                                <td>{row.value}</td>
                            </tr>
                        );
                    }
                    return <tr />;
                })}
            </tbody>
        </Table>
    );
};
