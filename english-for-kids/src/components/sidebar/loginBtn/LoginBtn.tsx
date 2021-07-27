import React from 'react';
import { ToggleLoginFormStateType } from '../../../redux/authReducer';
import { LoginFormStateType } from '../../../types/types';
import '../sidebar.scss';

type PropsType = {
  toggleLoginFormState: (loginFormState: LoginFormStateType) => ToggleLoginFormStateType;
};

const LoginBtn: React.FC<PropsType> = ({ toggleLoginFormState }) => (
  <button className="sidebar__login-btn" onClick={() => toggleLoginFormState('opened')}>login</button>
);

export default LoginBtn;
