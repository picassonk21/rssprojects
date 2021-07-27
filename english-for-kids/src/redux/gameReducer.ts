import { ThunkAction } from 'redux-thunk';
import { CardDataType, AnswerType } from '../types/types';
import { categoriesAPI } from '../api/api';

const initialState: GameStateType = {
  cards: [],
  activeCategory: '',
  activeCard: undefined,
  isPlaying: 'pending',
  guessed: 0,
  answers: [],
  isAsked: false,
};

type GameStateType = {
  cards: CardDataType[];
  activeCategory: string;
  activeCard?: CardDataType;
  isPlaying: 'pending' | 'playing' | 'won' | 'lost';
  guessed: number;
  answers: AnswerType[];
  isAsked: boolean;
};

const gameReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case 'SET_CARDS':
      return {
        ...state,
        cards: action.cards,
      };
    case 'SET_ACTIVE_CATEGORY':
      return {
        ...state,
        activeCategory: action.category,
      };
    case 'SET_ACTIVE_WORD':
      return {
        ...state,
        activeCard: action.card,
      };
    case 'SET_IS_PLAYING':
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
    case 'INCREASE_GUESSED':
      return {
        ...state,
        guessed: state.guessed + 1,
      };
    case 'SET_CARD_IS_GUESSED':
      return {
        ...state,
        cards: [
          ...state.cards.map((card) => {
            if (card.word === action.card.word) {
              return {
                ...card,
                guessed: true,
              };
            }
            return card;
          }),
        ],
      };
    case 'SET_ANSWER':
      return {
        ...state,
        answers: [...state.answers, action.answer],
      };
    case 'RESET_GAME_STATE':
      return {
        ...initialState,
      };
    case 'RESET_GAME_PROCESS':
      return {
        ...state,
        isPlaying: initialState.isPlaying,
        guessed: initialState.guessed,
        answers: initialState.answers,
      };
    case 'TOGGLE_IS_ASKED_TYPE':
      return {
        ...state,
        isAsked: action.isAsked,
      };
    default:
      return {
        ...state,
      };
  }
};

type ActionTypes =
  | SetCardsType
  | SetActiveCategoryType
  | SetActiveCardType
  | SetIsPlayingType
  | IncreaseGuessedType
  | SetCardIsGuessedType
  | SetAnswerType
  | ResetGameStateType
  | ResetGameProcessType
  | ToggleIsAskedType;

export type SetCardsType = {
  type: 'SET_CARDS';
  cards: CardDataType[];
};

export const setCards = (cards: CardDataType[]): SetCardsType => ({
  type: 'SET_CARDS',
  cards,
});

export const getCards = (category: string): ThunkAction<Promise<CardDataType[]>, GameStateType, unknown, ActionTypes> => async (dispatch) => {
  const cards = await categoriesAPI.getCards(category);
  dispatch(setCards(cards));
  return cards;
};

export type SetActiveCategoryType = {
  type: 'SET_ACTIVE_CATEGORY';
  category: string;
};

export const setActiveCategory = (category: string): SetActiveCategoryType => ({
  type: 'SET_ACTIVE_CATEGORY',
  category,
});

export type SetActiveCardType = {
  type: 'SET_ACTIVE_WORD';
  card: CardDataType;
};

export const setActiveCard = (card: CardDataType): SetActiveCardType => ({
  type: 'SET_ACTIVE_WORD',
  card,
});

export type SetIsPlayingType = {
  type: 'SET_IS_PLAYING';
  isPlaying: 'pending' | 'playing' | 'won' | 'lost';
};

export const setIsPlaying = (isPlaying: 'pending' | 'playing' | 'won' | 'lost'): SetIsPlayingType => ({
  type: 'SET_IS_PLAYING',
  isPlaying,
});

export type IncreaseGuessedType = {
  type: 'INCREASE_GUESSED';
};

export const increaseGuessed = (): IncreaseGuessedType => ({
  type: 'INCREASE_GUESSED',
});

export type SetCardIsGuessedType = {
  type: 'SET_CARD_IS_GUESSED';
  card: CardDataType;
};

export const setCardIsGuessed = (card: CardDataType): SetCardIsGuessedType => ({
  type: 'SET_CARD_IS_GUESSED',
  card,
});

export type SetAnswerType = {
  type: 'SET_ANSWER';
  answer: AnswerType;
};

export const setAnswer = (answer: AnswerType): SetAnswerType => ({
  type: 'SET_ANSWER',
  answer,
});

export type ResetGameStateType = {
  type: 'RESET_GAME_STATE';
};

export const resetGameState = (): ResetGameStateType => ({
  type: 'RESET_GAME_STATE',
});

export type ResetGameProcessType = {
  type: 'RESET_GAME_PROCESS';
};

export const resetGameProcess = (): ResetGameProcessType => ({
  type: 'RESET_GAME_PROCESS',
});

export type ToggleIsAskedType = {
  type: 'TOGGLE_IS_ASKED_TYPE';
  isAsked: boolean;
};

export const toggleIsAsked = (isAsked: boolean): ToggleIsAskedType => ({
  type: 'TOGGLE_IS_ASKED_TYPE',
  isAsked,
});

export default gameReducer;
