import React from 'react';
import './login.scss';
import LoginFormContainer from './LoginForm/LoginFormContainer';

type PropsType = {
  errorMessage?: string;
};

const Login: React.FC<PropsType> = ({ errorMessage }) => (
  <div className="login">
    <LoginFormContainer />
    {errorMessage && <div className="login__error">{errorMessage}</div>}
  </div>
);

export default Login;
