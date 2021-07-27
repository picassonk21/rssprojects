import React from 'react';
import { connect } from 'react-redux';
import { toggleLoginFormState, ToggleLoginFormStateType } from '../../redux/authReducer';
import { StoreStateType } from '../../redux/store';
import { LoginFormStateType } from '../../types/types';
import Login from './Login';
import './login.scss';

type PropsType = {
  loginFormState: LoginFormStateType;
  errorMessage?: string;
  toggleLoginFormState: (loginFormState: LoginFormStateType) => ToggleLoginFormStateType;
};

class LoginContainer extends React.Component<PropsType> {
  render() {
    return (
      <div className={`login__container ${this.props.loginFormState}`}>
        <div className="login__wrapper" onClick={() => this.props.toggleLoginFormState('hidden')}></div>
        <Login errorMessage={this.props.errorMessage} />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreStateType) => ({
  loginFormState: state.auth.loginFormState,
  errorMessage: state.auth.loginErrorMessage,
});

export default connect(mapStateToProps, { toggleLoginFormState })(LoginContainer);
