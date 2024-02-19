import React from "react";
import { LoginHeader } from "./components/LoginHeader";
import { LoginCard } from "./components/LoginCard";
import { LoginFooter } from "./components/LoginFooter";

const LogIn = () => (
    <div className="LogIn account">
        <div className="account__wrapper">
            <div className="account__card">
                <LoginHeader />
                <LoginCard />
                <LoginFooter />
            </div>
        </div>
    </div>
);

export default LogIn;
