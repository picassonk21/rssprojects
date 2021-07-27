import React from 'react';
import { connect } from 'react-redux';
import SideBar from './Sidebar';
import './sidebar.scss';
import { StoreStateType } from '../../redux/store';
import { CardDataType, CategoryDataType, LoginBodyType } from '../../types/types';
import { getCards, setActiveCategory, SetActiveCategoryType } from '../../redux/gameReducer';
import { toggleSidebarIsOpened, ToggleSidebarIsOpenedType } from '../../redux/appReducer';

type PropsType = {
  categories: CategoryDataType[];
  activeCategory: string;
  isAuthorised: boolean;
  sidebarIsOpened: boolean;
  getCards: (category: string) => Promise<CardDataType[]>;
  setActiveCategory: (category: string) => SetActiveCategoryType;
  toggleSidebarIsOpened: () => ToggleSidebarIsOpenedType;
};

class SidebarContainer extends React.Component<PropsType> {
  render() {
    const categories = this.props.categories.map((category) => category.name);
    return (
      <div className="sidebar__container">
        <SideBar
          categories={categories}
          getCards={this.props.getCards}
          isAuthorised={this.props.isAuthorised}
          activeCategory={this.props.activeCategory}
          sidebarIsOpened={this.props.sidebarIsOpened}
          setActiveCategory={this.props.setActiveCategory}
          toggleSidebarIsOpened={this.props.toggleSidebarIsOpened}
        />
        <div
          className={`sidebar__wrapper${this.props.sidebarIsOpened ? '' : ' hidden'}`}
          onClick={() => {
            this.props.toggleSidebarIsOpened();
          }}
        ></div>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreStateType) => ({
  categories: state.app.categories,
  isAuthorised: state.auth.isAuthorised,
  activeCategory: state.game.activeCategory,
  sidebarIsOpened: state.app.sidebarIsOpened,
});

export default connect(mapStateToProps, { getCards, setActiveCategory, toggleSidebarIsOpened })(SidebarContainer);
