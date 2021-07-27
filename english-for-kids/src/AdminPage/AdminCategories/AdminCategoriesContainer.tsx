import React from 'react';
import { connect } from 'react-redux';
import { StoreStateType } from '../../redux/store';
import { CategoryDataType } from '../../types/types';
import '../adminPage.scss';
import AdminCategories from './AdminCategories';
import { getCategoriesNames } from '../../redux/appReducer';
import { adminAPI } from '../../api/api';

type PropsType = {
  categories: CategoryDataType[];
  getCategoriesNames: () => Promise<void>;
};

class AdminCategoriesContainer extends React.Component<PropsType> {
  async createCategory(category: string, image?: File) {
    await adminAPI.createCategory(category);
    if (image) {
      await adminAPI.setCategoryImage(image, category);
    }
    this.props.getCategoriesNames();
  }

  render() {
    return (
      <div className="admin__categories-container">
        <AdminCategories categories={this.props.categories} createCategory={this.createCategory.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreStateType) => ({
  categories: state.app.categories,
});

export default connect(mapStateToProps, { getCategoriesNames })(AdminCategoriesContainer);
