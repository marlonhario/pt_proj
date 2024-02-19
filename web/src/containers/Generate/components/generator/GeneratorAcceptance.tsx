import React from "react"
import { Col, Label, Row } from "reactstrap"
import CloseIcon from "mdi-react/CloseIcon"

interface Props {
  data: any
  handleOnChange: any
  handleOnDelete: any
}

interface Item {
  label: string
  text: string
  value: number
}

export const GeneratorAcceptance: React.FC<Props> = ({ data, handleOnChange, handleOnDelete }) => {
  return (
    <Col sm={12} md={12} xs={12} style={{ textAlign: "right" }} >
      {
        data.map((item: Item, key: number) => {
          if (item) {
            return (
              <Row key={key}>
                <Col md={7} xs={7} xl={7}>
                  <Label
                    style={{
                      display: "inline-block",
                      fontWeight: 700,
                      maxWidth: "100%",
                      padding: 8
                    }}>
                    {item.label}
                  </Label>
                </Col>
                <Col md={5} xs={5} xl={5} sm={5}>
                  <Row>
                    <Col md={10} xs={10}>
                      <input
                        className="form-control"
                        type="number"
                        min={0}
                        max={100000}
                        step={1}
                        onChange={handleOnChange}
                        name={item.text}
                        value={item.value}
                      />
                    </Col>
                    <CloseIcon
                      color="red"
                      style={{ marginTop: 7 }}
                      onClick={() => {
                        handleOnDelete(item.text)
                      }}
                    />
                  </Row>
                </Col>
              </Row>
            )
          }
        })
      }
    </Col>
  )
}