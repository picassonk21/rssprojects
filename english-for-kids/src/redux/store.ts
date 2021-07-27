import { combineReducers, createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './appReducer';

import gameReducer from './gameReducer';
import statsReducer from './statsReducer';
import authReducer from './authReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  app: appReducer,
  game: gameReducer,
  stats: statsReducer,
  auth: authReducer,
  adminPage: adminReducer,
  form: formReducer,
});

const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));

type RootReducerType = typeof rootReducer;
export type StoreStateType = ReturnType<RootReducerType>;

export default store;
