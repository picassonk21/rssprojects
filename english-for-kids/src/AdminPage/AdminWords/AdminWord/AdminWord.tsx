import React, { useState } from 'react';
import { CardDataType } from '../../../types/types';
import './adminWord.scss';
import removeBtn from '../../../assets/close.svg';
import WordEditor from './WordEditor/WordEditor';
import defaultImg from '../../../assets/default.jpg';
import { createAudio } from '../../../shared/shared';

type PropsType = {
  card: CardDataType;
  serverURL: string;
  removeCard: (word: string) => Promise<void>;
  updateCard: (word: string, card: CardDataType, image?: File, audio?: File,) => Promise<void>;
};

const AdminWord: React.FC<PropsType> = ({
  card, serverURL, removeCard, updateCard,
}) => {
  const [editMode, setEditMode] = useState(false);
  const imgURL = card.image ? `${serverURL}/uploads/${card.image}` : defaultImg;
  return (
    <div className="admin__words-item">
      {!editMode && <div className="admin__words-item__content">
        <button className="admin__words-item-remove-btn" onClick={(e) => {
          e.preventDefault();
          removeCard(card.word);
        }}>
          <img src={removeBtn} alt="" />
        </button>
        <h3 className="admin__words-item__subtitle">Word:<span className="subtitle__capitalize">{card.word}</span></h3>
        <h3 className="admin__words-item__subtitle">Translation:<span className="subtitle__capitalize">{card.translation}</span></h3>
        <h3 className="admin__words-item__subtitle"
          onClick={() => {
            const audio = createAudio(serverURL, card.audio);
            audio.play();
          }}
        >Sound file: <span>{card.audio}</span></h3>
        <h3 className="admin__words-item__subtitle">Image: </h3>
        <img src={imgURL} alt="" className="admin__words-item-logo" />
        <button className="admin__words-item-change-btn" onClick={(e) => {
          e.preventDefault();
          setEditMode(true);
        }}>change</button>
      </div>}
      {editMode && <WordEditor card={card} setEditMode={setEditMode} updateCard={updateCard} />}
    </div>
  );
};

export default AdminWord;
