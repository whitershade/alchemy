import { AnyAction } from 'redux';
import { omit } from 'lodash';

export const addItems = (state: any, action: AnyAction) => ({
  ...state,
  data: action.payload,
});

export const addItem = (state: any, action: AnyAction) => ({
  ...state,
  data: {
    ...state.data,
    [action.payload.id]: action.payload
  }
});

export const removeItem = (state: any, action: AnyAction) => ({
  ...state,
  data: omit(state.data, action.payload),
});