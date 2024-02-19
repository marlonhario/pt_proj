import React, { useContext, useState } from "react";
import { Col, Row, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import classnames from "classnames";

import { DesignBody } from "./DesignBody";
import { DesignHeader } from "./DesignHeader";
import { ContextDesign } from "../../../hooks/context/Context";
import { ActionDesign } from "./actionDesign";

export const DesignCard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("1");
    const { designState } = useContext(ContextDesign);
    const { handleAddStrategy, handleNewStrategy } = ActionDesign();

    const journalColumns = [
        {
            name: "ID",
            selector: "id",
            sortable: true,
        },
        {
            name: "Time",
            selector: "date",
            sortable: true,
        },
        {
            name: "Type",
            selector: "type",
            sortable: false,
        },
        {
            name: "Position",
            selector: "position",
            sortable: false,
        },
        {
            name: "Amount",
            selector: "amount",
            sortable: true,
        },
        {
            name: "Price",
            selector: "price",
            sortable: true,
        },
        {
            name: "Stop Loss",
            selector: "stopLoss",
            sortable: false,
        },
        {
            name: "Take Profit",
            selector: "takeProfit",
            sortable: false,
        },
        {
            name: "Profit",
            selector: "profit",
            sortable: true,
        },
        {
            name: "Balance",
            selector: "balance",
            sortable: true,
        },
    ];

    const getTradeOnStorage = () => {
        let storedTrade = sessionStorage.getItem("tradeJournal");
        let trades = [];

        if (storedTrade !== "" && storedTrade !== null && storedTrade !== undefined) {
            trades = JSON.parse(storedTrade);
        }

        return trades;
    };

    return (
        <Col>
            <Row>
                <DesignHeader />
            </Row>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <div className="tabs tabs--bordered-top">
                                <div className="tabs__wrap">
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === "1" })}
                                                onClick={() => {
                                                    setActiveTab("1");
                                                }}
                                            >
                                                Editor
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === "2" })}
                                                onClick={() => {
                                                    setActiveTab("2");

                                                    //PT-279 Trade Journal
                                                }}
                                            >
                                                Trades
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1">
                                            {/* <Col>
                        <Row>
                          <Col md={2}>
                            <Button
                              className="icon"
                              block
                              onClick={handleAddStrategy}
                              color="primary"
                            >
                              {designState.strategyId
                                ? "Update strategy in basket"
                                : "Add strategy to basket"}
                            </Button>
                          </Col>
                          <Col md={2}>
                            <Button
                              className="icon"
                              block
                              onClick={handleNewStrategy}
                              color="danger"
                            >
                              New Strategy
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Row>
                          <DesignBody />
                        </Row>
                      </Col> */}
                                            <Col>
                                                <Row>
                                                    <DesignBody />
                                                </Row>
                                            </Col>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <DataTable
                                                title="Trade Journal"
                                                data={getTradeOnStorage()}
                                                columns={journalColumns}
                                                pagination={true}
                                                paginationTotalRows={getTradeOnStorage().length}
                                            />
                                        </TabPane>
                                    </TabContent>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Col>
    );
};
