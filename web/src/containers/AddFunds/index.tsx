import React from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  Modal,
  ModalBody,
  TabContent,
  TabPane,
} from "reactstrap";
import { Navs, AddFundsTab, WithdrawFundsTab, SearchBank } from "./components";
import { MainProps } from "./helpers";
import { EmailContent } from "./components";

const AddFunds = ({
  navProps,
  addFundsTabProps,
  searchBankProps,
  addFundsProps,
}: MainProps) => {
  return (
    <div className="AddFunds__container">
      <Modal
        isOpen={addFundsProps.modal}
        toggle={searchBankProps.toggle}
        className="AddFunds__modal "
      >
        <ModalBody>
          <Row>
            <Col md={12} lg={12} xl={12}>
              <Card className="AddFunds__card-container">
                <CardBody className="AddFunds__card-body main">
                  <div className="tabs tabs--justify tabs--bordered-bottom">
                    <div className="tabs__wrap">
                      <Navs {...navProps} />
                      <button
                        className="close"
                        onClick={searchBankProps.toggle}
                      >
                        &times;
                      </button>
                      <TabContent activeTab={navProps.activeTab}>
                        <TabPane tabId="1">
                          <AddFundsTab {...addFundsTabProps} />
                        </TabPane>
                        <TabPane tabId="2">
                          <WithdrawFundsTab />
                        </TabPane>
                      </TabContent>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <SearchBank {...searchBankProps} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddFunds;
