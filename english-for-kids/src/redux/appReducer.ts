import { ThunkAction } from 'redux-thunk';
import { CategoryDataType } from '../types/types';
import { categoriesAPI } from '../api/api';

const initialState: AppStateType = {
  serverURL: 'https://salty-earth-13694.herokuapp.com',
  initialized: false,
  trainingMode: true,
  categories: [],
  isFetching: false,
  sidebarIsOpened: false,
  needToRedirect: false,
};

type AppStateType = {
  serverURL: string,
  initialized: boolean;
  trainingMode: boolean;
  categories: CategoryDataType[];
  isFetching: boolean;
  sidebarIsOpened: boolean;
  needToRedirect: boolean;
};

const appReducer = (state = initialState, action: ActionsTypes): AppStateType => {
  switch (action.type) {
    case 'INITIALIZE__APP':
      return {
        ...state,
        initialized: action.initialized,
      };
    case 'TOGGLE_APP_MODE':
      return {
        ...state,
        trainingMode: !state.trainingMode,
      };
    case 'SET_CATEGORIES_NAMES':
      return {
        ...state,
        categories: [...action.categories],
      };
    case 'TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case 'TOGGLE_SIDEBAR_IS_OPENED':
      return {
        ...state,
        sidebarIsOpened: !state.sidebarIsOpened,
      };
    case 'TOGGLE_NEED_TO_REDIRECT':
      return {
        ...state,
        needToRedirect: action.needToRedirect,
      };
    default:
      return {
        ...state,
      };
  }
};

type ActionsTypes = InitializeAppActionType | ToggleAppModeType | SetCategoriesType | ToggleIsFetchingType | ToggleSidebarIsOpenedType | ToggleNeedToRedirectType;

export type ToggleIsFetchingType = {
  type: 'TOGGLE_IS_FETCHING',
  isFetching: boolean;
};

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({
  type: 'TOGGLE_IS_FETCHING',
  isFetching,
});

export type InitializeAppActionType = {
  type: 'INITIALIZE__APP';
  initialized: boolean;
};

export const initializeApp = (initialized: boolean): InitializeAppActionType => ({
  type: 'INITIALIZE__APP',
  initialized,
});

export type ToggleAppModeType = {
  type: 'TOGGLE_APP_MODE';
};

export const toggleAppMode = (): ToggleAppModeType => ({
  type: 'TOGGLE_APP_MODE',
});

export type SetCategoriesType = {
  type: 'SET_CATEGORIES_NAMES';
  categories: CategoryDataType[];
};

export const setCategoriesNames = (categories: CategoryDataType[]): SetCategoriesType => ({
  type: 'SET_CATEGORIES_NAMES',
  categories,
});

export type GetCategoriesType = typeof getCategoriesNames;

export const getCategoriesNames = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch) => {
  const categories = await categoriesAPI.getCategories();
  dispatch(setCategoriesNames(categories));
};

export type ToggleSidebarIsOpenedType = {
  type: 'TOGGLE_SIDEBAR_IS_OPENED';
};

export const toggleSidebarIsOpened = (): ToggleSidebarIsOpenedType => ({
  type: 'TOGGLE_SIDEBAR_IS_OPENED',
});

export type ToggleNeedToRedirectType = {
  type: 'TOGGLE_NEED_TO_REDIRECT';
  needToRedirect: boolean;
};

export const toggleNeedToRedirect = (needToRedirect: boolean): ToggleNeedToRedirectType => ({
  type: 'TOGGLE_NEED_TO_REDIRECT',
  needToRedirect,
});

export default appReducer;
