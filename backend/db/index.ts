import Sequelize from 'sequelize';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_NAME } = process.env;

// @ts-ignore
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

export default sequelize;