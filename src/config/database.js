import knex from 'knex';
import config from '../../knexfile.js';

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];
const db = knex(dbConfig);

export default db;
