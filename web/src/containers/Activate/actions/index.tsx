import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  useVerificationMutation,
  useLoginMutation,
  MeDocument,
  MeQuery
} from "../../../generated/graphql";
import { toastify } from '../../../components/Toastify';
import { setAccessToken } from '../../../accessToken';
import jwt from 'jwt-decode';

const ActivateActions: React.FC<RouteComponentProps> = ({ match, history }) => {
  const [ verification ] = useVerificationMutation();
  const [ login ] = useLoginMutation();
  const { params } : any = match;
  const { token } = params;
  const verifiedToken = Object.keys(params).length ? true : false;
  
  React.useEffect(() => {
    if (verifiedToken) {
      executeConfirmation();
    }
  }, [params]);

  const executeConfirmation = async() => {
    const { email: jwtEmail, password: jwtPassword } = jwt(token);
   
    await verification({
      variables: {
        token
      }
    }).then((PromiseValue) => {
      console.log(Number(PromiseValue.data?.verification), 'PromiseValue');
 
      switch(Number(PromiseValue.data?.verification)) {
        case 200:
          handleLogin(jwtEmail, jwtPassword);
          break;
        case 409:
          toastify(409, "The email is already verified.!");
          history.push("/");
          break;
        default:
          history.push("/");
          toastify(
            Number(PromiseValue.data?.verification),
            "Token is already expired, please signup again."
          );
      }
    });
  }

  const handleLogin = async (email: string, password: string) => {
    const response = await login({
      variables: {
        email,
        password,
        isRememberActive: false,

      },
      update: (store, { data }) => {
        if (!data) {
          return toastify(400, `Forbidden!`);
        }

        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: data.login.user
          }
        });
      }
    });
    
    if (response && response.data) {
      setAccessToken(response.data.login.accessToken);

      history.push('/pages/email_confirmation');
      return toastify(200, `Welcome ${email}!`);
    }
  }

  return null;
};

export default withRouter(ActivateActions);
