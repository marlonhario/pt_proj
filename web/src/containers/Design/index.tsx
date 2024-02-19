import React from "react"
import { Col, Container, Row } from "reactstrap"
import { DesignCard } from "./components/DesignCard"
import "./components/index.scss"

export const DesignPage: React.FC = () => {
  return (
    <Container className="dashboard">
      <Col>
        <Row>
          <DesignCard />
        </Row>
      </Col>
    </Container>
  )
}