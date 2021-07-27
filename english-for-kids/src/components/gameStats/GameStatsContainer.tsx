import './gameStats.scss';
import React from 'react';
import { connect } from 'react-redux';
import {
  CardDataType,
  CategoryDataType, DBRecordType, StatsSortFieldType, StatsSortType,
} from '../../types/types';
import { StoreStateType } from '../../redux/store';
import GameStats from './GameStats';
import {
  getRecords, toggleSort, toggleSortField, ToggleSortFieldType, ToggleSortType, toggleIsTraining, ToggleIsTrainingType,
} from '../../redux/statsReducer';
import { ToggleIsFetchingType, toggleIsFetching } from '../../redux/appReducer';
import {
  setCards, SetCardsType, setActiveCategory, SetActiveCategoryType,
} from '../../redux/gameReducer';
import Preloader from '../Preloader/Preloader';
import { categoriesAPI, statsAPI } from '../../api/api';

type PropsType = {
  cards: CardDataType[];
  categories: CategoryDataType[];
  records: DBRecordType[];
  trainingMode: boolean;
  isFetching: boolean;
  sort: StatsSortType;
  sortField: StatsSortFieldType;
  isTraining: boolean;
  getRecords: () => Promise<void>;
  toggleIsFetching: (isFetching: boolean) => ToggleIsFetchingType;
  toggleSort: (sort: StatsSortType) => ToggleSortType;
  toggleSortField: (sortField: StatsSortFieldType) => ToggleSortFieldType;
  toggleIsTraining: (isTraining: boolean) => ToggleIsTrainingType;
  setCards: (cards: CardDataType[]) => SetCardsType;
  setActiveCategory: (category: string) => SetActiveCategoryType;
};

class GameStatsContainer extends React.Component<PropsType> {
  async componentDidUpdate(prevProps: PropsType) {
    if (!prevProps.isTraining && this.props.isTraining) {
      const difficultAnswers = this.props.records
        .sort((a, b) => {
          if (a.errorsPercent >= b.errorsPercent) {
            return -1;
          }
          return 1;
        })
        .slice(0, 8)
        .filter((word) => word.errorsPercent > 0);
      const promises = await difficultAnswers.map((answer) => {
        const word = categoriesAPI.getCard(answer.word);
        return word;
      });
      const wordsToTrain = await Promise.all(promises);
      this.props.setCards(wordsToTrain);
    }
  }

  async resetStats(): Promise<void> {
    const words: string[] = this.props.records.map((record) => record.word);
    this.props.toggleIsFetching(true);
    await statsAPI.resetStats(words);
    await this.props.getRecords();
    this.props.toggleIsFetching(false);
  }

  async componentDidMount() {
    this.props.setActiveCategory('training');
    this.props.toggleIsTraining(false);
    this.props.toggleIsFetching(true);
    await this.props.getRecords();
    this.props.toggleIsFetching(false);
  }

  render() {
    return (
      <div className="stats__container">
        {this.props.isFetching
          ? <Preloader />
          : <GameStats
            cards={this.props.cards}
            categories={this.props.categories}
            records={this.props.records}
            trainingMode={this.props.trainingMode}
            sort={this.props.sort}
            sortField={this.props.sortField}
            isTraining={this.props.isTraining}
            toggleSort={this.props.toggleSort}
            toggleSortField={this.props.toggleSortField}
            toggleIsTraining={this.props.toggleIsTraining}
            resetStats={this.resetStats.bind(this)}
          />}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreStateType) => ({
  cards: state.game.cards,
  categories: state.app.categories,
  records: state.stats.records,
  trainingMode: state.app.trainingMode,
  isFetching: state.app.isFetching,
  sort: state.stats.sort,
  sortField: state.stats.sortField,
  isTraining: state.stats.isTraining,
});

export default connect(mapStateToProps, {
  getRecords, toggleIsFetching, toggleSort, toggleSortField, toggleIsTraining, setCards, setActiveCategory,
})(GameStatsContainer);
