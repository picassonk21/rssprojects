import React, { useState, useEffect } from 'react';
import { CardDataType } from '../../types/types';
import AdminWord from './AdminWord/AdminWord';
import './adminWords.scss';
import WordCreator from './AdminWord/WordCreator/WordCreator';

const SCREEN_WIDTH = window.innerWidth;
const PAGE_NUMBER = 1;
const CARDS_PORTION = (SCREEN_WIDTH > 1150) ? 6 : 2;

type PropsType = {
  category: string;
  cards: CardDataType[];
  serverURL: string;
  createCard: (card: CardDataType, image?: File, audio?: File,) => Promise<void>;
  removeCard: (word: string) => Promise<void>;
  updateCard: (word: string, card: CardDataType, image?: File, audio?: File,) => Promise<void>;
};

const AdminWords: React.FC<PropsType> = ({
  category, cards, serverURL, createCard, removeCard, updateCard,
}) => {
  const [cardsToShow, setcardsToShow] = useState<CardDataType[]>([]);
  const [page, setPage] = useState(PAGE_NUMBER);
  useEffect(() => {
    setcardsToShow(cards.slice(0, page * CARDS_PORTION));
  }, [page, cards]);

  const scrollToEnd = () => {
    setPage(page + 1);
  };
  document.addEventListener('scroll', () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
      scrollToEnd();
    }
  });
  return (
    <div className="admin__words">
      <h2 className="admin__words-title">Category: <span>{category}</span></h2>
      <div className="admin__words-content">
        {cardsToShow.map((card) => <AdminWord card={card} serverURL={serverURL} removeCard={removeCard} updateCard={updateCard} />)}
        <WordCreator category={category} createCard={createCard} />
      </div>
    </div>
  );
};

export default AdminWords;
