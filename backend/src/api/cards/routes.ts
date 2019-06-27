import { Socket, Server } from 'socket.io';
import socketConstants from 'alchemy-shared/constants/socket';
import {
  createItem as createCard,
  deleteItem as deleteCard,
  reorderItem as reorderCard
} from './controllers';

export default function(socket:Socket, io:Server) {
  socket.on(socketConstants.card.create, card => createCard(io, card));
  socket.on(socketConstants.card.delete, cardId => deleteCard(io, cardId));
  socket.on(socketConstants.card.reorder, dropResult => reorderCard(socket, dropResult));
}
