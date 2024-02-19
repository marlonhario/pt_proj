import React from 'react';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Props } from '../../../types/Register';

const RegisterForm = ({
  showPassword,
  formData,
  handleSubmit,
  handleFields,
  setShowPassword
}: Props)  => {
  const {email, password, passwordVerify} = formData;
  
  return (
    <form className="form RegisterForm__container" onSubmit={handleSubmit}>
      <div className="form__form-group">
        <label htmlFor="email" className="form__form-group-label">Email</label>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <input
            id="email"
            autoFocus
            name="email"
            type="email"
            onChange={(event) => handleFields("email", event)}
            value={email}
          />
        </div>
      </div>
      <div className="form__form-group">
        <label htmlFor="password" className="form__form-group-label">Password</label>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <KeyVariantIcon />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            onChange={(event) => handleFields('password', event)}
            value={password}
          />
          <button
            className={`form__form-group-button show_password${showPassword ? ' active' : ''}`}
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            tabIndex={-1}
          ><EyeIcon />
          </button>
        </div>
      </div>
      <div className="form__form-group">
        <label htmlFor="passwordVerify" className="form__form-group-label">Confirm Password</label>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <KeyVariantIcon />
          </div>
          <input
            id="passwordVerify"
            name="password"
            type={showPassword ? 'text' : 'password'}
            onChange={(event) => handleFields('passwordVerify', event)}
            value={passwordVerify}
          />
        </div>
      </div>
      <button
        className="btn btn-primary account__btn account__btn--small"
        type="submit"
      >
        Register account
      </button>
      <div className="form__form-group">
        <div className="account__forgot-password">
          <a href="/">Back to login page?</a>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;