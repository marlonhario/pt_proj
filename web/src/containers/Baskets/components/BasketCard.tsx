import React from "react";
import { Col, Row } from "reactstrap";

import { BasketCorrelation } from "./BasketCorrelation";
import { BasketRecords } from "./BasketRecords";
import { BasketFilter } from "./BasketFilter";
import { BasketSortRecords } from "./BasketSortRecords";
import { BasketHeader } from "./BasketHeader";
import { BasketStrategies } from "./BasketStrategies";

export const BasketCard: React.FC = ({ }) => {
    return (
        <Col>
            <Row>
                <BasketHeader />
            </Row>
            <Row>
                <Col sm={4} className="basket-form">
                    <BasketSortRecords />
                    <BasketFilter />
                    <BasketCorrelation />
                    <BasketRecords />
                </Col>
                <Col sm={8} className="basket-form">
                    <BasketStrategies />
                </Col>
            </Row>
        </Col>
    )
}