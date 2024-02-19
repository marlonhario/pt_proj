import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

interface Props { }

export const MobilePage: React.FC<Props> = () => {
    return (
        <Col md={12}>
            <Row>
                <Col md={12} xs={12}>
                    <Card>
                        <CardBody>
                            <h3 className="page-title profile__center_content">Mobile Test</h3>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Col>
    )
}