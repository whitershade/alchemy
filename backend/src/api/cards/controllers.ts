import { Server } from 'socket.io';
import { get, maxBy } from 'lodash';
import { Card } from 'alchemy-shared/types';
import socketConstants from 'alchemy-shared/constants/socket';
import CardModel from './model';
import PlayerModel from '../players/model';

export const createItem = async (io:Server, card:Card) => {
  // @ts-ignore
  const { dataValues: { cards } } = await PlayerModel.findOne({
    where: { id: card.playerId },
    include: [
      { model: CardModel }
    ]
  });

  const cardWithMaxOrder = maxBy(cards, 'order');
  const maxOrder = get(cardWithMaxOrder, 'dataValues.order', -1);
  const item = await CardModel.create({ ...card, order: maxOrder + 1 }, { raw: true });

  io.emit(socketConstants.card.created, item);
};

export const deleteItem = async (io:Server, id: number) => {
  const result = await CardModel.findOne({ where: { id } });
  await CardModel.destroy({ where: { id } });

  io.emit(socketConstants.card.deleted, result);
};