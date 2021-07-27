import './gameStats.scss';
import React from 'react';
import {
  CardDataType,
  CategoryDataType, DBRecordType, StatsSortFieldType, StatsSortType,
} from '../../types/types';
import GameStatsSection from './GameStatsSection/GameStatsSection';
import { ToggleSortType, ToggleSortFieldType, ToggleIsTrainingType } from '../../redux/statsReducer';
import Training from './Training';

type PropsType = {
  cards: CardDataType[];
  categories: CategoryDataType[];
  records: DBRecordType[];
  trainingMode: boolean;
  sort: StatsSortType;
  sortField: StatsSortFieldType;
  isTraining: boolean;
  toggleSort: (sort: StatsSortType) => ToggleSortType;
  toggleSortField: (sortField: StatsSortFieldType) => ToggleSortFieldType;
  toggleIsTraining: (isTraining: boolean) => ToggleIsTrainingType;
  resetStats: () => Promise<void>;
};

const GameStats: React.FC<PropsType> = ({
  cards, categories, records, trainingMode, sort, sortField, isTraining, toggleSort, toggleSortField, toggleIsTraining, resetStats,
}) => {
  function sortStats(clickedfield: StatsSortFieldType) {
    if (sortField === clickedfield) {
      if (sort === 'ASC') {
        toggleSort('DESC');
      } else {
        toggleSort('ASC');
      }
    } else {
      toggleSort('ASC');
      toggleSortField(clickedfield);
    }
  }
  const sortedRecords = [...records].sort((a, b) => {
    if ((sort === 'ASC') && (a[sortField] >= b[sortField])) {
      return 1;
    }
    if ((sort === 'DESC') && (a[sortField] <= b[sortField])) {
      return 1;
    }
    return -1;
  });
  return (
    <div className="stats__container">
      {isTraining
        ? <Training cards={cards} />
        : <div className="stats">
          <div className="stats__header">
            <h1 className="stats__title">Statistics</h1>
            <div className="stats__buttons-container">
              <button className="stats__train-btn" onClick={() => toggleIsTraining(true)}>Train Difficult Words</button>
              <button className="stats__reset-btn" onClick={() => resetStats()}>Reset Stats</button>
            </div>
          </div>
          <div className="stats__table">
            <div className="stats__table-header">
              <ul className="stats__table-header-list">
                <li className="stats__table-header-item" onClick={() => sortStats('word')}>Word / Category</li>
                <li className="stats__table-header-item" onClick={() => sortStats('asked')}>Asked</li>
                <li className="stats__table-header-item" onClick={() => sortStats('guessed')}>Guessed</li>
                <li className="stats__table-header-item" onClick={() => sortStats('errorsCount')}>Errors</li>
                <li className="stats__table-header-item" onClick={() => sortStats('errorsPercent')}>Errors, %</li>
                <li className="stats__table-header-item" onClick={() => sortStats('trained')}>Trained</li>
              </ul>
            </div>
            {categories.map((category) => (
              <GameStatsSection
                category={category}
                records={sortedRecords.filter((record) => record.category === category.name)}
                trainingMode={trainingMode}
              />
            ))}
          </div>
        </div>}
    </div>

  );
};

export default GameStats;
