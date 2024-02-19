import React, { useContext } from "react"
import { Card, Col, CardTitle, CardText } from "reactstrap"

import { ContextDesign } from "../../../../hooks/context/Context"

export const DesignStrategyCard: React.FC = () => {
  const { designState, designDispatch } = useContext(ContextDesign)
  const { strategyProperties: { entryLots, stopLoss, lossPips, takeProfit }, isStrategyOpen } = designState

  return (
    <Card
      body
      style={{ backgroundColor: "#c4be90", padding: "1.25rem" }}
      onClick={() => {
        if (!isStrategyOpen) {
          designDispatch({
            type: "SET_STRATEGY_TOGGLE",
            isStrategyOpen: !isStrategyOpen
          })
        }
      }}
    >
      <CardTitle>
        <h5 className="bold-text">Strategy Properties</h5>
      </CardTitle>
      <CardText>
        <>Trading size {entryLots}</>
        <br />
        <>
          {(() => {
            if (stopLoss === "Fixed") {
              return "Fixed "
            } else if (stopLoss === "Trailing") {
              return "Trailing "
            } else {
              return ""
            }
          })()}
            Stop Loss -{" "}
          {(() => {
            if (stopLoss === "Not used") {
              return "none"
            } else {
              return lossPips
            }
          })()}
            , Take Profit - {takeProfit}
        </>
      </CardText>
    </Card>
  )
}