import React from "react";
import { Col } from "reactstrap";

import FacebookIcon from "mdi-react/FacebookIcon";
import GooglePlusIcon from "mdi-react/GooglePlusIcon";
import LinkedinIcon from "mdi-react/LinkedinIcon";
import PinterestIcon from "mdi-react/PinterestIcon";
import TwitterIcon from "mdi-react/TwitterIcon";


export const ProfileSocial: React.FC = () => {
    return (
        <Col sm={12} className="profile__social">
            <span>Social Profiles</span>
            <a href="#" title="Facebook"><FacebookIcon /></a>
            <a href="#" title="Twitter"><TwitterIcon /></a>
            <a href="#" title="Linkedin"><LinkedinIcon /></a>
            <a href="#" title="Pinterest"><PinterestIcon /></a>
            <a href="#" title="Google"><GooglePlusIcon /></a>
        </Col>
    )
}