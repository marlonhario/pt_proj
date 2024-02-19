import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, Badge, Spinner } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const BackTesting: React.FC = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [statistics, setStatistics] = useState({
        barCount: 0,
        expectency: 0,
        finalCapital: 0,
        growth: 0,
        maxDrawdown: 0,
        maxDrawdownPct: 0,
        maxRiskPct: 0,
        percentProfitable: 0,
        profit: 0,
        profitFactor: 0,
        profitPct: 0,
        returnOnAccount: 0,
        rmultipleStdDev: 0,
        startingCapital: 0,
        systemQuality: 0,
        totalTrades: 0,
    });

    const [showNoData, setShowNoData] = useState({ display: "block" });
    const [btsGraph, setBtsGraph] = useState({
        equityCurve: "",
        equityCurvePct: "",
        drawDown: "",
        drawDownPct: "",
    });

    const [startingCapital, setStartingCapital] = useState("10000");
    const [stopLoss, setStopLoss] = useState("5");
    const [showGraph, setShowGraph] = useState({ display: "none" });
    const [showSpinner, setShowSpinner] = useState({ display: "none" });
    const [disabledSubmit, setDisableBtn] = useState(false);
    const [noDataText, setNoDataText] = useState("No Data to show. Please choose your testing criteria, and press the analyze button.");

    let requestAnalysis = () => {
        let capital = startingCapital;
        let stopVal = stopLoss;

        setShowSpinner({ display: "inline-block" });
        setNoDataText("Processing Request. Please wait.");
        setDisableBtn(true);

        axios.get(`${process.env.REACT_APP_HOST}/request-back-testing?capital=${capital}&stoploss=${stopVal}`).then((response) => {
            //let datasource = response.data;
            //setStatistics(datasource.data.statistics);
            //setBtsGraph(datasource.data.images);
            setShowNoData({ display: "none" });
            setShowGraph({ display: "block" });
            setShowSpinner({ display: "none" });
            setDisableBtn(false);
        });
    };

    return (
        <Col md={12} lg={12}>
            <Row className="bts-row-parent">
                <Row lg={12} className="bts-row bts-row-top">
                    <Col lg={12}>
                        <Form inline={true}>
                            <FormGroup className="bts-formgroup">
                                <Label for="startDate">Date Range</Label>
                                <DatePicker
                                    id="startDate"
                                    selected={startDate}
                                    onChange={(date) => {
                                        setStartDate(date);
                                    }}
                                    className="bts-datepicker react-datepicker-margin"
                                />
                                &nbsp;
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => {
                                        setEndDate(date);
                                    }}
                                    className="bts-datepicker"
                                />
                            </FormGroup>
                            <FormGroup className="bts-formgroup-select">
                                <Label for="bt-indicator">Indicator & Trading Signal</Label>
                                <Input type="select" name="select" id="bt-indicator">
                                    <option>Moving Average</option>
                                </Input>
                            </FormGroup>
                            <FormGroup className="bts-formgroup-select">
                                <Label for="capital">Starting Capital</Label>
                                <Input
                                    id="capital"
                                    type="text"
                                    name="capital"
                                    value={startingCapital}
                                    onChange={(e: any) => {
                                        setStartingCapital(e.target.value);
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className="bts-formgroup bts-stoploss-holder">
                                <Label for="bts-stoploss">Stop Loss (%)</Label>
                                <Input
                                    type="text"
                                    name="stoploss"
                                    id="bts-stoploss"
                                    value={stopLoss}
                                    onChange={(e: any) => {
                                        setStopLoss(e.target.value);
                                    }}
                                />
                            </FormGroup>
                            <Button className="bts-analyze-btn" color="primary" onClick={requestAnalysis} disabled={disabledSubmit}>
                                Analyze
                            </Button>
                            <Spinner className="bts-top-spinner" color="primary" style={showSpinner} />
                        </Form>
                    </Col>
                </Row>
                <Row lg={12} className="bts-row">
                    <Col lg={3} className="bts-result">
                        <ListGroup>
                            <ListGroupItem className="justify-content-between">
                                Starting Capital <Badge pill>{statistics.startingCapital}</Badge>
                            </ListGroupItem>
                            <ListGroupItem className="justify-content-between">
                                Final Capital <Badge pill>{statistics.finalCapital}</Badge>
                            </ListGroupItem>
                            <ListGroupItem className="justify-content-between">
                                Profit <Badge pill>{statistics.profit}</Badge>
                            </ListGroupItem>
                            <ListGroupItem className="justify-content-between">
                                Growth <Badge pill>{statistics.growth}</Badge>
                            </ListGroupItem>
                            <ListGroupItem className="justify-content-between">
                                Total Trades <Badge pill>{statistics.totalTrades}</Badge>
                            </ListGroupItem>
                            <ListGroupItem className="justify-content-between">
                                Bar Count <Badge pill>{statistics.barCount}</Badge>
                            </ListGroupItem>
                            <ListGroupItem className="justify-content-between">
                                Max Draw Down <Badge pill>{statistics.maxDrawdown}</Badge>
                            </ListGroupItem>
                            <ListGroupItem className="justify-content-between">
                                Max Draw Down % <Badge pill>{statistics.maxDrawdownPct}</Badge>
                            </ListGroupItem>
                            <ListGroupItem className="justify-content-between">
                                Max Risk % <Badge pill>{statistics.maxRiskPct}</Badge>
                            </ListGroupItem>
                            <ListGroupItem className="justify-content-between">
                                Expectency <Badge pill>{statistics.expectency}</Badge>
                            </ListGroupItem>
                            <ListGroupItem className="justify-content-between">
                                R Multi SD <Badge pill>{statistics.rmultipleStdDev}</Badge>
                            </ListGroupItem>
                            <ListGroupItem className="justify-content-between">
                                Sytem Quality <Badge pill>{statistics.systemQuality}</Badge>
                            </ListGroupItem>
                            <ListGroupItem className="justify-content-between">
                                Profit Factor <Badge pill>{statistics.profitFactor}</Badge>
                            </ListGroupItem>
                            <ListGroupItem className="justify-content-between">
                                % Profitable <Badge pill>{statistics.percentProfitable}</Badge>
                            </ListGroupItem>
                            <ListGroupItem className="justify-content-between">
                                Return on Acct <Badge pill>{statistics.returnOnAccount}</Badge>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col lg={9} className="bts-graph">
                        <div className="bts-graph-image" style={showGraph}>
                            <div className="bts-graph-image-label">Equity Curve</div>
                            <img src={btsGraph.equityCurve} />
                        </div>
                        <div className="bts-graph-image" style={showGraph}>
                            <div className="bts-graph-image-label">Equity Curve Percentage</div>
                            <img src={btsGraph.equityCurvePct} />
                        </div>
                        <div className="bts-graph-image" style={showGraph}>
                            <div className="bts-graph-image-label">Draw Down</div>
                            <img src={btsGraph.drawDown} />
                        </div>
                        <div className="bts-graph-image" style={showGraph}>
                            <div className="bts-graph-image-label">Draw Down Percentage</div>
                            <img src={btsGraph.drawDownPct} />
                        </div>
                        <div className="bts-graph-no-data" style={showNoData}>
                            <Spinner className="bts-top-spinner-2" color="primary" style={showSpinner} />
                            <br style={showSpinner} />
                            {noDataText}
                        </div>
                    </Col>
                </Row>
            </Row>
        </Col>
    );
};

export default BackTesting;
