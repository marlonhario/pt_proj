import React from "react";
import { Redirect } from 'react-router-dom'
import { Col, Container, Row } from "reactstrap";
import { UsersCard } from "./components/UsersCard";
import { useMeQuery } from '../../generated/graphql';

interface Props { }

export const UserPage: React.FC<Props> = () => {
    const { data } = useMeQuery();

    return data?.me?.admin ? (

        <Container>
            <Row>
                <Col md={12}>
                    <h3 className="page-title">Users List</h3>
                </Col>
            </Row>
            <Row>
                <UsersCard />
            </Row>
        </Container>
    ) : (
            <Redirect to="/pages" />
        )
}