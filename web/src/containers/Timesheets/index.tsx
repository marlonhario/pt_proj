import React from "react";
import { Col, Container, Row } from "reactstrap";
import { TimesheetsCard } from "./components/TimesheetsCard";
import { useMeQuery } from "../../generated/graphql";
import { Redirect } from "react-router-dom";

interface Props {}

const TimesheetsPage: React.FC<Props> = () => {
  const { data } = useMeQuery();
  return data?.me ? (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">Timesheets</h3>
        </Col>
      </Row>
      <Row>
        <TimesheetsCard />
      </Row>
    </Container>
  ) : (
    <Redirect to="/pages" />
  );
};

export default TimesheetsPage;
