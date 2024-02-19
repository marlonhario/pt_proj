import React from "react";

import { Link } from "react-router-dom";
import FacebookIcon from "mdi-react/FacebookIcon";
import GooglePlusIcon from "mdi-react/GooglePlusIcon";

export const LoginFooter: React.FC = () => {
    return (
        <div className="account__social">
            <Link className="account__social-btn account__social-btn--facebook" to="/pages/one">
                <FacebookIcon />
            </Link>
            <Link className="account__social-btn account__social-btn--google" to="/pages/one">
                <GooglePlusIcon />
            </Link>
        </div>
    );
};
