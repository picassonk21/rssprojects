import React from 'react';
import { connect } from 'react-redux';
import MainPage from './MainPage';
import { StoreStateType } from '../../redux/store';
import { CategoryDataType } from '../../types/types';
import './mainPage.scss';
import { setActiveCategory, SetActiveCategoryType } from '../../redux/gameReducer';

type PropsType = {
  categories: CategoryDataType[];
  setActiveCategory: (category: string) => SetActiveCategoryType;
};

class MainPageContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.setActiveCategory('');
  }

  render() {
    return (
      <div>
        <MainPage categories={this.props.categories} />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreStateType): { categories: CategoryDataType[] } => ({
  categories: state.app.categories,
});

export default connect(mapStateToProps, { setActiveCategory })(MainPageContainer);
