import './gameEnd.scss';
import React from 'react';
import { Redirect } from 'react-router';
import { ResetGameStateType } from '../../../redux/gameReducer';
import { AnswerType } from '../../../types/types';

type PropsType = {
  win: boolean;
  resetGameState: () => ResetGameStateType;
  answers: AnswerType[];
};

const GameEnd: React.FC<PropsType> = ({ win, resetGameState, answers }) => {
  const errorsCount = answers.filter((answer) => answer === 'error').length;
  return (
    <div
      className="game__end"
      onClick={() => {
        resetGameState();
        <Redirect to="/" />;
      }}
    >
      {win && (
        <div className="game__end-content">
          {' '}
          <img src="./win.png" />
          <h3 className="game__end-title">Congratulations! You won the game!</h3>
        </div>
      )}
      {!win && (
        <div className="game__end-content">
          {' '}
          <img src="./lose.png" />
          <h3 className="game__end-title">Unfortunately! You made {errorsCount} mistakes. Please, try again.</h3>
        </div>
      )}
    </div>
  );
};

export default GameEnd;
