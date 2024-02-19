import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthRoute, PublicRoute, AdminRoute } from "./index";

import LogIn from "../containers/LogIn";
import Register from "../containers/Register";
import Activate from "../containers/Activate";
import EmailConfirmationCard from "../containers/Activate/EmailConfimation";
import MainWrapper from "../containers/App/MainWrapper";
import ExamplePageOne from "../containers/Example/index";
import ExamplePageTwo from "../containers/ExampleTwo/index";
import Layout from "../containers/Layout";

import { useMeQuery } from "../generated/graphql";
import TimesheetsPage from "../containers/Timesheets";
import ChartDemo from "../containers/Charts";
import { EditorPage } from "../containers/Editors";
import Alphavantage from "../containers/Alphavantage";

import { UserPage } from "../containers/Users";
import { AccountPage } from "../containers/Accounts";
import { PasswordPage } from "../containers/ResetPassword";
import { MarketPage } from "../containers/Markets";

import NoMatch from "../containers/404";
import { ProfileUpdateForm } from "../containers/Accounts/components/ProfileUpdateForm";

import BackTesting from "../containers/BackTesting";
import { HelperPage } from "../containers/Helper";
import { MobilePage } from "../containers/Mobile";
import { WalletPage } from "../containers/Wallet";
import { BankActions } from "../containers/Bank/actions";
import { Broker } from "../containers/Broker";
import AddFundsActions from "../containers/AddFunds/actions";

import Indicators from "../containers/Indicators";
import { BasketPage } from "../containers/Baskets";
import { GeneratePage } from "../containers/Generate";
import { MarketDetail } from "../containers/MarketDetail";
import { DraggablePage } from "../containers/Draggable";
import { PaperTradingPage } from "../containers/PaperTrading";
import { BlocklyPage } from "../containers/Blockly";
import { TechnicalIndicator } from "../containers/TechnicalIndicator";
import { Alpaca } from "../containers/Alpaca";
import { useAlpacaAuthorizeMutation } from "../generated/graphql";
import { AlpacaContext } from "../context/Broker/Alpaca";
import { DesignPage } from "../containers/Design";
import { SignalLog } from "../containers/SignalLog";
import { PaperTrades } from "../containers/PaperTrades";
import { RandomStrategies } from "../containers/Generate/components/generator/RandomStrategies";
import { useIndicator } from "../containers/Generate/components/action/useIndicator";
import { ContextGenerateRun } from "../hooks/context/Context";
import { useGenerate } from "../containers/Generate/components/action/useGenerate";

export interface completeInterface {
    text: string;
    label: string;
    value: number;
}

const Pages = () => (
    <Switch>
        <Route path="/pages/one" component={ExamplePageOne} />
        <Route path="/pages/two" component={ExamplePageTwo} />
        <Route path="/pages/timesheets" component={TimesheetsPage} />
        <Route path="/pages/stockcharts-demo" component={ChartDemo} />
        <Route path="/pages/editors" component={EditorPage} />
        <Route path="/pages/alphavantage" component={Alphavantage} />
        <Route path="/pages/email_confirmation" component={EmailConfirmationCard} />
        <Route path="/pages/back-testing" component={BackTesting} />
        <Route path="/pages/markets" component={MarketPage} />
        <Route path="/pages/helper" component={HelperPage} />
        <Route path="/pages/indicator-module" component={Indicators} />
        <Route path="/pages/add-funds" component={AddFundsActions} />
        <Route path="/pages/marketdetail" component={MarketDetail} />
        <Route path="/pages/draggable" component={DraggablePage} />
        <Route path="/pages/brokers" component={Broker} />
        <Route path="/pages/blockly" component={BlocklyPage} />
        <Route path="/pages/alpaca" component={Alpaca} />
        <Route path="/pages/technical-indicator" component={TechnicalIndicator} />
        <Route path="/pages/design" component={EditorPage} />
    </Switch>
);

const Strategies = () => (
    <Switch>
        <Route
            path="/strategies/browse"
            render={() => {
                return <h1>browse</h1>;
            }}
        />
        <Route path="/strategies/generate" component={GeneratePage} />
        <Route path="/strategies/design" component={DesignPage} />
    </Switch>
);

const Accounts = () => (
    <Switch>
        <Route path="/accounts/profile" component={AccountPage} />
        <Route path="/accounts/view" component={ProfileUpdateForm} />
        <Route path="/accounts/wallet" component={WalletPage} />
    </Switch>
);

const Mobile = () => (
    <Switch>
        <Route path="/prospertogether/pages" component={MobilePage} />
    </Switch>
);

const wrappedRoutes = () => (
    <div>
        <Layout />
        <div className="container__wrap">
            <Route path="/pages" component={Pages} />
            <Route path="/strategies" component={Strategies} />

            {/* @todo: Temporary blank for now. */}
            <Route path="/basket" component={BasketPage} />
            <Route path="/paper-trading" component={PaperTradingPage} />
            <Route path="/live-trading" render={() => <h1>Live Trading</h1>} />
            <Route path="/share-strategies" render={() => <h1>Share Strategies</h1>} />

            <Route path="/accounts" component={Accounts} />
            <Route path="/pages/signal-log" component={SignalLog} />
            <Route path="/pages/paper-trades" component={PaperTrades} />
            <Route path="/prospertogether" component={Mobile} />
            <Route path="/users" component={AdminRoutes} />
            <Route path="/banks" component={BankActions} />
        </div>
    </div>
);

const AdminRoutes = () => (
    <Switch>
        <Route exact path="/users/lists" component={UserPage} />
    </Switch>
);

export const Routes: React.FC = (): JSX.Element => {
    const { data, loading } = useMeQuery();
    const alpacaState: any = useContext(AlpacaContext);
    const [alpacaAuthorize] = useAlpacaAuthorizeMutation();
    const { generateRState, generateRunDispatch } = useContext(ContextGenerateRun);
    const { randomEntry, randomExit } = RandomStrategies();
    const { handleAddIndicator } = useIndicator();
    const { saveRandomStrategy } = useGenerate();

    const handleApalcaAuth = async (code) => {
        const response = await alpacaAuthorize({
            variables: { code },
        });
        await alpacaState.addToken(response.data.alpacaAuthorize);
        localStorage.setItem("alpacaToken", response.data.alpacaAuthorize);
    };

    useEffect(() => {
        if (!generateRState.start) {
            return;
        }

        let details = JSON.parse(localStorage.getItem("generate_strategies"));

        let current = generateRState.count;
        let minutes = details.working_mins * 60;
        let timeoutTime = (minutes * 1000) / 100 / 2;

        if (generateRState.progress < 100) {
            let increment = minutes / 100;

            const timeout = setTimeout(() => {
                current += Number(increment.toFixed(1));

                generateRunDispatch({
                    type: "SET_START_COUNT",
                    count: current,
                });

                generateRunDispatch({
                    type: "SET_RANDOM_START",
                    progress: generateRState.progress + 1,
                });
            }, timeoutTime);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [generateRState.progress, generateRState.start]);

    useEffect(() => {
        if (generateRState.progress >= 100) {
            generateRunDispatch({
                type: "SET_START",
                start: false,
            });
            return;
        }
    }, [generateRState.progress]);

    useEffect(() => {
        if (generateRState.start) {
            const timeout = setInterval(() => {
                let generate_data = JSON.parse(localStorage.getItem("generate_strategies"));
                let generate_validation_data = JSON.parse(localStorage.getItem("generate_validation"));

                let { generate_max_entry, generate_max_exit, stockData, marketData, stop_loss, take_profit } = generate_data;
                let { complete_backtest_initial } = generate_validation_data;

                let max_entry: number = generate_max_entry.value;
                let max_exit: number = generate_max_exit.value;

                if (generateRState.progress <= 100) {
                    const entryDetails = randomEntry(max_entry);
                    const exitDetails = randomExit(max_exit);
                    const { entryLong } = entryDetails || {};
                    const { exitLong } = exitDetails || {};

                    if (entryLong?.length > 0 && exitLong?.length > 0) {
                        let results = handleAddIndicator({ entry: entryLong, exit: exitLong }, stockData, []);
                        console.log(results);
                        let rs_minimum_net_profit: completeInterface,
                            rs_minimum_count_of_trades: completeInterface,
                            rs_minimum_profit_per_day: completeInterface,
                            rs_minimum_return_drawdown: completeInterface,
                            rs_maximum_equity_drawdown: completeInterface,
                            rs_passed = false,
                            rs_mnp = true,
                            rs_mppd = true,
                            rs_mct = true,
                            rs_mrd = true,
                            rs_med = true;

                        if (complete_backtest_initial.length <= 0) {
                            rs_passed = true;
                        }

                        rs_minimum_net_profit = complete_backtest_initial.find((item: completeInterface) => item.text === "minimum_net_profit");
                        rs_minimum_profit_per_day = complete_backtest_initial.find(
                            (item: completeInterface) => item.text === "minimum_profit_per_day"
                        );
                        rs_minimum_count_of_trades = complete_backtest_initial.find(
                            (item: completeInterface) => item.text === "minimum_count_of_trades"
                        );
                        rs_minimum_return_drawdown = complete_backtest_initial.find(
                            (item: completeInterface) => item.text === "minimum_return_drawdown"
                        );
                        rs_maximum_equity_drawdown = complete_backtest_initial.find(
                            (item: completeInterface) => item.text === "maximum_equity_drawdown"
                        );

                        if (rs_minimum_net_profit?.text === "minimum_net_profit") {
                            rs_mnp = results.BackTestData?.netProfit >= rs_minimum_net_profit.value ? true : false;
                        }

                        if (rs_minimum_profit_per_day?.text === "minimum_profit_per_day") {
                            rs_mppd = results.BackTestData?.profitPerDay >= rs_minimum_profit_per_day.value ? true : false;
                        }

                        if (rs_minimum_count_of_trades?.text === "minimum_count_of_trades") {
                            rs_mct = results.BackTestData?.tradeCount >= rs_minimum_count_of_trades.value ? true : false;
                        }

                        if (rs_minimum_return_drawdown?.text === "minimum_return_drawdown") {
                            rs_mrd = results.BackTestData?.maxDrawDown >= rs_minimum_return_drawdown.value ? true : false;
                        }

                        if (rs_maximum_equity_drawdown?.text === "maximum_equity_drawdown") {
                            rs_med = results.BackTestData?.drawdown <= rs_maximum_equity_drawdown.value ? true : false;
                        }

                        let asc = generateRState.ascended;
                        let { balanceChart, timestamp } = results.BackTestData;
                        let details = {
                            marketData,
                            stop_loss,
                            take_profit,
                            balance_chart: balanceChart,
                            timestamp,
                            backmarketData: results.bmd,
                        };

                        if (rs_passed || (rs_mnp && rs_mct && rs_mppd && rs_mrd && rs_med)) {
                            asc = generateRState.ascended + 1;
                            saveRandomStrategy({ entryDetails, exitDetails }, details);
                        }

                        generateRunDispatch({
                            type: "SET_CALCULATED",
                            calculated: generateRState.calculated + 1,
                            ascended: asc,
                        });
                    }
                }
            }, 10);
            return () => clearInterval(timeout);
        }
    }, [generateRState.start, generateRState.calculated]);

    useEffect(() => {
        const url_string = window.location.href;
        var url = new URL(url_string);
        var code = url.searchParams.get("code");

        if (code) {
            handleApalcaAuth(code);
        }
    }, [alpacaState]);

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

    let admin: boolean = data?.me && data?.me.admin ? true : false;
    let auth: boolean = data?.me ? true : false;

    return (
        <MainWrapper>
            <Router>
                <Switch>
                    <PublicRoute exact path="/" Component={LogIn} isAuth={auth} />
                    <PublicRoute exact path="/register" Component={Register} isAuth={auth} />
                    <PublicRoute exact path="/verification/:token" Component={Activate} isAuth={auth} />
                    <AuthRoute path="/pages" Component={wrappedRoutes} isAuth={auth} />
                    <AuthRoute path="/strategies" Component={wrappedRoutes} isAuth={auth} />
                    <AuthRoute path="/basket" Component={wrappedRoutes} isAuth={auth} />
                    <AuthRoute path="/paper-trading" Component={wrappedRoutes} isAuth={auth} />
                    <AuthRoute path="/live-trading" Component={wrappedRoutes} isAuth={auth} />
                    <AuthRoute path="/share-strategies" Component={wrappedRoutes} isAuth={auth} />
                    <AuthRoute path="/banks" Component={wrappedRoutes} isAuth={auth} />
                    <AuthRoute path="/accounts" Component={wrappedRoutes} isAuth={auth} />
                    <AuthRoute path="/reset_password" Component={PasswordPage} isAuth={auth} />
                    <Route path="/prospertogether" component={wrappedRoutes} />
                    <AdminRoute path="/users" Component={wrappedRoutes} isAuth={auth} isAdmin={admin} />
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </Router>
        </MainWrapper>
    );
};
