import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

import UserAddIcon from 'mdi-react/UserIcon';
import PhoneIcon from 'mdi-react/PhoneIcon';
import LocationIcon from 'mdi-react/LocationIcon';
import EmailIcon from 'mdi-react/EmailIcon';
import CalendarIcon from 'mdi-react/CalendarIcon';
import FlagIcon from 'mdi-react/FlagIcon';

import { ProfileMarket } from "./ProfileMarket";
import { ProfileImage } from "./ProfileImage";
import { useMeQuery } from "../../../generated/graphql";
import { ProfileIcon } from "./ProfileIcon";
import { ProfileText } from "./ProfileText";
import { ProfileSocial } from "./ProfileSocial";
import { ProfileDescription } from "./ProfileDescription";

interface MarketTypes {
    name: string;
    value: number;
    color: string;
}

interface TransferTypes {
    name: string;
    value: number;
    color: string;
}

interface Props {
    market: MarketTypes[];
    transfer: TransferTypes[];
}

export const ProfileCard: React.FC<Props> = ({ market, transfer }) => {
    const { data, loading } = useMeQuery();

    let is_email: string = '';
    let is_first: string = '';
    let is_last: string = '';
    let profile: string = '';

    if (loading) {
        is_email = '';
    } else if ((data && data.me?.email)
        || (data && data.me?.first_name)
        || (data && data.me?.last_name)
        || (data && data.me?.profile_image)) {
        is_email = data.me.email;
        is_first = data.me.first_name;
        is_last = data.me.last_name;

        let pic = data.me.profile_image;
        if (pic) {
            profile = process.env.REACT_APP_HOST + '/images/' + pic;
        }
    }

    let is_name: string = '';
    if (is_first || is_last) {
        is_name = is_first + " " + is_last;
    }

    return (
        <Col>
            <Card>
                <CardBody>
                    <Col>
                        <div className="profile_section">
                            <h4>About Me</h4>
                        </div>
                    </Col>
                    <Row>
                        <Col sm={3}>
                            {
                                profile ? (
                                    <ProfileImage
                                        profile={profile}
                                    />
                                ) : (
                                        <ProfileImage
                                            profile={`${process.env.REACT_APP_PUBLIC_URL}` + '/img/default.jpg'}
                                        />
                                    )
                            }
                            <h3 className="profile__job_title" style={{ color: "#07cb79" }}>UX / UI Developer</h3>
                        </Col>
                        <Col sm={9}>
                            <Row>
                                <Col sm={6} style={{ marginBottom: 28 }}>
                                    <ProfileIcon
                                        Icon={UserAddIcon}
                                    />
                                    <ProfileText
                                        title="Name"
                                        subtitle={is_name}
                                    />
                                </Col>
                                <Col sm={6} style={{ marginBottom: 28 }}>
                                    <ProfileIcon
                                        Icon={EmailIcon}
                                    />
                                    <ProfileText
                                        title="Email"
                                        subtitle={is_email}
                                    />
                                </Col>
                                <Col sm={6} style={{ marginBottom: 28 }}>
                                    <ProfileIcon
                                        Icon={PhoneIcon}
                                    />
                                    <ProfileText
                                        title="Phone"
                                        subtitle="1234567890"
                                    />
                                </Col>
                                <Col sm={6} style={{ marginBottom: 28 }}>
                                    <ProfileIcon
                                        Icon={CalendarIcon}
                                    />
                                    <ProfileText
                                        title="Date Of Birthday"
                                        subtitle="September 29, 2000"
                                    />
                                </Col>
                                <Col sm={6} style={{ marginBottom: 28 }}>
                                    <ProfileIcon
                                        Icon={LocationIcon}
                                    />
                                    <ProfileText
                                        title="Address"
                                        subtitle="Country of Nation"
                                    />
                                </Col>
                                <Col sm={6} style={{ marginBottom: 28 }}>
                                    <ProfileIcon
                                        Icon={FlagIcon}
                                    />
                                    <ProfileText
                                        title="Nationality"
                                        subtitle="British"
                                    />
                                </Col>
                                <ProfileSocial />
                                <ProfileDescription />
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
                <CardBody>
                    <Row>
                        <Col>
                            <div className="profile_section">
                                <h4>Skills</h4>
                            </div>
                            <Row>
                                <Col md={6}>
                                    <ProfileMarket title="Marketable Skills" resouces={market} />
                                </Col>
                                <Col md={6}>
                                    <ProfileMarket title="Transferable Skills" resouces={transfer} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    )
}