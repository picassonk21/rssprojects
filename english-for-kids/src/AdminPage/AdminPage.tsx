import React from 'react';
import { NavLink, Redirect, Route } from 'react-router-dom';
import { ToggleIsAuthorisedType } from '../redux/authReducer';
import AdminCategoriesContainer from './AdminCategories/AdminCategoriesContainer';
import AdminWordsContainer from './AdminWords/AdminWordsContainer';

type PropsType = {
  activeCategory: string;
  toggleIsAuthorised: (isAuthorised: boolean) => ToggleIsAuthorisedType;
};

const AdminPage: React.FC<PropsType> = ({ activeCategory, toggleIsAuthorised }) => (
  <div className="admin">
    <header className="admin__header">
      <div className="admin__container">
        <div className="admin__header-inner">
          <nav className="admin__header-nav">
            <NavLink to="/" className="admin__header-link">categories</NavLink>
            <NavLink to={`/${activeCategory ? `${activeCategory}/words` : ''}`} className="admin__header-link">words</NavLink>
          </nav>
          <button className="admin__logout-btn" onClick={() => {
            toggleIsAuthorised(false);
          }}>logout</button>
        </div>
      </div>
    </header>
    <div className="admin__main">
      <div className="admin__container">
        <div className="admin__main-inner">
          <Route exact path="/" render={() => <AdminCategoriesContainer />} />
          <Route path={`/${activeCategory}/words`} render={() => <AdminWordsContainer />} />
        </div>
      </div>
    </div>
  </div>
);

export default AdminPage;
