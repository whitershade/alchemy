import Sequelize from 'sequelize';
import urlapi from 'url';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_NAME } = process.env;

let sequelize;

if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  const { hostname, port } = urlapi.parse(process.env.DATABASE_URL);

  // @ts-ignore
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  DB_DIALECT,
    protocol: 'postgres',
    port:     port,
    host:     hostname,
    logging:  true //false
  })
} else {
// @ts-ignore
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
  });
}

export default sequelize;
