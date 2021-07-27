import React from 'react';
import { AnswerType, CardDataType, DBRecordType } from '../../types/types';
import './game.scss';
import CardContainer from './Card/CardContainer';
import { ToggleIsAskedType } from '../../redux/gameReducer';
import GameEndContainer from './GameEnd/GameEndContainer';
import { statsAPI } from '../../api/api';

type PropsType = {
  cards: CardDataType[];
  trainingMode: boolean;
  activeCard?: CardDataType;
  isPlaying: 'pending' | 'playing' | 'won' | 'lost';
  start: (card: CardDataType) => void;
  ask: (card: CardDataType) => void;
  answer: (card: CardDataType) => Promise<AnswerType>;
  finish: () => void;
  toggleIsAsked: (isAsked: boolean) => ToggleIsAskedType;
};

const Game: React.FC<PropsType> = ({
  cards,
  trainingMode,
  activeCard,
  isPlaying,
  start,
  ask,
  answer,
  finish,
  toggleIsAsked,
}) => {
  const gameCards = [...cards].filter((card) => !card.guessed).sort(() => Math.random() - 0.5);

  async function updateAnswerStats(word: string, answerResult: AnswerType): Promise<void> {
    const cardData = await statsAPI.getAnswer(word);
    let {
      asked, errorsCount, guessed,
    } = cardData;
    asked += 1;
    if (answerResult === 'correct') {
      guessed += 1;
    } else {
      errorsCount += 1;
    }
    const errorsPercent = Math.floor(((errorsCount / asked) * 10000)) / 100;
    const newData: DBRecordType = {
      ...cardData,
      asked,
      guessed,
      errorsCount,
      errorsPercent,
    };
    await statsAPI.updateAnswer(newData);
  }

  async function cardHandleClick(card: CardDataType): Promise<void> {
    const result = await answer(card);
    if (activeCard) {
      await updateAnswerStats(activeCard.word, result);
    }
    if (result === 'correct') {
      const nextCard = gameCards.filter((newCard) => card.word !== newCard.word)[0];
      if (nextCard) {
        await ask(nextCard);
        toggleIsAsked(false);
      } else {
        await finish();
      }
    } else if (activeCard) {
      await ask(activeCard);
      toggleIsAsked(false);
    }
  }
  return (
    <div className="game">
      {(isPlaying !== 'won')
        && (isPlaying !== 'lost')
        && <div className="game__cards">
          {cards.map((card) => (
            <CardContainer card={card} cardHandleClick={cardHandleClick.bind(this)} />
          ))}
        </div>}
      {!trainingMode && isPlaying === 'pending' && (
        <button className="start-btn" onClick={() => start(gameCards[0])}>
          Start Game
        </button>
      )}
      {isPlaying === 'playing' && (
        <button
          className="repeat-btn"
          onClick={() => {
            if (activeCard) {
              ask(activeCard);
            }
          }}
        >
          Repeat
        </button>
      )}
      {(isPlaying === 'won' || isPlaying === 'lost') && <GameEndContainer />}
    </div>
  );
};

export default Game;
