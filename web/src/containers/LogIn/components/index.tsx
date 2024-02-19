import React from "react";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import { Props } from "../../../types/Register";

interface LoginProps extends Props {
	isCheckRemember: boolean;
	handleSubmit: () => void;
	setRemember: (value: boolean) => void;
}

const LogInForm = ({
	showPassword,
	formData,
	handleSubmit,
	handleFields,
	setShowPassword,
	isCheckRemember,
	setRemember,
}: LoginProps) => {
	const { email, password } = formData;

	const handelChange = () => {
		setRemember(!isCheckRemember);
	};

	return (
		<div className="LogInForm__container form">
			<div className="form__form-group">
				<label htmlFor="email" className="form__form-group-label">
					Email
        </label>
				<div className="form__form-group-field">
					<div className="form__form-group-icon">
						<AccountOutlineIcon />
					</div>
					<input
						id="email"
						autoFocus
						name="email"
						type="text"
						onChange={(event) => handleFields("email", event)}
						value={email}
						disabled={!!localStorage.getItem("ptRemember") && isCheckRemember}
					/>
				</div>
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
						onChange={(event) => handleFields("password", event)}
						value={password}
						disabled={!!localStorage.getItem("ptRemember") && isCheckRemember}
					/>
					<button
						className={`form__form-group-button show_password${showPassword ? " active" : ""
							}`}
						onClick={() => setShowPassword(!showPassword)}
						type="button"
						tabIndex={-1}
					>
						<EyeIcon />
					</button>
				</div>
				<div className="account__forgot-password">
					<a href="/" tabIndex={-1}>
						Forgot a password?
          </a>
				</div>
			</div>
			<div className="form__form-group">
				<div className="form__form-group-field remember_me">
					<div className="checkbox">
						<input
							type="checkbox"
							id="checkbox"
							name="remember_me"
							checked={isCheckRemember}
							onChange={() => handelChange()}
						/>
						<label htmlFor="checkbox">
							<span>Remember me</span>
						</label>
					</div>
				</div>
			</div>
			<button
				className="btn btn-primary account__btn account__btn--small"
				type="button"
				onClick={() => handleSubmit()}
			>
				Sign In
      </button>
			<a
				href="/register"
				className="btn btn-outline-primary account__btn account__btn--small"
			>
				Create Account
      </a>
		</div>
	);
};

export default LogInForm;
