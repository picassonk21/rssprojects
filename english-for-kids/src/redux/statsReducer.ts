import { ThunkAction } from 'redux-thunk';
import { DBRecordType, StatsSortFieldType, StatsSortType } from '../types/types';
import { statsAPI } from '../api/api';

const initialState: StatsStateType = {
  records: [],
  sort: 'ASC',
  sortField: 'word',
  isTraining: false,
};

type StatsStateType = {
  records: DBRecordType[];
  sort: StatsSortType;
  sortField: StatsSortFieldType;
  isTraining: boolean;
};

const statsReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case 'SET_RECORDS':
      return {
        ...state,
        records: [...action.records],
      };
    case 'TOGGLE_SORT':
      return {
        ...state,
        sort: action.sort,
      };
    case 'TOGGLE_SORT_FIELD':
      return {
        ...state,
        sortField: action.sortField,
      };
    case 'TOGGLE_IS_TRAINING':
      return {
        ...state,
        isTraining: action.isTraining,
      };
    default:
      return {
        ...state,
      };
  }
};

type ActionTypes = SetRecordsType | ToggleSortType | ToggleSortFieldType | ToggleIsTrainingType;

export type SetRecordsType = {
  type: 'SET_RECORDS';
  records: DBRecordType[];
};

export const setRecords = (records: DBRecordType[]): SetRecordsType => ({
  type: 'SET_RECORDS',
  records,
});

export type GetRecordsType = typeof getRecords;

export const getRecords = (): ThunkAction<Promise<void>, StatsStateType, unknown, ActionTypes> => async (dispatch) => {
  const records = await statsAPI.getAnswers();
  dispatch(setRecords(records));
};

export type ToggleSortType = {
  type: 'TOGGLE_SORT';
  sort: StatsSortType;
};

export const toggleSort = (sort: StatsSortType): ToggleSortType => ({
  type: 'TOGGLE_SORT',
  sort,
});

export type ToggleSortFieldType = {
  type: 'TOGGLE_SORT_FIELD';
  sortField: StatsSortFieldType;
};

export const toggleSortField = (sortField: StatsSortFieldType): ToggleSortFieldType => ({
  type: 'TOGGLE_SORT_FIELD',
  sortField,
});

export type ToggleIsTrainingType = {
  type: 'TOGGLE_IS_TRAINING';
  isTraining: boolean;
};

export const toggleIsTraining = (isTraining: boolean): ToggleIsTrainingType => ({
  type: 'TOGGLE_IS_TRAINING',
  isTraining,
});

export default statsReducer;
