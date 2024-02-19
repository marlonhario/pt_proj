import React, { useContext } from "react";
import { Col, Card, CardBody } from "reactstrap";
import { TableTitle, TableTitleText } from "../DesignTable";

import CogIcon from "mdi-react/CogIcon";
import { staticData } from "../data";
import { ContextDesign } from "../../../../hooks/context/Context";
import { DesignBackTestTable } from "./DesignBackTestTable";
import { DesignBackTestDnD } from "./DesignBackTestDnD";
import { DesignBalanceChart } from "../balancechart/DesignBalanceChart";

export const DesignBackTest: React.FC = () => {
    const { designState, designDispatch } = useContext(ContextDesign);
    const { backMarketData } = staticData();

    return (
        <>
            <Col md={12}>
                <Card>
                    <CardBody style={{ padding: 0 }}>
                        <TableTitle>
                            <TableTitleText>
                                BackTest Result
                                <CogIcon
                                    className="cog-icon"
                                    onClick={() => {
                                        designDispatch({
                                            type: "SET_TOGGLE_BACKTEST_RESULLT",
                                            toggleBackTestResult: !designState.toggleBackTestResult,
                                        });
                                    }}
                                />
                            </TableTitleText>
                        </TableTitle>
                        {designState.toggleBackTestResult ? (
                            <DesignBackTestDnD data={backMarketData} />
                        ) : (
                            <DesignBackTestTable data={designState.backmarketData} />
                        )}
                    </CardBody>
                </Card>
            </Col>
            <Col className="balanceChart" md={12} lg={12} xl={12}>
                <Card>
                    <CardBody style={{ padding: 0 }}>
                        <div className="card__title">
                            <h5 className="bold-text">Balance chart</h5>
                        </div>
                        <DesignBalanceChart />
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};
