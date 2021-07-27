import React from 'react';
import './sidebar.scss';
import { NavLink } from 'react-router-dom';
import { SetActiveCategoryType } from '../../redux/gameReducer';
import { CardDataType, LoginBodyType } from '../../types/types';
import { ToggleSidebarIsOpenedType } from '../../redux/appReducer';
import LoginBtnContainer from './loginBtn/LoginBtnContainer';

type PropsType = {
  categories: string[];
  activeCategory: string;
  isAuthorised: boolean;
  sidebarIsOpened: boolean;
  setActiveCategory: (category: string) => SetActiveCategoryType;
  getCards: (category: string) => Promise<CardDataType[]>;
  toggleSidebarIsOpened: () => ToggleSidebarIsOpenedType;
};

const Sidebar: React.FC<PropsType> = ({
  categories,
  activeCategory,
  isAuthorised,
  sidebarIsOpened,
  setActiveCategory,
  getCards,
  toggleSidebarIsOpened,
}) => (
  <div className={`sidebar ${sidebarIsOpened ? '' : ' hidden'}`}>
    <nav className="sidebar__nav">
      <ul className="sidebar__nav-list">
        <NavLink
          to="./"
          className={`sidebar__nav-item${activeCategory ? '' : ' selected'}`}
          onClick={() => {
            toggleSidebarIsOpened();
          }}
        >
          Main Page
        </NavLink>
        {categories.map((category) => (
          <NavLink
            to="./game"
            className={`sidebar__nav-item${(activeCategory === category) ? ' selected' : ''}`}
            onClick={() => {
              setActiveCategory(category);
              getCards(category);
              toggleSidebarIsOpened();
            }}
          >
            {category}
          </NavLink>
        ))}
        <LoginBtnContainer />
      </ul>
    </nav>
  </div>
);

export default Sidebar;
