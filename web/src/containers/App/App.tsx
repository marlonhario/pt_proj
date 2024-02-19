import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../../scss/app.scss";
import { Routes } from "../../routers/Routes";
import ScrollToTop from "./ScrollToTop";
import ContextProvider from "../../context/Context";
import { setAccessToken } from "../../accessToken";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AlpacaProvider } from "../../context/Broker/Alpaca";
import { RootProdiver } from "../../hooks/main/rootReducer";

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST}/refresh_token`, {
            method: "POST",
            credentials: "include",
        })
            .then(async (x) => {
                const { accessToken } = await x.json();
                setAccessToken(accessToken);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className={`load${loading ? "" : " loaded"}`}>
                <div className="load__icon-wrap">
                    <svg className="load__icon">
                        <path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <ScrollToTop>
                <>
                    <div>
                        <RootProdiver>
                            <ContextProvider>
                                <AlpacaProvider>
                                    <Routes />
                                    <ToastContainer />
                                </AlpacaProvider>
                            </ContextProvider>
                        </RootProdiver>
                    </div>
                </>
            </ScrollToTop>
        </BrowserRouter>
    );
};

export default App;
