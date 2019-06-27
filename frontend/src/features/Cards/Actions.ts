import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import { Card } from 'alchemy-shared/types';
import socketConstants from 'alchemy-shared/constants/socket';
import * as types from './Constants';
import socket from '../../utils/socket';
import { DropResult } from 'react-beautiful-dnd';

export const addCard = createAction(types.ADD_CARD);
export const removeCard = createAction(types.REMOVE_CARD);
export const reorder = createAction(types.REORDER_CARDS);

// should return undefined to prevent final form error
export const createCard = (playerId:number) => (card:Card) => {
  socket.emit(socketConstants.card.create, { playerId, ...card });
};

export const deleteCard = (cardId:number) => () =>
  socket.emit(socketConstants.card.delete, cardId);

export const reorderCards = (dropResult:DropResult) => (dispatch:Dispatch) => {
  dispatch(reorder(dropResult));

  socket.emit(socketConstants.card.reorder, dropResult);
};

export const subscriptions = {
  subscribeToCardCreated: () => async (dispatch:Dispatch) =>
    socket.on(socketConstants.card.created,(card:Card) => dispatch(addCard(card))),

  subscribeToCardDeleted: () => async (dispatch:Dispatch) =>
    socket.on(socketConstants.card.deleted, (card:Card) => dispatch(removeCard(card))),

  subscribeToCardReordered: () => async (dispatch:Dispatch) =>
    socket.on(socketConstants.card.reordered, (dropResult:DropResult) => dispatch(reorder(dropResult)))
};