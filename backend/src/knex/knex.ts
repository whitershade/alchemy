const config = require('../knexfile.js');
module.exports = require('src/knex/knex')(config);