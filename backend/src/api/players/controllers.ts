import { keyBy } from 'lodash';
// @ts-ignore
import sharedConstants from 'alchemy-shared-constants';
import Model from './model';
import Card from '../cards/model';

export const getItems = async (io:any) => {
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

  io.emit(sharedConstants.socket.player.sendAll, keyBy(data, 'id'));
};

export const createItem = async (io:any, player:any) => {
  const item = await Model.create({ ...player }, { raw: true });

  io.emit(sharedConstants.socket.player.created, item);
};

export const deleteItem = async (io:any, id: number) => {
  await Model.destroy({ where: { id } });

  io.emit(sharedConstants.socket.player.deleted, id);
};