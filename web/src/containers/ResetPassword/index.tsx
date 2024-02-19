import React from "react";
import { PasswordCard } from "./components/PasswordCard";

interface Props { }

export const PasswordPage: React.FC<Props> = () => {
    return (
        <div className="account account--not-photo">
            <div className="account__wrapper">
                <div className="account__card">
                    <div className="account__head">
                        <h3 className="account__title">Welcome to
                        <span className="account__logo"> Easy
                            <span className="account__logo-accent">DEV</span>
                        </span>
                        </h3>
                        <h4 className="account__subhead subhead">Password reset</h4>
                    </div>
                    <div>
                        <PasswordCard />
                    </div>
                </div>
            </div>
        </div>
    )
}