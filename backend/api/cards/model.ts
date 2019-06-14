import Sequelize, { Model } from 'sequelize';
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
  sequelize,
  modelName: 'card'
});

export default Card;