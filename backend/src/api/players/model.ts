import Sequelize, { Model } from 'sequelize';
import Card from '../cards/model';
import sequelize from '../../db'

class Player extends Model {}

Player.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'player'
});

Player.hasMany(Card, { onDelete: 'cascade' });

export default Player;

