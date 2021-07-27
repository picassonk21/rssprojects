import React from 'react';
import { connect } from 'react-redux';
import { toggleLoginFormState, ToggleLoginFormStateType } from '../../../redux/authReducer';
import { StoreStateType } from '../../../redux/store';
import { LoginFormStateType } from '../../../types/types';
import '../sidebar.scss';
import LoginBtn from './LoginBtn';

type PropsType = {
  toggleLoginFormState: (loginFormState: LoginFormStateType) => ToggleLoginFormStateType;
};

class LoginBtnContainer extends React.Component<PropsType> {
  render() {
    return (
      <div className="sidebar__login-btn-container">
        <LoginBtn toggleLoginFormState={this.props.toggleLoginFormState} />
      </div>
    );
  }
}

export default connect(null, { toggleLoginFormState })(LoginBtnContainer);
