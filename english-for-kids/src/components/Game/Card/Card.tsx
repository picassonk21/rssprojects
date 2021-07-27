import './card.scss';
import React from 'react';
import { CardDataType } from '../../../types/types';
import reverseImage from '../../../assets/reverse.svg';
import { createAudio } from '../../../shared/shared';
import defaultImg from '../../../assets/default.jpg';

type PropsType = {
  serverURL: string;
  card: CardDataType;
  trainingMode: boolean;
  activeCard?: CardDataType;
  isPlaying: 'pending' | 'playing' | 'won' | 'lost';
  cardHandleClick: (card: CardDataType) => Promise<void>;
  updateTrainedCount: () => Promise<void>;
};

function reverseCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  e.stopPropagation();
  const card = (e.target as HTMLElement).closest('.card');
  card?.classList.add('reversed');
  if (card) {
    card.addEventListener('mouseleave', () => {
      card.classList.remove('reversed');
    });
  }
}

function playAudio(serverURL: string, audio: string): void {
  const sound = createAudio(serverURL, audio);
  sound.play();
}

const Card: React.FC<PropsType> = ({
  serverURL, card, trainingMode, isPlaying, cardHandleClick, updateTrainedCount,
}) => {
  const imgURL = card.image ? `${serverURL}/uploads/${card.image}` : defaultImg;
  return (
    <div
      className={`card__container ${card.guessed ? 'guessed' : ''}`}
      onClick={async () => {
        if (trainingMode) {
          playAudio(serverURL, card.audio);
          await updateTrainedCount();
        } else if (isPlaying === 'playing') {
          cardHandleClick(card);
        }
      }}
    >
      <div className={`card ${trainingMode ? '' : 'play-mode'}`}>
        {trainingMode && (
          <div
            className="reverse-btn"
            onClick={(e) => {
              reverseCard(e);
            }}
          >
            <img src={reverseImage} alt="" />
          </div>
        )}
        <div className={'card-front'}>
          <img src={imgURL} className="card__image" />
          {trainingMode && <h2 className="card__name">{card.word}</h2>}
        </div>
        <div className={'card-back'}>
          <img src={imgURL} className="card__image" />
          {trainingMode && <h2 className="card__name">{card.translation}</h2>}
        </div>
      </div>
    </div>
  );
};

export default Card;
