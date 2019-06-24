import { AnyAction } from 'redux';
import { omit } from 'lodash';

type State = {
  data: object;
}

export const addItems = (state: State, action: AnyAction) => ({
  ...state,
  data: action.payload,
});

export const addItem = (state: State, action: AnyAction) => ({
  ...state,
  data: {
    ...state.data,
    [action.payload.id]: action.payload
  }
});

export const removeItem = (state: State, action: AnyAction) => ({
  ...state,
  data: omit(state.data, action.payload),
});