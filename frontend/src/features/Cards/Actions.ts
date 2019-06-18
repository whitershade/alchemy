import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import * as types from './Constants';
import socket from '../../api/socket';

export const addCard = createAction(types.ADD_CARD);
export const removeCard = createAction(types.REMOVE_CARD);

export const createCard = (playerId: number) => (card:Object) => {
  socket.emit('create card', { playerId, ...card });
};
export const deleteCard = (cardId:number) => () =>
  socket.emit('delete card', cardId);

export const subscriptions = {
  subscribeToCardCreated: () => async (dispatch: Dispatch) =>
    socket.on('card created',(card:Object) => dispatch(addCard(card))),

  subscribeToCardDeleted: () => async (dispatch: Dispatch) =>
    socket.on('card deleted', (card:object) => dispatch(removeCard(card)))
};