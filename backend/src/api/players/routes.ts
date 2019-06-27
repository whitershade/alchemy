import socketConstants from 'alchemy-shared/constants/socket';
import { Server, Socket } from 'socket.io';
import {
  createItem as createPlayer,
  deleteItem as deletePlayer,
  getItems as getPlayers}
from "./controllers";

export default function(socket:Socket, io:Server) {
  socket.emit(socketConstants.player.sendAll, getPlayers(io));

  socket.on(socketConstants.player.getAll, () =>
    socket.emit(socketConstants.player.sendAll, getPlayers(io)));

  socket.on(socketConstants.player.create, player => createPlayer(io, player));
  socket.on(socketConstants.player.delete, playerId => deletePlayer(io, playerId));
}