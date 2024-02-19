import React from 'react';
import { Col, Container } from 'reactstrap';

import { ProfileCard } from './components/ProfileCard';

interface Props { }

export const AccountPage: React.FC<Props> = (props) => {
    let markerTable = [
        {
            name: "Web Technology",
            value: 75,
            color: "#0000FF"
        },
        {
            name: "Mobile Application",
            value: 75,
            color: "#00CC00"
        },
        {
            name: "Photography",
            value: 80,
            color: "#00CCCC"
        },
        {
            name: "Server Administration",
            value: 97,
            color: "#FF8000"
        },
    ];

    let transferTable = [
        {
            name: "Communication",
            value: 75,
            color: "#0000FF"
        },
        {
            name: "Team Work",
            value: 80,
            color: "#00CC00"
        },
        {
            name: "LeaderShip",
            value: 97,
            color: "#00CCCC"
        },
        {
            name: "Time Management",
            value: 70,
            color: "#FF8000"
        },
    ];

    return (
        <Container className="dashboard">
            <Col>
                <div className="profile">
                    <ProfileCard
                        market={markerTable}
                        transfer={transferTable}
                    />
                </div>
            </Col>
        </Container>
    )
};
