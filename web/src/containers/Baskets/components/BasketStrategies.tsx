import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Row, Table, Spinner, Button, ButtonToolbar } from "reactstrap";

import DeleteIcon from "mdi-react/DeleteIcon";
import FileEditIcon from "mdi-react/FileEditIcon";
import FileIcon from "mdi-react/FileIcon";
import { Line } from "react-chartjs-2";
import moment from "moment";

import useBaskets from "../../../services/graphQL/Baskets/useBaskets";
import { BasketModal } from "./BasketModal";
import actionBaskets from "./actionBaskets";
import { ContextDesign } from "../../../hooks/context/Context";

export const BasketStrategies: React.FC = ({}) => {
    const history = useHistory();
    const { designDispatch } = useContext(ContextDesign);
    const [modal, setModal] = useState(false);

    const { dataStrategies, loadingStrategies, dataTrash, loadingTrash } = useBaskets();
    const { handleMove, handleTrash } = actionBaskets();

    const toggle = () => setModal(!modal);

    const MsgStrategies = () => (
        <p>
            The basket is empty. Generate strategies by using the <Link to="/strategies/generate">Generator</Link>
        </p>
    );

    const count_trash = !loadingTrash && dataTrash.getTrash.strategies.length;

    return (
        <Col>
            <Row>
                <Col sm={10}>
                    <h4>Strategies</h4>
                </Col>
                <Col sm={2}>
                    <h4 className="basket--label-trash" onClick={toggle}>
                        Trash {`(${count_trash})`}{" "}
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <div>
                        {loadingStrategies ? (
                            <MsgStrategies />
                        ) : !loadingStrategies && dataStrategies.getStrategies.strategy.length > 0 ? (
                            ""
                        ) : (
                            <MsgStrategies />
                        )}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    {loadingStrategies ? (
                        <Col sm={12} md={{ size: 6, offset: 3 }} className="loading-spinner">
                            <Spinner color="primary" />
                        </Col>
                    ) : !loadingStrategies ? (
                        dataStrategies.getStrategies.strategy.map((item, key) => {
                            const { marketData, balance_chart, timestamp } = item.editor_json;
                            const timeArray = [];
                            const valueArray = [];

                            if (typeof balance_chart === "object") {
                                balance_chart.forEach((data) => timeArray.push(data.time));
                                balance_chart.forEach((data) => valueArray.push(data.value));
                            }

                            const data = {
                                labels: timeArray,
                                datasets: [
                                    {
                                        borderWidth: 2,
                                        label: "Value",
                                        fill: false,
                                        lineTension: 0.3,
                                        backgroundColor: "#4BC0C0",
                                        borderColor: "#4BC0C0",
                                        pointBackgroundColor: "#4BC0C0",
                                        pointHoverRadius: 4,
                                        pointHoverBorderWidth: 1,
                                        pointRadius: 0,
                                        pointHitRadius: 10,
                                        data: valueArray,
                                    },
                                ],
                            };

                            const options = {
                                maintainAspectRatio: true,
                                legend: {
                                    display: false,
                                },
                                scales: {
                                    xAxes: [
                                        {
                                            gridLines: {
                                                color: "rgb(204, 204, 204)",
                                                borderDash: [3, 3],
                                                display: false,
                                                drawTicks: false,
                                                offsetGridLines: true,
                                            },
                                            ticks: {
                                                display: false,
                                                fontColor: "rgb(204, 204, 204)",
                                            },
                                        },
                                    ],
                                    yAxes: [
                                        {
                                            position: "right",
                                            gridLines: {
                                                color: "rgb(204, 204, 204)",
                                                borderDash: [3, 3],
                                                offsetGridLines: true,
                                            },
                                            ticks: {
                                                fontColor: "#616060",
                                            },
                                        },
                                    ],
                                },
                            };

                            return (
                                <div className="basket-panel panel-default" style={{ marginBottom: 20 }} key={key}>
                                    <div className="panel-body">
                                        <Row>
                                            <Col sm={6}>
                                                <label>
                                                    {marketData?.name + " " + marketData?.interval.label},{" "}
                                                    {moment(item.original_created_date).format("YYYY-MM-DD h:mm:ss a")}
                                                </label>
                                            </Col>
                                            <Col sm={6}>
                                                <ButtonToolbar style={{ float: "right" }}>
                                                    <Button
                                                        onClick={() => {
                                                            handleMove(item.id);
                                                        }}
                                                        size="sm"
                                                        color="success"
                                                    >
                                                        <p>
                                                            <FileIcon />
                                                            Paper Trade
                                                        </p>
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            designDispatch({
                                                                type: "SET_MARKET_STRATEGY",
                                                                strategyId: item.id,
                                                            });
                                                            history.push("/strategies/design");
                                                        }}
                                                        size="sm"
                                                        color="primary"
                                                    >
                                                        <p>
                                                            <FileEditIcon />
                                                            Edit
                                                        </p>
                                                    </Button>
                                                    <Button
                                                        className="icon"
                                                        onClick={() => {
                                                            handleTrash(item.id);
                                                        }}
                                                        size="sm"
                                                        color="danger"
                                                    >
                                                        <p>
                                                            <DeleteIcon />
                                                            Delete
                                                        </p>
                                                    </Button>
                                                </ButtonToolbar>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={6}>
                                                <Line key={timestamp} type="scatter" data={data} options={options} />
                                            </Col>
                                            <Col sm={6}>
                                                <Table striped>
                                                    <tbody>
                                                        <tr>
                                                            <td>Net Profit</td>
                                                            <td>{item.net_profit}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Profit per day</td>
                                                            <td>{item.profit_per_day}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Max drawdown</td>
                                                            <td>{item.max_drawdown_number}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Return / drawdown</td>
                                                            <td>{item.return_drawdown}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Count of trades</td>
                                                            <td>{item.count_of_trades}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        ""
                    )}
                </Col>
            </Row>
            <BasketModal toggle={toggle} modal={modal} />
        </Col>
    );
};
