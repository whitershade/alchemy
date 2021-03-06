import { Server, Socket } from 'socket.io';
import { get, maxBy } from 'lodash';
import { Card } from 'alchemy-shared/types';
import socketConstants from 'alchemy-shared/constants/socket';
import CardModel from './model';
import PlayerModel from '../players/model';
import Sequelize from "sequelize";

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
  const result = await CardModel.findOne({ where: { id }, raw: true });

  if (!result) return;

  await CardModel.update(
    {
      order: Sequelize.literal('"order" - 1')
    },
    {
      where: {
        playerId: result.playerId,
        order: {
          [Sequelize.Op.gt]: result.order
        }
      }
    }
  );

  await CardModel.destroy({ where: { id } });

  io.emit(socketConstants.card.deleted, result);
};

export const reorderItem = async (socket:Socket, dropResult:any) => {
  const sourceIndex = dropResult.source.index;
  const destinationIndex = dropResult.destination.index;
  const playerId = dropResult.destination.droppableId;
  const cardId = dropResult.draggableId;

  if (sourceIndex < destinationIndex) {
    await CardModel.update(
      {
        order: Sequelize.literal('"order" - 1')
      },
      {
        where: {
          playerId,
          order: {
            [Sequelize.Op.gt]: sourceIndex,
            [Sequelize.Op.lte]: destinationIndex
          }
        }
      }
    )
  } else {
    await CardModel.update(
      {
        order: Sequelize.literal('"order" + 1')
      },
      {
        where: {
          playerId,
          order: {
            [Sequelize.Op.lt]: sourceIndex,
            [Sequelize.Op.gte]: destinationIndex
          }
        }
      }
    )
  }

  await CardModel.update(
    {
      order: dropResult.destination.index
    },
    {
      where: {
        id: cardId
      }
    }
  );

  socket.broadcast.emit(socketConstants.card.reordered, dropResult);
};