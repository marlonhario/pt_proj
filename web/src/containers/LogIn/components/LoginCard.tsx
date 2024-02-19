import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import CheckIcon from "mdi-react/CheckIcon";
import { toastify } from "../../../components/Toastify";
import { MeQuery, MeDocument, useLoginMutation, useGetRememberMeMutation } from "../../../generated/graphql";
import { setAccessToken } from "../../../accessToken";

export const LoginCard: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const history = useHistory();

    const [login] = useLoginMutation();

    const [getRememberMe] = useGetRememberMeMutation();

    useEffect(() => {
        const remember_me: string = document.cookie.replace(/(?:(?:^|.*;\s*)ptRememberMe\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (remember_me) {
            getRemember(remember_me);
        }
    }, []);

    const getRemember = async (remember_me) => {
        const { data } = await getRememberMe({
            variables: {
                token: remember_me,
            },
            update: (store, { data }) => {
                if (!data) {
                    return toastify(400, `Forbidden!`);
                }

                store.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                        me: data.getRememberMe.user,
                    },
                });
            },
        });
    };

    const handleSubmit = async () => {
        const valid = validate(email);

        if (!valid) {
            return toastify(400, `Please enter valid email address!`);
        } else if (!password) {
            return toastify(400, `Please enter password!`);
        } else {
            try {
                const {
                    data: {
                        login: { errors, accessToken },
                    },
                } = await login({
                    variables: {
                        email: email,
                        password: password,
                        isRememberActive: rememberMe,
                    },
                    update: (
                        store,
                        {
                            data: {
                                login: { errors, user },
                            },
                        }
                    ) => {
                        if (errors?.field) {
                            return toastify(400, `Forbidden!`);
                        }

                        store.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: {
                                me: user,
                            },
                        });
                    },
                });

                if (errors?.field === "password") {
                    return toastify(199, `The password you've entered is incorrect.`);
                } else if (errors?.field === "email") {
                    return toastify(199, `The email you've enterted doesn't match any account. Sign up for an account.`);
                } else {
                    setAccessToken(accessToken);
                    history.push("/pages");
                    return toastify(200, `Welcome ${email}!`);
                }
            } catch (e) {
                return toastify(400, `Error upon login!`);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        if (name === "email") {
            const valid = validate(value);
            setError(valid ? false : true);
            setEmail(value);
        } else {
            setPassword(value);
        }
    };

    const validate = (email) => {
        return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
    };

    return (
        <>
            <div className="form">
                <div className="form__form-group">
                    <label htmlFor="email" className="form__form-group-label">
                        Email
                    </label>
                    <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                            <AccountOutlineIcon />
                        </div>
                        <input id="email" name="email" type="text" onChange={handleChange} />
                    </div>
                    <p>{error ? "Invalid email" : ""}</p>
                </div>
                <div className="form__form-group">
                    <label htmlFor="password" className="form__form-group-label">
                        Password
                    </label>
                    <div className="form__form-group-field password_field">
                        <div className="form__form-group-icon">
                            <KeyVariantIcon />
                        </div>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => {
                                setPassword(e.currentTarget.value);
                            }}
                        />
                        <button
                            onClick={() => {
                                setShowPassword(!showPassword);
                            }}
                            className={`form__form-group-button show_password${showPassword ? " active" : ""}`}
                            type="button"
                            tabIndex={-1}
                        >
                            <EyeIcon />
                        </button>
                    </div>
                </div>
                <div className="form__form-group">
                    <div>
                        <label className="" htmlFor="label_remember_me">
                            <input
                                className="checkbox-btn__checkbox"
                                type="checkbox"
                                id="label_remember_me"
                                name="label_remember_me"
                                onChange={() => {
                                    setRememberMe(true);
                                }}
                            />
                            <span className="checkbox-btn__checkbox-custom">
                                <CheckIcon />
                            </span>
                            <span className="checkbox-btn__label">Remember me</span>
                        </label>
                        <a href="/" tabIndex={-1} style={{ float: "right" }}>
                            Forgot a password?
                        </a>
                    </div>
                </div>
                <button className="btn btn-primary account__btn account__btn--small" type="button" onClick={handleSubmit}>
                    Sign In
                </button>
                <a href="/register" className="btn btn-outline-primary account__btn account__btn--small">
                    Create Account
                </a>
            </div>
            <div className="account__or">
                <p>Or Easily Using</p>
            </div>
        </>
    );
};
