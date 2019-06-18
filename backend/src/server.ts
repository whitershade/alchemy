require('./config');
import path from "path";
import { path as rootPath } from 'app-root-path';
const express = require('express');

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
  socket.emit('send players', getPlayers(io));

  socket.on('get players', () => socket.emit('send players', getPlayers(io)));

  socket.on('create player', (player:any) => createPlayer(io, player));
  socket.on('delete player', (playerId:number) => deletePlayer(io, playerId));

  socket.on('create card', (card:any) => createCard(io, card));
  socket.on('delete card', (cardId:number) => deleteCard(io, cardId));

  socket.on('disconnect', () => {
    console.log('got disconnect!');
  });
});

http.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});


