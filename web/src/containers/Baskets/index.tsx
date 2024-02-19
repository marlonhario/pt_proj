import React from "react"
import { Col, Row, Container } from "reactstrap"
import { BasketCard } from "./components/BasketCard"
export const BasketPage: React.FC = () => {

    return (
        <Container className="dashboard">
            <Col>
                <Row>
                    <BasketCard />
                </Row>
            </Col>
        </Container>
    )
}