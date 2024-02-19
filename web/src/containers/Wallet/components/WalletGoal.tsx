import BeachIcon from "mdi-react/BeachIcon";
import React from "react";
import { Row, Card, CardBody } from "reactstrap";

interface Props { }

export const WalletGoal: React.FC<Props> = () => {
    return (
        <Row>
            <Card>
                <CardBody>
                    <h5 className="bold-text wallet-title">Goal</h5>
                    <h4 style={{ padding: 10, fontWeight: "bold" }}>Retirement<span style={{ marginLeft: 5 }}><BeachIcon /></span></h4>
                </CardBody>
            </Card>
        </Row>
    )
}