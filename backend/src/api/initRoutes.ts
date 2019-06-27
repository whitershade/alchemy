import { Server, Socket } from 'socket.io';
import initCardRoutes from './cards/routes';
import initPlayerRoutes from './players/routes';

export default function initRoutes(socket:Socket, io:Server) {
  initCardRoutes(socket, io);
  initPlayerRoutes(socket, io);
}