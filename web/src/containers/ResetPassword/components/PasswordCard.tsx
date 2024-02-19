import React, { useReducer, useState } from "react";
import { Button, ButtonToolbar, Col, Form } from "reactstrap";
import PasswordResetIcon from 'mdi-react/PasswordResetIcon';
import EyeIcon from "mdi-react/EyeIcon";
import { getAccessToken } from "../../../accessToken";
import { useResetMutation } from "../../../generated/graphql";
import { toastify } from "../../../components/Toastify";
import { passwordReducer } from "../reducer/passwordReducer";
import { initialState } from "../type/passwordType";
import { useHistory } from "react-router-dom";

interface Props { }

export const PasswordCard: React.FC<Props> = ( ) => {
    const [oldPass, setOldPass] = useState(false);
    const [newPass, setNewPass] = useState(false);
    const [state, dispatch] = useReducer(passwordReducer, initialState);
    const [reset] = useResetMutation();
    const history = useHistory();

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const { old_password, new_password } = state;

        if (!old_password || !new_password) return toastify(400, `Please fill in all fields!`);

        try {
            const token = getAccessToken();

            const response = await reset({
                variables: {
                    token,
                    old_password,
                    new_password
                },
            });

            if (response && response.data?.resetPassword) {
                return toastify(200, `Successfully updated!`);
            }
        } catch (error) {

        }
    }

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;

        dispatch({
            type: 'field',
            fieldName: name,
            payload: value
        });
    };

    return (
        <form className="form form--horizontal" onSubmit={submit}>
            <div className="form__form-group">
                <span className="form__form-group-label">Current Password</span>
                <div className="form__form-group-field">
                    <div className="form__form-group-icon">
                        <PasswordResetIcon />
                    </div>
                    <input
                        name="old_password"
                        type={oldPass ? 'text' : 'password'}
                        onChange={onChange}
                        autoFocus
                        placeholder="Current Password"
                    />
                    <button
                        type="button"
                        className={`form__form-group-button${oldPass ? ' active' : ''}`}
                        onClick={() => setOldPass(!oldPass)}
                        tabIndex={-1}
                    ><EyeIcon />
                    </button>
                </div>
            </div>
            <div className="form__form-group">
                <span className="form__form-group-label">New Password</span>
                <div className="form__form-group-field">
                    <div className="form__form-group-icon">
                        <PasswordResetIcon />
                    </div>
                    <input
                        name="new_password"
                        type={newPass ? 'text' : 'password'}
                        onChange={onChange}
                        placeholder="New Password"
                    />
                    <button
                        type="button"
                        className={`form__form-group-button${newPass ? ' active' : ''}`}
                        onClick={() => setNewPass(!newPass)}
                        tabIndex={-1}
                    ><EyeIcon />
                    </button>
                </div>
            </div>
            <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit">Submit</Button>
                <Button type="button" onClick={() => {
                    history.push('/');
                }}>Cancel</Button>
            </ButtonToolbar>
        </form>
    )
}