import React from "react";
import { Col } from "reactstrap";

interface Props { }

export const ProfileDescription: React.FC<Props> = () => {
    return (
        <Col sm={12}>
            <p>
                I have more than 10 years of experience in the field of Graphic Design ,
                Web Design, Web Development and Mobile Application. Specialized in Adobe web & graphic designing
                tools and also in others tools. Professional in Corporate branding, Graphic designing, Web Designing,
                visualization, GUI, graphics & animations for e-learning, illustrations, web icons, flash web banner,
                flash intro animations, logos, brochures, posters etc.
            </p>
            <p>
                My objectives are increasing my knowledge in computer science fields and new technologies especially,
                web development and web Design field. Always looking forward to learn new technologies and be a part
                of a huge change in the world.
            </p>
            <p>
                <span>Yours sincerely,</span>
            </p>
        </Col>
    )
}