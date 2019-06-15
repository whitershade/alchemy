import path from "path";

require('./config');

const app = require('express')();
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
import {path as rootPath} from "app-root-path";

io.on('connection', (socket:any) => {
  socket.on('get players', () => {
    socket.emit('send players', getPlayers(io));
  });

  socket.on('create player', (player:any) => createPlayer(io, player));
  socket.on('delete player', (playerId:number) => deletePlayer(io, playerId));

  socket.on('create card', (card:any) => createCard(io, card));
  socket.on('delete card', (cardId:number) => deleteCard(io, cardId));

  socket.on('disconnect', () => {
    console.log('got disconnect!');
  });
});

// @ts-ignore
app.get('/*', (req, res) => {
  res.sendFile(path.join(rootPath, '..', 'frontend', 'build', 'index.html'));
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});


