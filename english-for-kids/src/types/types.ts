import { AxiosResponse } from 'axios';

export type CategoryDataType = {
  name: string;
  image: string;
};

export type CardDataType = {
  word: string;
  translation: string;
  image: string;
  audio: string;
  guessed?: boolean;
  category: string;
};

export type CategoriesAPIType = {
  getCategories: () => Promise<CategoryDataType[]>;
  getCards: (category: string) => Promise<CardDataType[]>;
  getAllCards: () => Promise<CardDataType[]>;
  getCard: (word: string) => Promise<CardDataType>;
};

export type DBRecordType = {
  word: string;
  category: string;
  asked: number;
  guessed: number;
  errorsCount: number;
  errorsPercent: number;
  trained: number;
};

export type LoginBodyType = {
  email: string;
  password: string;
};

export type CategoryEditorBodyType = {
  name: string;
};

export type AnswerType = 'correct' | 'error';

export type StatsAPIType = {
  getAnswers: (category?: string) => Promise<DBRecordType[]>;
  setAnswer: (answerData: DBRecordType) => Promise<void>;
  getAnswer: (word: string) => Promise<DBRecordType>;
  updateAnswer: (answerData: DBRecordType) => Promise<void>;
  resetStats: (words: string[]) => Promise<void>;
};

export type StatsSortType = 'ASC' | 'DESC';

export type StatsSortFieldType = 'word' | 'asked' | 'guessed' | 'errorsCount' | 'errorsPercent' | 'trained';

export type LoginFormStateType = 'opened' | 'hidden';

export type AdminAPIType = {
  createCategory: (categoryName: string) => Promise<void>;
  setCategoryImage: (image: File, category: string) => Promise<void>;
  removeCategory: (category: string) => Promise<void>;
  updateCategoryName: (categoryName: string, newName: string) => Promise<AxiosResponse>;
  createCard: (card: CardDataType) => Promise<void>;
  removeCard: (word: string) => Promise<void>;
  setCardAudio: (audio: File, word: string) => Promise<void>;
  setCardImage: (image: File, word: string) => Promise<void>;
  updateCard: (cardData: CardDataType, word: string) => Promise<void>;
};

export type WordCreatorBodyType = {
  word: string;
  translation: string;
  image: string;
  audio: string;
}