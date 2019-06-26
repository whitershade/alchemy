import { AnyAction } from "redux";
import { handleActions } from 'redux-actions';
import { Card } from 'alchemy-shared/types';
import { filter } from 'lodash';
import * as types from './Constants';
import * as cardsTypes from '../Cards/Constants';
import { addItems, addItem, removeItem } from '../../reducers/commonHandlers';

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
          cards: [
            ...state.data[action.payload.playerId].cards,
            action.payload
          ]
        }
      },
    }),
    [cardsTypes.REMOVE_CARD]: (state: any, action: AnyAction) => ({
      ...state,
      data: {
        ...state.data,
        [action.payload.playerId]: {
          ...state.data[action.payload.playerId],
          cards: filter(state.data[action.payload.playerId].cards, ({ id }) => id !== action.payload.id)
        }
      }
    }),
    [cardsTypes.REORDER_CARDS]: (state:any, action: AnyAction) => {
      const playerId = action.payload.destination.droppableId;

      const { cards } = state.data[playerId];

      const sourceIndex = action.payload.source.index;
      const destinationIndex = action.payload.destination.index;

      const reorderedCards = cards.map((card:Card) => {
        if (card.order === sourceIndex) return { ...card, order: destinationIndex };

        if (sourceIndex < destinationIndex) {
          if (card.order > sourceIndex && card.order <= destinationIndex)
            return { ...card, order: card.order - 1}
        } else {
          if (card.order < sourceIndex && card.order >= destinationIndex)
            return { ...card, order: card.order + 1}
        }

        return card;
      });

      return {
        ...state,
        data: {
          ...state.data,
          [playerId]: {
            ...state.data[playerId],
            cards: reorderedCards
          }
        }
      }
    }
  },
  initialState
);
