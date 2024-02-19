import React from "react";
import { Row, Card, CardBody } from "reactstrap";

interface Props { }

export const WalletDeposit: React.FC<Props> = () => {
    return (
        <Row>
            <Card>
                <CardBody>
                    <h5 className="bold-text wallet-title">Deposit insights</h5>
                    <h4 style={{ padding: 10, fontWeight: "bold" }}>You have no deposits in August.</h4>
                    <ul>
                        <li>Auto-deposits inactive</li>
                    </ul>
                </CardBody>
            </Card>
        </Row>
    )
}