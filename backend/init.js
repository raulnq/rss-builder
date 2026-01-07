import knex from 'knex';
import config from './knexfile.js';

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

async function initDatabase() {
  const db = knex(dbConfig);
  try {
    const schemaName = dbConfig.migrations.schemaName;
    console.log(`Creating schema: ${schemaName}`);
    await db.raw(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
    console.log('Schema created');
    await db.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Error creating schema:', error.message);
    await db.destroy();
    process.exit(1);
  }
}

initDatabase();
