import React, { useState } from "react";
import { Collapse, Row, Col, Button } from "reactstrap";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";
import ChevronUpIcon from "mdi-react/ChevronUpIcon";

export const WalletCollapse: React.FC = () => {
    const [collapse, setCollapse] = useState(true);

    const [view, setView] = useState({ styleClass: 'closed', icon: <ChevronDownIcon /> });

    const onEntering = () => {
        setView({ styleClass: 'opening', icon: <ChevronDownIcon /> });
    };

    const onEntered = () => {
        setView({ styleClass: 'opened', icon: <ChevronDownIcon /> });
    };

    const onExiting = () => {
        setView({ styleClass: 'closing', icon: <ChevronUpIcon /> });
    };

    const onExited = () => {
        setView({ styleClass: 'closed', icon: <ChevronUpIcon /> });
    };

    const toggle = () => {
        setCollapse(prevState => !prevState);
    };
    return (
        <div style={{ paddingTop: 20 }}>
            <Row>
                <Button
                    className="bold-text wallet_collapse__title wallet_about__btn"
                    onClick={toggle}
                    outline
                >About this graph
                                <span className="wallet_collapse__icon">{view.icon}</span>
                </Button>
            </Row>
            <Collapse
                isOpen={collapse}
                className="collapse__content"
                onEntering={onEntering}
                onEntered={onEntered}
                onExiting={onExiting}
                onExited={onExited}
            >
                <Row>
                    <h4 className="bold-text wallet-title">What can affect your outcome</h4>
                </Row>
                <Row style={{ marginTop: 10 }}>
                    <ul>
                        <li>Deposits: Regular contributions, like auto deposits, are the best way to improve your projection.</li>
                        <li>Risk tolerance: The more risk you take, the wider the range of outcomes will be.</li>
                        <li>Market performance: It's impossible to predict, so you should focus on what you can contrl instead.</li>
                    </ul>
                </Row>
                <Row style={{ marginTop: 10 }}>
                    <h4 className="bold-text wallet-title">How we calculated this graph</h4>
                </Row>
                <Row style={{ marginTop: 10 }}>
                    <Col>
                        <Row>
                            The projection in this graph is based on your upcoming contributions and your account's risk level (assuming a 5.56% rate of return).
                        </Row>
                        <Row>
                            The 'likely' section of the graph has a 50% confidence interval. The 'less likely' sections have a 90% confidence interval.
                        </Row>
                        <Row>
                            The impact of taxes is not included and actual return may differ.
                        </Row>
                    </Col>
                </Row>
            </Collapse>
        </div>
    )
}