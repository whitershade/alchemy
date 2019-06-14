import { keyBy } from 'lodash';
import Model from './model';
import Card from '../cards/model';

const name = 'player';

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

  io.emit(`send ${name}s`, keyBy(data, 'id'));
};

export const createItem = async (io:any, player:any) => {
  const item = await Model.create({ ...player }, { raw: true });

  io.emit(`${name} created`, item);
};

export const deleteItem = async (io:any, id: number) => {
  await Model.destroy({ where: { id } });

  io.emit(`${name} deleted`, id);
};