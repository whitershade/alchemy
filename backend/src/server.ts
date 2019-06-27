require('./config');
import path from "path";
import { path as rootPath } from 'app-root-path';
import express, { Request, Response } from 'express';
import { Socket } from 'socket.io';
import initRoutes from './api/initRoutes';

const app = express();

app.use(express.static(path.join(rootPath, '..', 'frontend', 'build')));
app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(rootPath, '..', 'frontend', 'build', 'index.html'));
});

const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket:Socket) => {
  initRoutes(socket, io);

  socket.on('disconnect', () => {
    console.log('got disconnect!');
  });
});

http.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});


