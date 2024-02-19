import React from 'react';
import {
    Button,
    Col,
    Row,
    Card,
    CardBody,
    InputGroup, InputGroupAddon,
    Form, FormGroup, Label, Input
} from "reactstrap";
import { FaRegQuestionCircle } from "react-icons/fa";

const WithdrawFundsPane = () => {
    return (
        <Col md={12} lg={12} xl={12}>
            <Row>
                <Col md={7} lg={7} xl={7}>
                    <Card className="AddFunds__card form">
                        <CardBody>
                            <Form className="AddFunds__form">
                                <FormGroup>
                                    <Label for="fromField">From</Label>
                                    <Input type="select" name="from" id="fromField">
                                        <option>Cash - $0.00</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="toField">To</Label>
                                    <Input type="select" name="to" id="toField">
                                        <option>Personal checking (Coast Capital Savings)</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="reasonField">Reason for withdrawal</Label>
                                    <Input type="select" name="reason" id="reasonField">
                                        <option>Starting my own business</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="amountField">Amount</Label>
                                    <InputGroup id="amountField">
                                        <InputGroupAddon className="AddFunds__amount" addonType="prepend">
                                            $
                                        </InputGroupAddon>
                                        <Input placeholder="0.00" min={0} type="number" step="1" />
                                    </InputGroup>
                                </FormGroup>
                                <Row>
                                    <Col md={12} lg={12} className="AddFunds__note">
                                        <h4 className="subhead">You have&nbsp;</h4>
                                        <h3 className="subhead"><b>&nbsp;$0.00&nbsp;</b></h3>
                                        <h4 className="subhead"> available to withdraw from your cash.&nbsp;</h4>
                                        <h4 className="subhead"><FaRegQuestionCircle size={24} /></h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} lg={12} className="AddFunds__full-withdrawal">
                                        <p>This will be a full withdrawal</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} lg={12} className="AddFunds__frequency">
                                        <h4 className="subhead">Frequency</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} lg={6}>
                                        <FormGroup>
                                            <Input type="select" name="reason">
                                                <option>As soon as possible</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6} lg={6}>
                                        <h4 className="AddFunds__note second subhead">
                                            Your funds should be deposited into your account within
                                            1-2 business days after making a withdrawal request. In
                                            rare cases, withdrawals may take up to 5 business days.
                                            </h4>
                                    </Col>
                                </Row>
                                <Button className="AddFunds__submit withdrawal rounded" color="warning" size="sm">
                                    Set withdrawal
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={5} lg={5} xl={5}>
                    <Card className="AddFunds__total">
                        <CardBody>
                            <div className="typography--inline">
                                <h3 className="subhead">Total current withdrawal</h3>
                                <h1><span>$</span>0.00</h1>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Col>
    )
}

export default WithdrawFundsPane