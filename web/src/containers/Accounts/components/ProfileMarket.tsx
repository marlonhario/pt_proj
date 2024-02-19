import React, { ComponentType } from "react";
import { CardBody, Card, Col, Table, Progress } from "reactstrap";
import { MdiReactIconProps } from "mdi-react";

interface DataTypes {
    name: string;
    value: number;
    color: string;
}

interface Props {
    resouces: DataTypes[];
    title: string;
}

export const ProfileMarket: React.FC<Props> = ({ resouces, title }) => {
    return (
        <Col md={12} xs={12}>
            <Card>
                <CardBody>
                    <h4 className="bold-text profile__market_title">{title}</h4>
                    <Table>
                        {
                            resouces.map((item) => {
                                return (
                                    <tr>
                                        <td>
                                            <Progress multi style={{ width: 100 }}>
                                                <Progress bar value={item.value} style={{ backgroundColor: item.color }}>
                                                    <span className="profile__progress_name">{item.name}</span>
                                                    <span className="profile__progress_value">{item.value + "%"}</span>
                                                </Progress>
                                            </Progress>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </Table>
                </CardBody>
            </Card>
        </Col >
    )
}