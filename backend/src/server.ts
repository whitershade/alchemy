require('./config');
import path from "path";
import { path as rootPath } from 'app-root-path';
import express from 'express';
// @ts-ignore
import sharedConstants from 'alchemy-shared-constants';

const app = express();

app.use(express.static(path.join(rootPath, '..', 'frontend', 'build')));//
// @ts-ignore
app.get('/*', (req, res) => {
  res.sendFile(path.join(rootPath, '..', 'frontend', 'build', 'Actions.ts.html'));
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
  deleteItem as deleteCard
} from './api/cards/controllers';

io.on('connection', (socket:any) => {
  socket.emit(sharedConstants.socket.player.sendAll, getPlayers(io));

  socket.on(sharedConstants.socket.player.getAll, () =>
    socket.emit(sharedConstants.socket.player.sendAll, getPlayers(io)));

  socket.on(sharedConstants.socket.player.create, (player:any) => createPlayer(io, player));
  socket.on(sharedConstants.socket.player.delete, (playerId:number) => deletePlayer(io, playerId));

  socket.on(sharedConstants.socket.card.create, (card:any) => createCard(io, card));
  socket.on(sharedConstants.socket.card.delete, (cardId:number) => deleteCard(io, cardId));

  socket.on('disconnect', () => {
    console.log('got disconnect!');
  });
});

http.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});


