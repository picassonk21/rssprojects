import React, { useState } from 'react';
import './wordCreator.scss';
import createBtn from '../../../../assets/create.svg';
import WordCreatorForm from './WordCreatorForm';
import { CardDataType } from '../../../../types/types';

type PropsType = {
  category: string;
  createCard: (card: CardDataType, image?: File, audio?: File,) => Promise<void>;
};

const WordCreator: React.FC<PropsType> = ({ category, createCard }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="admin__word-creator">
      {editMode && <WordCreatorForm
        setEditMode={setEditMode}
        category={category}
        createCard={createCard}
      />}
      {!editMode && <div className="admin__word-creator-content">
        <h2 className="admin__word-creator-title">Add new Word</h2>
        <button className="admin__word-creator-btn" onClick={() => setEditMode(true)}><img src={createBtn} alt="" /></button>
      </div>}
    </div>
  );
};

export default WordCreator;
