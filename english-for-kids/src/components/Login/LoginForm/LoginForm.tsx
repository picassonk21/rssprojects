import React from 'react';
import {
  Field, InjectedFormProps, reduxForm,
} from 'redux-form';
import { ResetAuthStateType, ToggleLoginFormStateType } from '../../../redux/authReducer';
import { LoginBodyType, LoginFormStateType } from '../../../types/types';
import { Input } from '../../utils/formControls/FormControls';
import { required } from '../../utils/validators/validators';

type PropsType = {
  toggleLoginFormState: (loginFormState: LoginFormStateType) => ToggleLoginFormStateType;
  resetAuthState: () => ResetAuthStateType;
  resetFormValues: (form: string) => void;
};

const LoginForm: React.FC<PropsType & InjectedFormProps<LoginBodyType, PropsType>> = ({
  toggleLoginFormState, handleSubmit, resetAuthState, resetFormValues,
}) => (
  <form className="login__form" onSubmit={handleSubmit}>
    <h2 className="login__title">Login</h2>
    <Field component={Input} name="email" type="text" validate={[required]} />
    <Field component={Input} name="password" type="password" validate={[required]} />
    <div className="login__form-buttons">
      <button type="reset" className="login__form-btn login__form-cancel-btn" onClick={() => {
        toggleLoginFormState('hidden');
        resetAuthState();
        resetFormValues('login');
      }}>cancel</button>
      <button type="submit" className="login__form-btn login__form-login-btn">login</button>
    </div>
  </form>
);

export default reduxForm<LoginBodyType, PropsType>({ form: 'login' })(LoginForm);
