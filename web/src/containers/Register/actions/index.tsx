import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useRegisterMutation } from "../../../generated/graphql";
import RegisterForm from '../components';
import { toastify } from '../../../components/Toastify';

const RegisterActions: React.FC<RouteComponentProps> = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordVerify: '',
  });
  const [register] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);
  const {
    email,
    password,
    passwordVerify,
  } = formData;

  const handleFields = (name: string, event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({ ...formData, [name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=> {
    event.preventDefault();

    if (email && password) {
      if (password === passwordVerify) {
        try {
          const response = await register({
            variables: {
              email,
              password: password
            }
          });

          if (Number(response.data!.register) === 409) {
            return toastify(409, "The email is already exist.!");
          } else {
            history.push("/");
            return toastify(200, "Please check on your email for account activation.");
          }
        } catch (error) {
          
        }
      } else {
        return toastify(400, "Passwords don't match");
      }
    } else {
      return toastify(400, "Please fill all fields");
    }
  };

  return (
    <RegisterForm
        handleSubmit = { handleSubmit }
        handleFields = { handleFields }
        formData = { formData }
        showPassword = { showPassword }
        setShowPassword = { setShowPassword }
    />
  )
}

export default withRouter(RegisterActions);
