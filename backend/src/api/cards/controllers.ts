import Model from './model';
// @ts-ignore
import sharedConstants from 'alchemy-shared-constants';

export const createItem = async (io:any, card:any) => {
  const item = await Model.create({ ...card }, { raw: true });

  io.emit(sharedConstants.socket.card.created, item);
};

export const deleteItem = async (io:any, id: number) => {
  const result = await Model.findOne({ where: { id } });
  await Model.destroy({ where: { id } });

  io.emit(sharedConstants.socket.card.deleted, result);
};