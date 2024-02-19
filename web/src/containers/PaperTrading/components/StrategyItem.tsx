import React from "react";
import { Col, Row } from "reactstrap";

let renderEditorKeys = (parentKey, childKey, editor) => {
  if (editor?.[parentKey]?.[childKey]) {
    let keyValue = editor[parentKey][childKey];
    return keyValue;
  }
  return "N/A";
};

export const StrategyItem = ({ node }) => {
  return (
    <div>
      <Row>
        <Col style={{ margin: "auto" }}>
          <div>
            {renderEditorKeys("marketData", "symbol", node.editor_json)}
          </div>
          <h4 className="subhead">Symbol</h4>
        </Col>
        <Col style={{ margin: "auto" }}>
          <div>{node.net_profit}</div>
          <h4 className="subhead">Net Profit</h4>
        </Col>
        <Col style={{ margin: "auto" }}>
          <div className="paper-trading__text paper-trading__text--red">
            {node.cumul_return === null ? "N/A" : node.cumul_return}
          </div>
          <h4 className="subhead paper-trading__text paper-trading__text--yellow">
            Cumul Return
          </h4>
        </Col>
        <Col style={{ margin: "auto" }}>
          <div className="paper-trading__text paper-trading__text--red">
            {node.max_drawdown_number === null
              ? "N/A"
              : node.max_drawdown_number}
          </div>
          <h4 className="subhead paper-trading__text paper-trading__text--yellow">
            Max Drawdown
          </h4>
        </Col>
        <Col style={{ margin: "auto" }}>
          <div>{node.count_of_trades}</div>
          <h4 className="subhead">Count of Trades</h4>
        </Col>
        <Col style={{ margin: "auto" }}>
          <div>{0}</div>
          <h4 className="subhead">Win Trades</h4>
        </Col>
        <Col style={{ margin: "auto" }}>
          <div>{node.profit_factor}</div>
          <h4 className="subhead">Profit Factor</h4>
        </Col>
        <Col style={{ margin: "auto" }}>
          <div>{node.months_of_profit}</div>
          <h4 className="subhead">Win Months</h4>
        </Col>
        <Col style={{ margin: "auto" }}>
          <div>
            <img src="https://via.placeholder.com/150/"></img>
          </div>
          <h4 className="subhead">Balance</h4>
        </Col>
      </Row>
    </div>
  );
};
