import React from "react";
import { Col } from "reactstrap";

interface Props {
    title: string;
    subtitle: string;
    tableClass: string;
}

export const ProfileTable: React.FC<Props> = ({ title, subtitle, tableClass }) => {
    return (
        <Col md={12}>
            <div className={tableClass}>
                <h5 className="bold-text profile__name">{title}</h5>
                <h5 className="profile__work">{subtitle}</h5>
            </div>
        </Col>
    )
};