import urlapi from 'url';
import { Sequelize } from 'sequelize';

const { DB_USER = '', DB_PASSWORD, DB_HOST, DB_NAME = '' } = process.env;

let sequelize:Sequelize;

if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  const { hostname, port } = urlapi.parse(process.env.DATABASE_URL);

  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    port: Number(port),
    host: hostname,
    logging: true //false
  })
} else {
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
  });
}

export default sequelize;
