import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { StoreStateType } from '../../redux/store';
import Game from '../Game/Game';
import { createAudio, getResult, hideAnswers } from '../../shared/shared';
import { CardDataType, AnswerType } from '../../types/types';
import {
  setActiveCard,
  SetActiveCardType,
  setIsPlaying,
  SetIsPlayingType,
  increaseGuessed,
  IncreaseGuessedType,
  setCardIsGuessed,
  SetCardIsGuessedType,
  setAnswer,
  SetAnswerType,
  resetGameProcess,
  ResetGameProcessType,
  setActiveCategory,
  SetActiveCategoryType,
  toggleIsAsked,
  ToggleIsAskedType,
} from '../../redux/gameReducer';

type PropsType = {
  serverURL: string;
  trainingMode: boolean;
  cards: CardDataType[];
  activeCard?: CardDataType;
  isPlaying: 'pending' | 'playing' | 'won' | 'lost';
  guessed: number;
  answers: AnswerType[];
  activeCategory: string;
  isAsked: boolean;
  setActiveCard: (card: CardDataType) => SetActiveCardType;
  setIsPlaying: (isPlaying: 'pending' | 'playing' | 'won' | 'lost') => SetIsPlayingType;
  increaseGuessed: () => IncreaseGuessedType;
  setCardIsGuessed: (card: CardDataType) => SetCardIsGuessedType;
  setAnswer: (answer: 'correct' | 'error') => SetAnswerType;
  resetGameProcess: () => ResetGameProcessType;
  setActiveCategory: (category: string) => SetActiveCategoryType;
  toggleIsAsked: (isAsked: boolean) => ToggleIsAskedType;
};

class Training extends React.Component<PropsType> {
  componentDidUpdate(prevProps: PropsType) {
    if (prevProps.activeCategory !== this.props.activeCategory) {
      this.props.resetGameProcess();
    }
    if (prevProps.answers.length !== this.props.answers.length) {
      hideAnswers();
    }
  }

  start(card: CardDataType): void {
    this.props.setIsPlaying('playing');
    this.ask(card);
  }

  async ask(card: CardDataType): Promise<void> {
    return new Promise((resolve) => {
      this.props.toggleIsAsked(true);
      this.props.setActiveCard(card);
      const audio = createAudio(this.props.serverURL, card.audio);
      audio.play();
      audio.onended = () => {
        this.props.toggleIsAsked(false);
        resolve();
      };
    });
  }

  async answer(card: CardDataType): Promise<AnswerType> {
    this.props.toggleIsAsked(true);
    return new Promise((resolve) => {
      if (card.word === this.props.activeCard?.word) {
        this.props.setCardIsGuessed(card);
        this.props.increaseGuessed();
        this.props.setAnswer('correct');
        const audio = getResult('correct');
        audio.play();
        audio.onended = () => {
          resolve('correct');
        };
      } else {
        this.props.setAnswer('error');
        const audio = getResult('error');
        audio.play();
        audio.onended = () => {
          resolve('error');
        };
      }
    });
  }

  async finish(): Promise<void> {
    const errorCount = this.props.answers.filter((answer) => answer === 'error').length;
    if (!errorCount) {
      this.props.setIsPlaying('won');
    } else {
      this.props.setIsPlaying('lost');
    }
    setTimeout(() => {
      this.props.setIsPlaying('pending');
      this.props.setActiveCategory('');
      this.props.toggleIsAsked(false);
    }, 5000);
  }

  componentDidMount() {
    this.props.toggleIsAsked(false);
    this.props.resetGameProcess();
  }

  render() {
    return (
      <div className={`game__container${this.props.isAsked ? ' disabled' : ''}`}>
        <div className="game__answers">
          {this.props.answers.map((item) => {
            if (item === 'correct') {
              return <div className="game__answers-item"><img src="./star.svg" /></div>;
            }
            return <div className="game__answers-item"><img src="./empty-star.svg" /></div>;
          })}
        </div>
        {!this.props.activeCategory && <Redirect to="/"></Redirect>}
        {this.props.activeCategory && <Game
          cards={this.props.cards}
          trainingMode={this.props.trainingMode}
          activeCard={this.props.activeCard}
          isPlaying={this.props.isPlaying}
          start={this.start.bind(this)}
          ask={this.ask.bind(this)}
          answer={this.answer.bind(this)}
          finish={this.finish.bind(this)}
          toggleIsAsked={this.props.toggleIsAsked}
        />}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreStateType) => ({
  serverURL: state.app.serverURL,
  trainingMode: state.app.trainingMode,
  activeCard: state.game.activeCard,
  isPlaying: state.game.isPlaying,
  guessed: state.game.guessed,
  answers: state.game.answers,
  activeCategory: state.game.activeCategory,
  isAsked: state.game.isAsked,
});

export default connect(mapStateToProps, {
  setActiveCard,
  setIsPlaying,
  increaseGuessed,
  setCardIsGuessed,
  setAnswer,
  resetGameProcess,
  setActiveCategory,
  toggleIsAsked,
})(Training);
