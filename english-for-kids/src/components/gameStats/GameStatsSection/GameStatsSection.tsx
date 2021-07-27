import '../gameStats.scss';
import React from 'react';
import { CategoryDataType, DBRecordType, StatsSortType } from '../../../types/types';
import GameStatsRecord from './GameStatsRecord/GameStatsRecord';

type PropsType = {
  category: CategoryDataType;
  records: DBRecordType[];
  trainingMode: boolean;
};

const GameStatsSection: React.FC<PropsType> = ({
  category, records, trainingMode,
}) => (
  <section className="stats__section">
    <h2 className={`stats__section-title ${trainingMode ? '' : 'play-mode'}`}>{category.name}</h2>
    <ul className="stats__section-list">
      {records.map((record) => (
        <GameStatsRecord record={record} />
      ))}
    </ul>
  </section>
);

export default GameStatsSection;
