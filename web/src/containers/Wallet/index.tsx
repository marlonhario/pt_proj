import React from "react";
import { Col, Container, Row } from "reactstrap";
import { WalletCard } from "./components/WalletCard";

export const WalletPage: React.FC = () => {
    return (
        <Container>
            <Col>
                <Row>
                    <WalletCard />
                </Row>
            </Col>
        </Container>
    )
}