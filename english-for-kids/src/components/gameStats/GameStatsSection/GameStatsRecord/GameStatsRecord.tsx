import '../../gameStats.scss';
import React from 'react';
import { DBRecordType } from '../../../../types/types';

type PropsType = {
  record: DBRecordType;
};

const GameStatsRecord: React.FC<PropsType> = ({ record }) => (
  <li className="stats__section-item">
    <span className="stats__section-item__data">{record.word}</span>
    <span className="stats__section-item__data">{record.asked}</span>
    <span className="stats__section-item__data">{record.guessed}</span>
    <span className="stats__section-item__data">{record.errorsCount}</span>
    <span className="stats__section-item__data">{record.errorsPercent}</span>
    <span className="stats__section-item__data">{record.trained}</span>
  </li>
);

export default GameStatsRecord;
