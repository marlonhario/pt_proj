import React from "react";
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

interface Props {
    Component: React.FC<RouteComponentProps>;
    path: string;
    exact?: boolean;
    isAuth: boolean;
    isAdmin: boolean;
}

export const AdminRoute = ({ Component, path, exact = false, isAuth, isAdmin }: Props): JSX.Element => {
    return (
        <Route
            exact={exact}
            path={path}
            render={(props: RouteComponentProps) => isAuth && isAdmin ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: '/pages',
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