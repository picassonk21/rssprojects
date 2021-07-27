import React, { useState } from 'react';
import './wordCreator.scss';
import { CardDataType } from '../../../../types/types';

type PropsType = {
  category: string;
  setEditMode: (value: React.SetStateAction<boolean>) => void;
  createCard: (card: CardDataType, image?: File, audio?: File,) => Promise<void>;
};

const WordCreatorForm: React.FC<PropsType> = ({
  category, setEditMode, createCard,
}) => {
  const [cardWord, setCardWord] = useState('');
  const [cardTranslation, setCardTranslation] = useState('');
  const [audioFile, setAudioFile] = useState<File | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  return (
    <form className="admin__word-creator__form">
      <div className="admin__word-creator__input">
        <label className="admin__word-creator__form-title">word: </label>
        <input type="text" onInput={(e) => {
          setCardWord((e.target as HTMLInputElement).value);
        }} />
      </div>
      <div className="admin__word-creator__input">
        <label className="admin__word-creator__form-title">translation: </label>
        <input type="text" onInput={(e) => {
          setCardTranslation((e.target as HTMLInputElement).value);
        }} />
      </div>
      <div className="admin__word-creator__file">
        <span className="admin__word-creator__file-title">Sound:</span>
        {!audioFile && <button className="admin__word-creator-load-btn">Select file
          <input type="file" className="admin__word-creator__file-input" onChange={(e) => {
            if (e.target.files) {
              setAudioFile(e.target.files[0]);
            }
          }} />
        </button>}
        {audioFile && <span className="admin__word-creator__file-name">{audioFile.name}</span>}
      </div>
      <div className="admin__word-creator__file">
        <span className="admin__word-creator__file-title">Image:</span>
        {!imageFile && <button className="admin__word-creator-load-btn">Select file
          <input type="file" className="admin__word-creator__file-input" onChange={(e) => {
            if (e.target.files) {
              setImageFile(e.target.files[0]);
            }
          }} />
        </button>}
        {imageFile && <span className="admin__word-creator__file-name">{imageFile.name}</span>}
      </div>
      <div className="admin__word-creator__buttons">
        <button className="admin__word-cancel-btn"
          onClick={() => setEditMode(false)}>Cancel</button>
        <button className="admin__word-confirm-btn"
          onClick={async (e) => {
            e.preventDefault();
            if (!cardWord || !cardTranslation) {
              return;
            }
            const image = imageFile;
            const audio = audioFile;
            const newCard: CardDataType = {
              word: cardWord,
              translation: cardTranslation,
              category,
              image: '',
              audio: '',
            };
            await createCard(newCard, image, audio);
            setEditMode(false);
          }}>create</button>
      </div>
    </form>
  );
};

export default WordCreatorForm;
