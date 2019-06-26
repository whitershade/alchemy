import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import { Card } from 'alchemy-shared/types';
import socketConstants from 'alchemy-shared/constants/socket';
import * as types from './Constants';
import socket from '../../utils/socket';
import { DropResult } from "react-beautiful-dnd";

export const addCard = createAction(types.ADD_CARD);
export const removeCard = createAction(types.REMOVE_CARD);
export const reorder = createAction(types.REORDER_CARDS);

export const createCard = (playerId: number) => (card:Card) => {
  socket.emit(socketConstants.card.create, { playerId, ...card });
};

export const deleteCard = (cardId: number) => () =>
  socket.emit(socketConstants.card.delete, cardId);

export const reorderCards = (result:DropResult) => (dispatch: Dispatch) => {
  dispatch(reorder(result));
};

export const subscriptions = {
  subscribeToCardCreated: () => async (dispatch: Dispatch) =>
    socket.on(socketConstants.card.created,(card:Card) => dispatch(addCard(card))),

  subscribeToCardDeleted: () => async (dispatch: Dispatch) =>
    socket.on(socketConstants.card.deleted, (card:Card) => dispatch(removeCard(card)))
};