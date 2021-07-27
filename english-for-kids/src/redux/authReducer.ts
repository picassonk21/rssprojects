import { ThunkAction } from 'redux-thunk';
import { authAPI } from '../api/api';
import { LoginBodyType, LoginFormStateType } from '../types/types';

const initialState: AuthStateType = {
  isAuthorised: false,
  loginFormState: 'hidden',
  loginErrorMessage: undefined,
};

type AuthStateType = {
  isAuthorised: boolean;
  loginFormState: LoginFormStateType;
  loginErrorMessage?: string;
};

const authReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case 'TOGGLE_IS_AUTHORISED':
      return {
        ...state,
        isAuthorised: action.isAuthorised,
      };
    case 'TOGGLE_LOGIN_FORM_STATE':
      return {
        ...state,
        loginFormState: action.loginFormState,
      };
    case 'SET_LOGIN_ERROR_MESSAGE':
      return {
        ...state,
        loginErrorMessage: action.message,
      };
    case 'RESET_AUTH_STATE':
      return {
        ...initialState,
      };
    default:
      return {
        ...state,
      };
  }
};

type ActionTypes = ToggleIsAuthorisedType | ToggleLoginFormStateType | SetLoginErrorMessageType | ResetAuthStateType;

export type ToggleIsAuthorisedType = {
  type: 'TOGGLE_IS_AUTHORISED';
  isAuthorised: boolean;
};

export const toggleIsAuthorised = (isAuthorised: boolean): ToggleIsAuthorisedType => ({
  type: 'TOGGLE_IS_AUTHORISED',
  isAuthorised,
});

export type ToggleLoginFormStateType = {
  type: 'TOGGLE_LOGIN_FORM_STATE';
  loginFormState: LoginFormStateType;
};

export const toggleLoginFormState = (loginFormState: LoginFormStateType): ToggleLoginFormStateType => ({
  type: 'TOGGLE_LOGIN_FORM_STATE',
  loginFormState,
});

export type SetLoginErrorMessageType = {
  type: 'SET_LOGIN_ERROR_MESSAGE';
  message?: string;
};

export const setLoginErrorMessage = (message?: string): SetLoginErrorMessageType => ({
  type: 'SET_LOGIN_ERROR_MESSAGE',
  message,
});

export type ResetAuthStateType = {
  type: 'RESET_AUTH_STATE';
};

export const resetAuthState = (): ResetAuthStateType => ({
  type: 'RESET_AUTH_STATE',
});

export const login = (body: LoginBodyType): ThunkAction<Promise<number>, AuthStateType, unknown, ActionTypes> => async (dispatch) => {
  let status: number;
  try {
    const response = await authAPI.login(body);
    status = response.status;
  } catch (e) {
    status = e.response.status;
    dispatch(setLoginErrorMessage(e.response.data.message));
  }
  if (status === 200) {
    dispatch(toggleIsAuthorised(true));
  }
  return status;
};

export default authReducer;
