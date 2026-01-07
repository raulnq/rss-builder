import dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    client: 'pg',
    connection: process.env.CONNECTION_STRING,
    searchPath: ['rss_builder', 'public'],
    migrations: {
      directory: './migrations',
      extension: 'js',
      schemaName: 'rss_builder',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
  production: {
    client: 'pg',
    connection: process.env.CONNECTION_STRING,
    searchPath: ['rss_builder', 'public'],
    migrations: {
      directory: './migrations',
      extension: 'js',
      schemaName: 'rss_builder',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default config;
