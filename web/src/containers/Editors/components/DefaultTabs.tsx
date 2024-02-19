import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
} from "reactstrap";
import classnames from "classnames";

import { EntryCard } from "./EntryCard";
// import { withTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';
import { useIndicatorFormStore } from "./store";
import PlusIcon from "mdi-react/PlusIcon";
interface Props {
  longEntryList: EntryItem[];
  shortEntryList: EntryItem[];
  isExit?: boolean;
  toggleLongEntryRules: any;
  deleteItem: any;
  selectIndicator: any;
}

interface EntryItem {
  identification: string;
  signal: string;
  id: string;
  item: any;
}

export const DefaultTabs: React.FC<Props> = ({
  longEntryList,
  shortEntryList,
  isExit = false,
  toggleLongEntryRules,
  deleteItem,
  selectIndicator,
}) => {
  let [activeTab, setActiveTab] = useState("1");
  let isIndicatorOpen = useIndicatorFormStore((state) => state.isIndicatorOpen);
  let openIndicatorForm = useIndicatorFormStore(
    (state) => state.openIndicatorForm
  );
  //console.log("indicatorOpen", isIndicatorOpen);
  let toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <Col xs={12}>
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
                    Long {isExit ? "Exit" : "Entry"}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Short {isExit ? "Exit" : "Entry"}
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  {longEntryList.map((item) => (
                    <EntryCard
                      item={item}
                      id={item.id}
                      name={item.identification}
                      subName={item.signal}
                      isExit={isExit}
                      deleteItem={deleteItem}
                      selectIndicator={selectIndicator}
                    />
                  ))}
                  <div className="d-flex justify-content-center mt-1">
                    <Button
                      className="icon"
                      outline
                      onClick={() => {
                        selectIndicator({});
                        openIndicatorForm();
                        if (isExit) {
                          toggleLongEntryRules(false);
                        } else {
                          toggleLongEntryRules(true);
                        }
                      }}
                    >
                      <p>
                        <PlusIcon /> Add a new {isExit ? "Exit" : "Entry"} rule
                      </p>
                    </Button>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  {shortEntryList.map((item) => (
                    <EntryCard
                      color="#aeaeae"
                      item={item}
                      id={item.id}
                      name={item.identification}
                      subName={item.signal}
                      isExit={isExit}
                      deleteItem={deleteItem}
                      selectIndicator={selectIndicator}
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
  // }
};

export default DefaultTabs;
