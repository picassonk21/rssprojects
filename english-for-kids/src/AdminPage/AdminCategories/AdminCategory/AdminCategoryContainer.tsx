import React from 'react';
import { connect } from 'react-redux';
import AdminCategory from './AdminCategory';
import './adminCategory.scss';
import { CardDataType, CategoryDataType } from '../../../types/types';
import { StoreStateType } from '../../../redux/store';
import { adminSetActiveCategory, adminGetCards, AdminSetActiveCategoryType } from '../../../redux/adminReducer';
import { adminAPI } from '../../../api/api';
import { getCategoriesNames } from '../../../redux/appReducer';

type PropsType = {
  category: CategoryDataType;
  cards: CardDataType[];
  adminSetActiveCategory: (category: string) => AdminSetActiveCategoryType;
  getCategoriesNames: () => Promise<void>;
};

class AdminCategoryContainer extends React.Component<PropsType> {
  async removeCategory() {
    await adminAPI.removeCategory(this.props.category.name);
    await this.removeCategoryCards();
    this.props.getCategoriesNames();
  }

  async removeCategoryCards() {
    this.props.cards.filter((card) => card.category === this.props.category.name).forEach(async (card) => {
      await adminAPI.removeCard(card.word);
    });
  }

  render() {
    return (
      <div className="admin__category-container">
        <AdminCategory
          category={this.props.category}
          length={this.props.cards.filter((card) => card.category === this.props.category.name).length}
          adminSetActiveCategory={this.props.adminSetActiveCategory} removeCategory={this.removeCategory.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreStateType) => ({
  cards: state.adminPage.cards,
});

export default connect(mapStateToProps, { adminGetCards, adminSetActiveCategory, getCategoriesNames })(AdminCategoryContainer);
