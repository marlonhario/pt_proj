import React from "react";
import { Link } from "react-router-dom";
import { Row, Card, CardBody, Button, Col, Progress } from "reactstrap";
import ArrowRightBoldBoxIcon from "mdi-react/ArrowRightBoldBoxIcon";

interface Props { }

export const WalletPortfolio: React.FC<Props> = () => {
    return (
        <Row>
            <Card>
                <CardBody>
                    <Row>
                        <Col>
                            <h5 className="bold-text wallet-title">Portfolio</h5>
                            <Progress multi className="progress">
                                <Progress bar style={{ backgroundColor: "#006666" }} value="90">90%</Progress>
                                <Progress bar style={{ backgroundColor: "#C0C0C0" }} value="10">10%</Progress>
                            </Progress>
                            <div>
                                <span className="bold-text wallet-title" style={{ float: "left" }}>Equity</span>
                                <span className="bold-text wallet-title" style={{ float: "right" }}>Fixed income</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{ paddingTop: 40, display: "flex" }}>
                                <Col>
                                    <h5 className="bold-text wallet-title">Theme</h5>
                                    <h5 className="bold-text">Standard</h5>
                                </Col>
                                <Col>
                                    <Button style={{ borderRadius: 20 }}>Change</Button>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{ paddingTop: 10, display: "flex" }}>
                                <Col>
                                    <h5 className="bold-text wallet-title">Risk level</h5>
                                    <h5 className="bold-text">10 (Growth)</h5>
                                </Col>
                                <Col>
                                    <Button style={{ borderRadius: 20 }}>Change</Button>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Link to="" style={{ color: "orange", paddingLeft: 25, fontSize: "1.1em" }} className="bold-text">View holdings<ArrowRightBoldBoxIcon /></Link>
                    </Row>
                </CardBody>
            </Card>
        </Row>
    )
}