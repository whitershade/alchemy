require('./config');
import path from "path";
import { path as rootPath } from 'app-root-path';
import express, { Request, Response } from 'express';
import socketConstants from 'alchemy-shared/constants/socket';
import { Socket } from 'socket.io';

const app = express();

app.use(express.static(path.join(rootPath, '..', 'frontend', 'build')));
app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(rootPath, '..', 'frontend', 'build', 'index.html'));
});

const http = require('http').createServer(app);
const io = require('socket.io')(http);

import {
  getItems as getPlayers,
  createItem as createPlayer,
  deleteItem as deletePlayer
} from './api/players/controllers';

import {
  createItem as createCard,
  deleteItem as deleteCard,
  reorderItem as reorderCard
} from './api/cards/controllers';

io.on('connection', (socket:Socket) => {
  socket.emit(socketConstants.player.sendAll, getPlayers(io));

  socket.on(socketConstants.player.getAll, () =>
    socket.emit(socketConstants.player.sendAll, getPlayers(io)));

  socket.on(socketConstants.player.create, player => createPlayer(io, player));
  socket.on(socketConstants.player.delete, playerId => deletePlayer(io, playerId));

  socket.on(socketConstants.card.create, card => createCard(io, card));
  socket.on(socketConstants.card.delete, cardId => deleteCard(io, cardId));
  socket.on(socketConstants.card.reorder, dropResult => reorderCard(socket, dropResult));

  socket.on('disconnect', () => {
    console.log('got disconnect!');
  });
});

http.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});


