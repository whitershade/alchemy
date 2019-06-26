import Sequelize, { Model } from 'sequelize';

import sequelize from '../../db'

class Card extends Model {
  public id!: number;
  public name!: string;
  public description!: string | null;
  public order!: number;
  public playerId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
};

Card.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  order: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'card'
});

export default Card;