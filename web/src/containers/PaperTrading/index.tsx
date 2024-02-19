import React from "react";
import { Col, Card, CardBody } from "reactstrap";
import PaperTrading from "./components/PaperTrading";

import "./style/index.scss";
export const PaperTradingPage: React.FC = () => {
  return (
    <Col>
      <Card>
        <CardBody>
          <PaperTrading />
        </CardBody>
      </Card>
    </Col>
  );
};
