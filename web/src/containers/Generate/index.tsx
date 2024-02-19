import React from "react";
import { Container, Col, Row } from "reactstrap";
import { GenerateCard } from "./components/GenerateCard";

export const GeneratePage: React.FC = () => {
    return (
        <Container className="dashboard">
            <Col>
                <Row>
                    <GenerateCard />
                </Row>
            </Col>
        </Container>
    )
}