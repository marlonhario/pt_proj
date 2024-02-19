import React, { useState, useEffect } from "react";
import {
  FormGroup,
  Input,
  Label,
  CardBody,
  CardTitle,
  Card,
  CardHeader,
  Button,
} from "reactstrap";

export const StrategyForm = ({
  data,
  updateStrategy,
  strategyToggle,
  isStrategyOpen,
}) => {
  let [strategy, setStrategy] = useState(data);

  let onUpdateData = (e) => {
    console.log(e.target.name);
    let value = e.target.value;

    if (!isNaN(Number(value))) {
      value = Number(value);
    }

    setStrategy({
      ...strategy,
      [e.target.name]: value,
    });

    console.log("value strategy", strategy);
  };

  let onSubmit = () => {
    updateStrategy(strategy);
  };

  if (Object.keys(strategy).length === 0) {
    return <>Loading...</>;
  }
  return (
    <Card style={{ minHeight: 300, backgroundColor: "#337ab7" }}>
      <CardHeader>Strategy Form</CardHeader>
      <CardBody>
        <FormGroup>
          <Label for={`entryLots`}>Trade value(USD)</Label>
          <Input
            type="number"
            name="entryLots"
            onChange={onUpdateData}
            value={strategy.entryLots}
            // placeholder="with a placeholder"
          />
        </FormGroup>

        <FormGroup>
          <Label for={``}>Stop loss</Label>
          <Input
            name="stopLoss"
            type="select"
            onChange={onUpdateData}
            value={strategy.stopLoss}
            // placeholder="with a placeholder"
          >
            <option value="Not used">Not used</option>
            <option value="Fixed">Fixed</option>
            <option value="Trailing">Trailing</option>
          </Input>
        </FormGroup>
        {strategy?.stopLoss !== "Not used" && (
          <FormGroup>
            <Label for={``}>Stop Loss (pips)</Label>
            <Input
              type="number"
              name="lossPips"
              value={strategy.lossPips}
              onChange={onUpdateData}
              // placeholder="with a placeholder"
            />
          </FormGroup>
        )}

        <FormGroup>
          <Label for={``}>Take Profit</Label>
          <Input
            type="select"
            name="takeProfit"
            onChange={onUpdateData}
            value={strategy.takeProfit}
            // placeholder="with a placeholder"
          >
            <option value="Not used">Not used</option>
            <option value="Fixed">Fixed</option>
            <option value="Trailing">Trailing</option>
          </Input>
        </FormGroup>
        {strategy?.takeProfit !== "Not used" && (
          <FormGroup>
            <Label for={``}>Take Profit (pips)</Label>
            <Input
              type="number"
              onChange={onUpdateData}
              name="profitPips"
              value={strategy.profitPips}
              // placeholder="with a placeholder"
            />
          </FormGroup>
        )}
        <div>
          <Button
            onClick={() => {
              strategyToggle();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSubmit();
            }}
          >
            Confirm
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
