import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();
const HOST = process.env.HOST || 'localhost:5000';
const SCHEMA = process.env.SCHEMA || 'http';
const doc = {
  info: {
    title: 'RSS Builder API',
    description: 'API Documentation',
    version: '1.0.0',
  },
  host: HOST,
  schemes: [SCHEMA],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'X-API-Key',
      description: 'API Key for endpoint access',
    },
  },
  security: [
    {
      apiKeyAuth: [],
    },
  ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/server.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
