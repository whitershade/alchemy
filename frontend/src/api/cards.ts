import socket from './socket';

export const createCard = (playerId:number) => (card:Object) =>
  socket.emit('create card', { playerId, ...card });

export const subscribeToCardCreated = (cb:Function) =>
  socket.on('card created', (card:Object) => cb(card));

export const deleteCard = (cardId:number) =>
  socket.emit('delete card', cardId);

export const subscribeToCardDeleted = (cb:Function) =>
  socket.on('card deleted', (card:Object) => cb(card));
