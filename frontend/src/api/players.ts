import socket from './socket';

export const subscribeToPlayers = (cb:Function) =>
  socket.on('send players', (players:Object) => cb(players));

export const createPlayer = (player:Object) =>
  socket.emit('create player', player);

export const subscribeToPlayerCreated = (cb:Function) =>
  socket.on('player created', (player:Object) => cb(player));

export const deletePlayer = (playerId:number) =>
  socket.emit('delete player', playerId);

export const subscribeToPlayerDeleted = (cb:Function) =>
  socket.on('player deleted', (id:number) => cb(id));