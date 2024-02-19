import React from "react";

export const LoginHeader: React.FC = () => {
    return (
        <div className="account__head">
            <h3 className="account__title">
                Welcome to
                <span className="account__logo">
                    {" "}
                    Prosper Together v2020.08.12 8:49pm
                    <span className="account__logo-accent"></span>
                </span>
            </h3>
            <h4 className="account__subhead subhead">Sign In</h4>
        </div>
    );
};
