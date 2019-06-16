require('./src/config');

let dbConnectionUrl = '';

if (process.env.NODE_ENV === 'development')  {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DIALECT } = process.env;

  dbConnectionUrl = `${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
} else {
  const { DATABASE_URL } = require('./secret.json');

  dbConnectionUrl = `${DATABASE_URL}?ssl=false`;
}

module.exports = {
  client: 'postgresql',
  connection: dbConnectionUrl,
  migrations: {
    directory: './knex/migrations'
  },
  seeds: {
    directory: './knex/seeds'
  }
};
