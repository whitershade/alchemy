import { Server } from 'socket.io';
import { Card } from 'alchemy-shared/types';
import socketConstants from 'alchemy-shared/constants/socket';
import Model from './model';

export const createItem = async (io:Server, card:Card) => {
  const item = await Model.create(card, { raw: true });

  io.emit(socketConstants.card.created, item);
};

export const deleteItem = async (io:Server, id: number) => {
  const result = await Model.findOne({ where: { id } });
  await Model.destroy({ where: { id } });

  io.emit(socketConstants.card.deleted, result);
};