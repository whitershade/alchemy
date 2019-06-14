import io from 'socket.io-client';
const socket = io('http://localhost:4000');

export const subscribeToPlayers = (cb:Function) => {
  socket.on('send players', (players:Object) => {
    cb(players);
  });
};

export const subscribeToPlayerCreated = (cb:Function) => {
  socket.on('player created', (player:Object) => cb(player));
};

export const subscribeToPlayerDeleted = (cb:Function) => {
  socket.on('player deleted', (id:number) => cb(id));
};

export const subscribeToCardCreated = (cb:Function) => {
  socket.on('card created', (card:Object) => cb(card));
};

export const subscribeToCardDeleted = (cb:Function) => {
  socket.on('card deleted', (card:Object) => cb(card));
};

export const getPlayers = () => {
  socket.emit('get players');
};

export const createPlayer = (player:Object) => {
  socket.emit('create player', player)
};

export const createCard = (playerId:number) => (card:Object) => {
  socket.emit('create card', { playerId, ...card });
};

export const deletePlayer = (playerId:number) => {
  socket.emit('delete player', playerId)
};

export const deleteCard = (cardId:number) => {
  socket.emit('delete card', cardId);
};