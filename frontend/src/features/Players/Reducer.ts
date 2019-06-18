import { handleActions } from 'redux-actions';
import { omitBy } from 'lodash';
import * as types from './Constants';
import * as cardsTypes from '../Cards/Constants';
import { addItems, addItem, removeItem } from '../../reducers/commonHandlers';
import {AnyAction} from "redux";

const initialState = {
  data: {}
};

export default handleActions({
    [types.ADD_PLAYERS]: addItems,
    [types.REMOVE_PLAYER]: removeItem,
    [types.ADD_PLAYER]: addItem,
    [cardsTypes.ADD_CARD]: (state:any, action: AnyAction) => ({
      ...state,
      data: {
        ...state.data,
        [action.payload.playerId]: {
          ...state.data[action.payload.playerId],
          cards: {
            ...state.data[action.payload.playerId].cards,
            [action.payload.id]: action.payload
          }
        }
      },
    }),
    [cardsTypes.REMOVE_CARD]: (state: any, action: AnyAction) => ({
      ...state,
      data: {
        ...state.data,
        [action.payload.playerId]: {
          ...state.data[action.payload.playerId],
          cards: omitBy(state.data[action.payload.playerId].cards, ({ id }) => id === action.payload.id)
        }
      }
    })
  },
  initialState
);
