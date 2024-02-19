import React from "react";
import { Col, Container, Row } from "reactstrap";
import { List } from "./components/List";

interface Props { }

export const HelperPage: React.FC<Props> = () => (
    <Container>
        <Row>
            <Col md={12}>
                <h1 className="">Dates Helper</h1>
            </Col>
        </Row>
        <Row>
            <List />
        </Row>
    </Container>
)