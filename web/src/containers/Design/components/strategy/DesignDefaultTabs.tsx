import React, { useContext, useState } from "react";
import { Card, CardBody, Col, Nav, NavItem, NavLink, TabContent, TabPane, Button } from "reactstrap";
import classnames from "classnames";
import PlusIcon from "mdi-react/PlusIcon";
import { ContextDesign } from "../../../../hooks/context/Context";
import { DesignEntryCard } from "./DesignEntryCard";
import { ActionDesign } from "../actionDesign";

interface Props {
    exit?: boolean;
    longList: any;
    shortList: any;
    setOpenIndicator: any;
}

export const DesignDefaultTabs: React.FC<Props> = ({ exit, longList, shortList, setOpenIndicator }) => {
    const { designDispatch } = useContext(ContextDesign);

    const { selectIndicator } = ActionDesign();
    const [activeTab, setActiveTab] = useState("1");

    const toggle = (tab: string) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    return (
        <Col xs={12} style={{ padding: 0 }}>
            <Card>
                <CardBody>
                    <div className="tabs">
                        <div className="tabs__wrap">
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === "1" })}
                                        onClick={() => {
                                            toggle("1");
                                        }}
                                    >
                                        Long {exit ? "Exit" : "Entry"}
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === "2" })}
                                        onClick={() => {
                                            toggle("2");
                                        }}
                                    >
                                        Short {exit ? "Exit" : "Entry"}
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    {longList?.map((item, index) => (
                                        <DesignEntryCard
                                            key={index}
                                            id={item.id}
                                            item={item}
                                            name={item.identification}
                                            subName={item.signal}
                                            exit={exit}
                                            selectIndicator={selectIndicator}
                                            setOpenIndicator={setOpenIndicator}
                                        />
                                    ))}
                                    <div className="d-flex justify-content-center mt-1">
                                        <Button
                                            className="icon"
                                            outline
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setOpenIndicator(true);

                                                designDispatch({
                                                    type: "SET_TOGGLE_LONG_ENTRY_RULES",
                                                    isLongEntryRules: !exit ? true : false,
                                                    selectedIndicatorData: {},
                                                });
                                            }}
                                        >
                                            <p>
                                                <PlusIcon /> Add a new {exit ? "Exit" : "Entry"} rule
                                            </p>
                                        </Button>
                                    </div>
                                </TabPane>
                                <TabPane tabId="2">
                                    {shortList?.map((item, index) => (
                                        <DesignEntryCard
                                            key={index}
                                            item={item}
                                            id={item.id}
                                            name={item.identification}
                                            subName={item.signal}
                                            exit={exit}
                                            selectIndicator={selectIndicator}
                                            color="#aeaeae"
                                            setOpenIndicator={setOpenIndicator}
                                        />
                                    ))}
                                </TabPane>
                            </TabContent>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};
