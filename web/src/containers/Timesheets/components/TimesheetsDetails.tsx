import React from "react";
import { Table, Row, Col, Card, CardBody } from 'reactstrap';
import moment from "moment";
import { convertTime, convertDecimal } from "../utils/timesheetsUtils";

interface Props {
    resource: any;
}

export const TimesheetsDetails: React.FC<Props> = ({ resource }) => {
    const data = resource.employees.read().data;
    const listDate = resource.employees.read().listDate;
    const total_hours = resource.employees.read().total;

    if (!data) {
        return (
            <Row>
                <Col md={4} sm={4}>
                    <Card className="grid">
                        <h5>No results found.</h5>
                    </Card>
                </Col>
            </Row>
        )
    }

    const name = data.map((v: any, i: number) => {
        let arr: any = [];

        data[i].map((value: any) => {
            if (value.id !== 224944) {
                arr.push(value.name);
            }
        })

        return Array.from(new Set(arr));
    });

    var merged = [].concat.apply([], name);

    const unique_name = Array.from(new Set(merged));

    return (
        <div className="App">
            <Table responsive className="table--bordered">
                <thead>
                    <tr>
                        <th style={{ fontWeight: 'bold' }}>Date</th>
                        {
                            unique_name.map((value, index) => {
                                return <th key={index}>{value}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((v: any, i: number) => {
                            let date = moment(listDate[i]).format('dddd MMMM DD, YYYY')
                            return (
                                <tr key={i}>
                                    <td>{date}</td>
                                    {
                                        v.map((value: any, index: number) => {
                                            let time = convertTime(value.desktimeTime);
                                            if (value.id !== 224944) {
                                                return (
                                                    <td key={index}>{time}</td>
                                                )
                                            }
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                    <tr>
                        <td style={{ fontWeight: 'bold' }}>Total </td>
                        {
                            total_hours.map((value: any, index: number) => {
                                let time = convertTime(value);
                                let hours = convertDecimal(value);
                                let total = time + `(${hours})`
                                return (
                                    <td key={index} style={{ fontWeight: 'bold' }}>{total}</td>
                                )
                            })
                        }
                    </tr>
                </tbody>
            </Table>
        </div >
    );
}