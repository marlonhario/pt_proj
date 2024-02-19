import React from "react";
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { publicRoute } from "../types/router/routes";

interface Props {
    Component: React.FC<RouteComponentProps>;
    path: string;
    exact?: boolean;
    isAuth: boolean;
}

export const AuthRoute = ({ Component, path, exact = false, isAuth }: Props): JSX.Element => {
    return (
        <Route
            exact={exact}
            path={path}
            render={(props: RouteComponentProps) => isAuth ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: publicRoute.login,
                            state: {
                                requestedPath: path
                            }
                        }}
                    />
                )
            }
        />
    )
}