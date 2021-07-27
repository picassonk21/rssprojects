import React from 'react';
import { connect } from 'react-redux';
import { FormState, reset, FormAction } from 'redux-form';
import LoginForm from './LoginForm';
import {
  login, toggleLoginFormState, ToggleLoginFormStateType, resetAuthState, ResetAuthStateType,
} from '../../../redux/authReducer';
import { LoginBodyType, LoginFormStateType } from '../../../types/types';
import { StoreStateType } from '../../../redux/store';

type PropsType = {
  form: FormState;
  toggleLoginFormState: (loginFormState: LoginFormStateType) => ToggleLoginFormStateType;
  login: (body: LoginBodyType) => Promise<number>;
  resetAuthState: () => ResetAuthStateType;
  reset: (form: string) => FormAction;
};

class LoginFormContainer extends React.Component<PropsType> {
  async onSubmit(body: LoginBodyType) {
    await this.props.login(body);
  }

  resetFormValues(form: string): void {
    this.props.reset(form);
  }

  render() {
    return (
      <div className="login__form-container">
        <LoginForm
          toggleLoginFormState={this.props.toggleLoginFormState}
          onSubmit={this.onSubmit.bind(this)}
          resetAuthState={this.props.resetAuthState}
          resetFormValues={this.resetFormValues.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreStateType) => ({
  form: state.form.login,
});

export default connect(mapStateToProps, {
  toggleLoginFormState, login, resetAuthState, reset,
})(LoginFormContainer);
