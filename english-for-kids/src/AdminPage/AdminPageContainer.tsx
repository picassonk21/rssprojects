import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import AdminPage from './AdminPage';
import { toggleIsAuthorised, ToggleIsAuthorisedType } from '../redux/authReducer';
import './adminPage.scss';
import { adminGetCards } from '../redux/adminReducer';
import { StoreStateType } from '../redux/store';

type PropsType = {
  activeCategory: string;
  toggleIsAuthorised: (isAuthorised: boolean) => ToggleIsAuthorisedType;
  adminGetCards: () => Promise<void>;
};

class AdminPageContainer extends React.Component<PropsType> {
  async componentDidMount() {
    await this.props.adminGetCards();
  }

  render() {
    return (
      <div className="admin__wrapper">
        <Redirect to="/" />
        <AdminPage toggleIsAuthorised={this.props.toggleIsAuthorised} activeCategory={this.props.activeCategory} />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreStateType) => ({
  activeCategory: state.adminPage.activeCategory,
});

export default connect(mapStateToProps, { toggleIsAuthorised, adminGetCards })(AdminPageContainer);
