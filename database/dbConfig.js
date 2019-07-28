const knex = require('knex');
const dotenv = require('dotenv')
const config = require('../knexfile.js');
dotenv.config()
const dbEnv = process.env.DB_ENV || 'development';
module.exports = knex(config[dbEnv])


