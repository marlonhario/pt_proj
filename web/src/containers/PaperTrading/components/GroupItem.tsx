import React from "react";
import { Col, Row } from "reactstrap";
import { useInput, InputProvider } from "../hooks/useInput";

let getCount = (arr, key) => {
  let totalItems = arr.length;

  return totalItems;
};

let getSummation = (arr, key) => {
  let totalItems = arr.length;
  let value = 0;

  arr.forEach((item) => {
    if (item[key] !== undefined && item[key] !== null) {
      value += item[key];
    }
  });
  if (totalItems === 1) {
    return arr[0][key];
  }
  let result = value;

  let cleanResult = isNaN(result) ? 0 : result;

  return cleanResult;
};

let getMax = (arr, key) => {
  let max = Math.max(arr.map((item) => item[key]));

  let result = max;

  let cleanResult = isNaN(result) ? 0 : result;

  if (arr.length === 1) {
    return arr[0][key];
  }
  return cleanResult;
};

let getAverage = (arr, key) => {
  let totalItems = arr.length;
  let value = 0;

  arr.forEach((item) => {
    if (item[key] !== undefined && item[key] !== null) {
      value += item[key];
    }
  });

  let result = value / totalItems;

  let cleanResult = isNaN(result) ? 0 : result;

  if (totalItems === 1) {
    return arr[0][key] ? arr[0][key] : "N/A";
  }
  return cleanResult;
};

let NameEditableCell = ({ saveToDB, onChangeName, node }) => {
  let { inputValue, toggle, isEditable, setInputValue } = useInput();
  let inputRef = React.useRef(null);

  React.useEffect(() => {
    if (toggle) {
      inputRef.current && inputRef.current.focus();
    }
  }, [toggle]);
  if (isEditable) {
    return (
      <div style={{ cursor: "pointer" }}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={(e) => {
            toggle();
            onChangeName(inputValue, node);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              inputRef.current.blur();
            }
            if (e.key === "Escape") {
              toggle();
            }
          }}
        />
        <span
          style={{ marginLeft: "5px", width: 50, cursor: "pointer" }}
          className="lnr lnr-magic-wand"
        ></span>
      </div>
    );
  }
  return (
    <div style={{ cursor: "pointer" }} onClick={() => toggle()}>
      {inputValue}
      <span
        style={{ marginLeft: "5px", width: 50, cursor: "pointer" }}
        className="lnr lnr-magic-wand"
      ></span>
    </div>
  );
};
export const GroupItem = ({ node, items, saveToDB, onChangeName }) => {
  let newItems = items.map((item) => {
    return { ...item.editor_json, ...item };
  });
  return (
    <div>
      <Row>
        <Col style={{ margin: "auto" }}>
          <InputProvider
            defaultValue={{ title: node.title, group_name: node.group_name }}
          >
            <NameEditableCell
              node={node}
              saveToDB={saveToDB}
              onChangeName={onChangeName}
            />
          </InputProvider>
          <h4 className="subhead">Name</h4>
        </Col>
        <Col style={{ margin: "auto" }}>
          <div>
            {/* {renderEditorKeys("marketData", "symbol", items.map(item => node.editor_json))} */}
            Items: {getCount(newItems, "symbol")}
          </div>
          <h4 className="subhead">Total count</h4>
        </Col>
        <Col style={{ margin: "auto" }}>
          <div>{getSummation(newItems, "net_profit")}</div>
          <h4 className="subhead">Net Profit</h4>
        </Col>
        <Col style={{ margin: "auto" }}>
          <div className="paper-trading__text paper-trading__text--red">
            {getAverage(newItems, "cumul_return")}
          </div>
          <h4 className="subhead paper-trading__text paper-trading__text--yellow">
            Annualized Return
          </h4>
        </Col>
        <Col style={{ margin: "auto" }}>
          <div
            className={`paper-trading__text ${
              getMax(newItems, "max_drawdown_number") < 0.15
                ? "paper-trading__text--green"
                : ""
            }`}
          >
            {getMax(newItems, "max_drawdown_number")}
          </div>
          <h4 className="subhead paper-trading__text paper-trading__text--yellow">
            Max Drawdown
          </h4>
        </Col>
        <Col style={{ margin: "auto" }}>
          {getAverage(newItems, "count_of_trades")}
          <h4 className="subhead">Count of Trades</h4>
        </Col>
        <Col style={{ margin: "auto" }}>
          <div>{0}</div>
          <h4 className="subhead">Win Trades</h4>
        </Col>
        <Col style={{ margin: "auto" }}>
          <div
            className={`subhead paper-trading__text ${
              getAverage(newItems, "profit_factor") >= 1.6
                ? "paper-trading__text--green"
                : ""
            }`}
          >
            {getAverage(newItems, "profit_factor")}
          </div>
          <h4 className="subhead">Profit Factor</h4>
        </Col>
        <Col style={{ margin: "auto" }}>
          <div>{getAverage(newItems, "mounths_of_profit")}</div>
          <h4 className="subhead">Win Months</h4>
        </Col>
        <Col style={{ margin: "auto" }}>
          <div>
            {" "}
            <img src="https://via.placeholder.com/150/"></img>
          </div>
          <h4 className="subhead">Balance</h4>
        </Col>
      </Row>
    </div>
  );
};
