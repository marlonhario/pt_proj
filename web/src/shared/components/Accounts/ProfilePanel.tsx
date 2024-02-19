import React from "react";
import { Col, Row } from "reactstrap";

interface Props {
    md?: number;
    lg?: number;
    sm?: number;
    xl?: number;
    xs?: number;
    title: string;
    label: string;
    classname?: string;
}

export const ProfilePanel: React.FC<Props> = ({ md = 0, lg = 0, sm = 0, xl = 0, xs = 0, classname, title, label }) => (
    <Col md={md} className={classname}>
        <Row>
            <p className="bold-text">{title}</p>
        </Row>
        <Row>
            <p>{label}</p>
        </Row>
    </Col >
)