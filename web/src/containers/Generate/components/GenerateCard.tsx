import React from "react";
import { Col, Row } from "reactstrap";

import { GenerateHeader } from "./GenerateHeader";
import { GenerateStrategies } from "./GenerateStrategies";

interface Props { }

export const GenerateCard: React.FC<Props> = ({ }) => {
    return (
        <Col>
            <Row>
                <GenerateHeader />
            </Row>
            <Row>
                <GenerateStrategies />
            </Row>
        </Col>
    )
}