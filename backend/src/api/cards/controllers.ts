import { keyBy } from 'lodash';
import Model from './model';

const name = 'card';

export const getItems = async (io:any) => {
  const items = await Model.findAll({ raw: true });

  io.emit(`send ${name}s`, keyBy(items, 'id'));
};

export const createItem = async (io:any, card:any) => {
  const item = await Model.create({ ...card }, { raw: true });

  io.emit(`${name} created`, item);
};

export const deleteItem = async (io:any, id: number) => {
  const result = await Model.findOne({ where: { id } });
  await Model.destroy({ where: { id } });

  io.emit(`${name} deleted`, result);
};