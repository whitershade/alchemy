import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
// @ts-ignore
import sharedConstants from 'alchemy-shared-constants';
import * as types from './Constants';
import socket from '../../api/socket';

export const addCard = createAction(types.ADD_CARD);
export const removeCard = createAction(types.REMOVE_CARD);

export const createCard = (playerId: number) => (card:Object) => {
  socket.emit(sharedConstants.socket.card.create, { playerId, ...card });
};
export const deleteCard = (cardId:number) => () =>
  socket.emit(sharedConstants.socket.card.delete, cardId);

export const subscriptions = {
  subscribeToCardCreated: () => async (dispatch: Dispatch) =>
    socket.on(sharedConstants.socket.card.created,(card:Object) => dispatch(addCard(card))),

  subscribeToCardDeleted: () => async (dispatch: Dispatch) =>
    socket.on(sharedConstants.socket.card.deleted, (card:object) => dispatch(removeCard(card)))
};