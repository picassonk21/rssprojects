export type UserType = {
  email: string;
  password: string;
};

export type CategoryType = {
  name: string;
  image: string;
};

export type AnswerDataType = {
  word: string;
  category: string;
  asked: number;
  guessed: number;
  errorsCount: number;
  errorsPercent: number;
  trained: number;
};

export type CardDataType = {
  word: string;
  translation: string;
  image: string;
  audio: string;
  category: string;
  guessed?: boolean;
};
