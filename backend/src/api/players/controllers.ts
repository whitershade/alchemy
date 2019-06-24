import { keyBy } from 'lodash';
import socketConstants from 'alchemy-shared/constants/socket';
import { Player } from 'alchemy-shared/types';
import { Server } from 'socket.io';
import Model from './model';
import Card from '../cards/model';

export const getItems = async (io:Server) => {
  const items = await Model.findAll({
    include: [
      { model: Card }
    ]
  });

  // @ts-ignore
  const data = items.map(({ dataValues }) => ({
    ...dataValues,
    cards: keyBy(dataValues.cards, 'id')
  }));

  io.emit(socketConstants.player.sendAll, keyBy(data, 'id'));
};

export const createItem = async (io:Server, player:Player) => {
  const item = await Model.create(player, { raw: true });

  io.emit(socketConstants.player.created, item);
};

export const deleteItem = async (io:Server, id: number) => {
  await Model.destroy({ where: { id } });

  io.emit(socketConstants.player.deleted, id);
};