// Update with your config settings.
require('./config');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

module.exports = {
  client: 'postgresql',
  connection: {
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT
  },
  migrations: {
    directory: './knex/migrations'
  },
  seeds: {
    directory: './knex/seeds'
  }
};
