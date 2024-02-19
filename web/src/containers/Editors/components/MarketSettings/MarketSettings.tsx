import React from "react";
import {
  Col,
  Card,
  CardBody,
  Table,
  Row,
  Input,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
import SelectFilter from "./components/AsyncSelect";
export const MarketSettings = ({
  children,
  data,
  onUpdateMarketData,
  fetchStockData,
}) => {
  let {
    market,
    interval,
    number_data_records,
    first_data,
    last_data,
    spread,
  } = data;

  let onUpdateMarketInterval = (e) => {
    onUpdateMarketData({
      interval: e.target.value,
    });
  };

  let onUpdateMarket = (value) => {
    console.log("update market", value);
    onUpdateMarketData({
      market: value,
    });
    fetchStockData(value.symbol, interval);
  };

  let onUpdateSpread = (e) => {
    onUpdateMarketData({
      spread: Number(e.target.value),
    });
  };

  console.log("datadata", data);
  return (
    <Col sm={12}>
      <Card>
        <CardBody>
          {children}
          <Row>
            <Col sm={12} lg={3}>
              Market
            </Col>
            <Col sm={12} lg={9}>
              <SelectFilter
                marketValue={data}
                onUpdateMarket={onUpdateMarket}
              />
            </Col>
          </Row>

          <Row>
            <Col sm={12} lg={{ size: 3 }}>
              Market Interval
            </Col>
            <Col sm={12} lg={{ size: 3, offset: 6 }}>
              {/* <FormGroup> */}
              <Input
                type="select"
                value={interval}
                onChange={onUpdateMarketInterval}
              >
                <option value="1min">M1</option>
                <option value="5min">M5</option>
                <option value="15min">M15</option>
                <option value="30min">M30</option>
                <option value="60min">H1</option>
              </Input>
              {/* </FormGroup> */}
            </Col>
            {/* <Col sm={12} lg={{ size: 3 }}>
              <FormGroup>
                <Button
                  onClick={(e) => {
                    fetchStockData(market.symbol, interval);
                  }}
                >
                  Refresh
                </Button>
              </FormGroup>
            </Col> */}
          </Row>

          <Table striped responsive>
            <tbody>
              <tr>
                <td>Count of bars</td>
                <td>{number_data_records}</td>
              </tr>
              <tr>
                <td>Data start</td>
                <td>{first_data}</td>
              </tr>
              <tr>
                <td>Data end</td>
                <td>{last_data}</td>
              </tr>
              <tr>
                <td>Spread</td>
                <td>
                  <Input
                    type="number"
                    defaultValue={spread}
                    value={spread}
                    onChange={onUpdateSpread}
                  />
                  {spread} points
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};
