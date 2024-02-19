import React from "react"
import { Col, Card, CardBody, Row, Table } from "reactstrap"
import { useMeQuery } from "../../../generated/graphql";
import { DateHelper } from "../../../services/helper/dateFunction";

interface Props { }

export const List: React.FC<Props> = () => {
    const { data, loading } = useMeQuery();

    let zone: string = '';
    if (loading) {
        zone = '';
    } else if (data && data.me?.time_zone) {
        zone = data.me.time_zone
    }

    const {
        fDate,
        fUtc,
        fUtcFormat,
        utc } = DateHelper(zone);

    const listMoment = [
        {
            label: 'Browser time zone:',
            value: fDate
        },
        {
            label: 'Profile time zone:',
            value: fUtc
        },
        {
            label: 'Utc time zone:',
            value: utc.format()
        },
        {
            label: 'Profile time zone with format:',
            value: fUtcFormat
        },
    ];

    return (
        <Col md={12} style={{ marginTop: 20 }}>
            <ul>
                <li>Import DateHelper from <span style={{ color: "red" }}>web/src/services/helper/dateFunction</span></li>
            </ul>
            <hr />
            <Col>
                {
                    listMoment.map((item, key) => {
                        return (
                            <Col key={key}>
                                <Row>
                                    <Col>
                                        <h2>{item.label}</h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ padding: 15 }}>
                                        <h4>{item.value}</h4>
                                    </Col>
                                </Row>
                                <hr />
                            </Col>
                        )
                    })
                }
            </Col>
        </Col>
    )
}