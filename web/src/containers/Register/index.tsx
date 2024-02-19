import React from 'react';
import RegisterActions from './actions';

const Register = () => (
  <div className="Register account">
    <div className="account__wrapper">
      <div className="account__card">
        <div className="account__head">
          <h3 className="account__title">Welcome to
            <span className="account__logo"> Prosper Together
              <span className="account__logo-accent"></span>
            </span>
          </h3>
          <h4 className="account__subhead subhead">Sign Up</h4>
        </div>
        <div className="account__or">
          <p>Create new account</p>
        </div>
        <RegisterActions />
      </div>
    </div>
  </div>
);

export default Register;
