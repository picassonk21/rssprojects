import { ThunkAction } from 'redux-thunk';
import { CardDataType } from '../types/types';
import { categoriesAPI } from '../api/api';

type AdminStateType = {
  cards: CardDataType[];
  activeCategory: string;
};

const initialState: AdminStateType = {
  cards: [],
  activeCategory: '',
};

const adminReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case 'ADMIN_SET_CARDS':
      return {
        ...state,
        cards: action.cards,
      };
    case 'ADMIN_SET_ACTIVE_CATEGORY':
      return {
        ...state,
        activeCategory: action.category,
      };
    default:
      return {
        ...state,
      };
  }
};

type ActionTypes = AdminSetCardsType | AdminSetActiveCategoryType;

export type AdminSetCardsType = {
  type: 'ADMIN_SET_CARDS';
  cards: CardDataType[];
};

export const adminSetCards = (cards: CardDataType[]): AdminSetCardsType => ({
  type: 'ADMIN_SET_CARDS',
  cards,
});

export const adminGetCards = (): ThunkAction<Promise<void>, AdminStateType, unknown, ActionTypes> => async (dispatch) => {
  const cards = await categoriesAPI.getAllCards();
  dispatch(adminSetCards(cards));
};

export type AdminSetActiveCategoryType = {
  type: 'ADMIN_SET_ACTIVE_CATEGORY';
  category: string;
};

export const adminSetActiveCategory = (category: string): AdminSetActiveCategoryType => ({
  type: 'ADMIN_SET_ACTIVE_CATEGORY',
  category,
});

export default adminReducer;
