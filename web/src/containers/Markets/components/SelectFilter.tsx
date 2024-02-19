import React from "react";
import { FormGroup, Label, Input, Row, Col } from "reactstrap";

export const SelectFilter = ({ selectedRow, search }) => {
  return (
    <Row>
      <Col xs={12} lg={3}>
        <FormGroup>
          <Label>Intervals</Label>
          <Input
            type="select"
            defaultValue={"15min"}
            value={selectedRow?.interval}
            onChange={(e) => {
              let value = e.target.value;
              search({
                ...selectedRow,
                interval: value,
              });
            }}
          >
            <option value="1min">1 min</option>
            <option value="5min">5 min</option>
            <option value="15min">15 min</option>
            <option value="30min">30 min</option>
            <option value="60min">60 min</option>
            {/* <option value="1day">1 Day</option> */}
          </Input>
        </FormGroup>
      </Col>
    </Row>
  );
};
