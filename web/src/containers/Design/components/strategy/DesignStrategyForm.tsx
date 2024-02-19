import React, { useContext, useState } from "react"
import { Button, Card, CardBody, CardHeader, FormGroup, Input, Label } from "reactstrap"

import { ContextDesign } from "../../../../hooks/context/Context"

export const DesignStrategyForm: React.FC = () => {
  const { designState, designDispatch } = useContext(ContextDesign)
  const { strategyProperties } = designState

  const [strategy, setStrategy] = useState(strategyProperties)

  const handleUpdate = (e) => {
    let value = e.target.value

    if (!isNaN(Number(value))) {
      value = Number(value)
    }

    setStrategy({
      ...strategy,
      [e.target.name]: value,
    })
  }

  const handleSubmit = () => {
    designDispatch({
      type: "UPDATE_STRATEGIY_PROPERTIES",
      strategyProperties: strategy
    })
  }

  return (
    <Card style={{ minHeight: 300, backgroundColor: "#337ab7" }}>
      <CardHeader>
        <p
          style={{
            fontWeight: "bold",
            fontFamily: "sans-serif",
            fontSize: 14,
            color: "white"
          }}
        >
          Strategy Form
        </p>
      </CardHeader>
      <CardBody>
        <FormGroup>
          <Label for={`entryLots`}>Trade value(USD)</Label>
          <Input
            type="number"
            name="entryLots"
            value={strategy.entryLots}
            onChange={handleUpdate}
          />
        </FormGroup>
        <FormGroup>
          <Label for={``}>Stop loss</Label>
          <Input
            name="stopLoss"
            type="select"
            onChange={handleUpdate}
            value={strategy.stopLoss}
          >
            <option value="Not used">Not used</option>
            <option value="Fixed">Fixed</option>
            <option value="Trailing">Trailing</option>
          </Input>
        </FormGroup>
        {strategy?.stopLoss !== "Not used" && (
          <FormGroup>
            <Label for={``}>Stop Loss (percentage)</Label>
            <Input
              type="number"
              name="lossPips"
              value={strategy.lossPips}
              onChange={handleUpdate}
            />
          </FormGroup>
        )}
        <FormGroup>
          <Label for={``}>Take Profit</Label>
          <Input
            type="select"
            name="takeProfit"
            onChange={handleUpdate}
            value={strategy.takeProfit}
          >
            <option value="Not used">Not used</option>
            <option value="Fixed">Fixed</option>
          </Input>
        </FormGroup>
        {strategy?.takeProfit !== "Not used" && (
          <FormGroup>
            <Label for={``}>Take Profit (percentage)</Label>
            <Input
              type="number"
              onChange={handleUpdate}
              name="profitPips"
              value={strategy.profitPips}
            />
          </FormGroup>
        )}
        <FormGroup
          style={{ float: "right" }}
        >
          <Button
            color="primary"
            onClick={handleSubmit}
          >
            Confirm
          </Button>
          <Button
            color="danger"
            onClick={() => {
              designDispatch({
                type: "SET_STRATEGY_TOGGLE",
                isStrategyOpen: !designState.isStrategyOpen
              })
            }}
          >
            Cancel
          </Button>
        </FormGroup>
      </CardBody>
    </Card>
  )
}