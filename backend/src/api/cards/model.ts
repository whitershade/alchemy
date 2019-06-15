import Sequelize, { Model } from 'sequelize';

// @ts-ignore
import sequelize from '../../db'

class Card extends Model {}

Card.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
}, {
  // @ts-ignore
  sequelize,
  modelName: 'card'
});

export default Card;