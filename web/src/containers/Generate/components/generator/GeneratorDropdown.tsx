import React, { useState } from "react"
import { Col, Row, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button } from "reactstrap"

import RefreshIcon from "mdi-react/RefreshIcon"
import PlusIcon from "mdi-react/PlusIcon"

interface Props {
  title: string
  subTitle: string
  data: any
  handleChange: any
  handleRefresh: any
  some: any
}

export const GeneratorDropdown: React.FC<Props> = ({ title, subTitle, data, handleChange, handleRefresh, some }) => {
  const [dropdown, setDropdown] = useState<boolean>(false)

  return (
    <>
      <Row>
        <p
          style={{
            fontWeight: 700,
            maxWidth: "100%",
            fontSize: 16
          }}
        >{title}</p>
      </Row>
      <Row>
        <Col sm={12}>
          <Row style={{ float: "right" }}>
            <Dropdown
              isOpen={dropdown}
              toggle={() => {
                setDropdown(!dropdown)
              }}
            >
              <DropdownToggle
                style={{ backgroundColor: "white" }}
                caret
              >
                <PlusIcon /> {subTitle}
              </DropdownToggle>
              <DropdownMenu
                modifiers={{
                  setMaxHeight: {
                    enabled: true,
                    order: 890,
                    fn: (data) => {
                      return {
                        ...data,
                        styles: {
                          ...data.styles,
                          overflow: 'auto',
                          maxHeight: '200px',
                        },
                      };
                    },
                  },
                }}
              >
                {
                  data.map((item: any, key: number) => {
                    if (some.some((s: any) => s.text === item.text)) {
                      return false
                    }

                    return (
                      <DropdownItem
                        key={key}
                        onClick={handleChange}
                        value={item.value}
                        name={item.text}
                      >
                        {item.label}
                      </DropdownItem>
                    )
                  })
                }
              </DropdownMenu>
            </Dropdown>
            <Button
              className="icon"
              outline
              onClick={handleRefresh}
            >
              <p><RefreshIcon /></p>
            </Button>
          </Row>
        </Col>
      </Row>
    </>
  )
}