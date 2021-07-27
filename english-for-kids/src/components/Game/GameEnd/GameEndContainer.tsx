import './gameEnd.scss';
import React from 'react';
import { connect } from 'react-redux';
import { resetGameState, ResetGameStateType } from '../../../redux/gameReducer';
import { StoreStateType } from '../../../redux/store';
import GameEnd from './GameEnd';
import { AnswerType } from '../../../types/types';

type PropsType = {
  isPlaying: 'pending' | 'playing' | 'won' | 'lost';
  resetGameState: () => ResetGameStateType;
  answers: AnswerType[];
};

class GameEndContainer extends React.Component<PropsType> {
  render() {
    const isWin = this.props.isPlaying === 'won';
    return (
      <div className="game__end-container">
        <GameEnd win={isWin} resetGameState={this.props.resetGameState} answers={this.props.answers} />
      </div>
    );
  }
}

type MapStateToPropsType = {
  isPlaying: 'pending' | 'playing' | 'won' | 'lost';
  answers: AnswerType[];
};

const mapStateToProps = (state: StoreStateType): MapStateToPropsType => ({
  isPlaying: state.game.isPlaying,
  answers: state.game.answers,
});

export default connect(mapStateToProps, { resetGameState })(GameEndContainer);
