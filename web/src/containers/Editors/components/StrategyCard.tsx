import React from "react";
import { Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

export const StrategyCard = ({
  isStrategyOpen,
  strategyToggle,
  strategyProperties,
}) => {
  let {
    entryLots,
    stopLoss,
    lossPips,
    takeProfit,
    profitPips,
  } = strategyProperties;
  return (
    <Col>
      <Card
        body
        style={{ backgroundColor: "#c4be90", padding: "1.25rem" }}
        onClick={() => {
          if (!isStrategyOpen) {
            strategyToggle();
          }
        }}
      >
        <CardTitle>
          <h5 className="bold-text">Strategy Properties</h5>
        </CardTitle>
        <CardText>
          Trading size {entryLots} &nbsp;
          {(() => {
            if (stopLoss === "Fixed") {
              return "Fixed ";
            } else if (stopLoss === "Trailing") {
              return "Trailing ";
            } else {
              return "";
            }
          })()}
          Stop Loss -{" "}
          {(() => {
            if (stopLoss === "Not used") {
              return "none";
            } else {
              return lossPips;
            }
          })()}
          , Take Profit - {takeProfit}
        </CardText>
      </Card>
    </Col>
  );
};
