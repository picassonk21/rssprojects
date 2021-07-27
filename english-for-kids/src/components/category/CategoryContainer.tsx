import './category.scss';
import React from 'react';
import { connect } from 'react-redux';
import { setActiveCategory, SetActiveCategoryType, getCards } from '../../redux/gameReducer';
import Category from './Category';
import { CardDataType, CategoryDataType } from '../../types/types';
import { StoreStateType } from '../../redux/store';
import { categoriesAPI } from '../../api/api';

type PropsType = {
  serverURL: string;
  category: CategoryDataType;
  setActiveCategory: (category: string) => SetActiveCategoryType;
  getCards: (category: string) => Promise<CardDataType[]>;
  trainingMode: boolean;
};

class CategoryContainer extends React.Component<PropsType> {
  render() {
    return (
      <div>
        <Category
          categoryName={this.props.category.name}
          categoryImage={`${this.props.serverURL}/uploads/${this.props.category.image}`}
          setActiveCategory={this.props.setActiveCategory}
          getCards={this.props.getCards}
          trainingMode={this.props.trainingMode}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreStateType) => ({
  serverURL: state.app.serverURL,
  trainingMode: state.app.trainingMode,
});

export default connect(mapStateToProps, { setActiveCategory, getCards })(CategoryContainer);
