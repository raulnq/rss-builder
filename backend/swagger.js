import swaggerAutogen from 'swagger-autogen';
import { feedsSchemas } from './src/features/feeds/schemas.js';
import { errorSchemas } from './src/middlewares/schemas.js';
import { sourcesSchemas } from './src/features/sources/schemas.js';
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
  servers: [{ url: `${SCHEMA}://${HOST}` }],
  components: {
    securitySchemes: {
      apiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
        description: 'API Key for endpoint access',
      },
    },
    '@xml': {
      rss: {
        type: 'object',
        xml: { name: 'rss' },
        properties: {
          channel: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              link: { type: 'string' },
              description: { type: 'string' },
              lastBuildDate: { type: 'string' },
              item: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    link: { type: 'string' },
                    guid: { type: 'string' },
                    pubDate: { type: 'string' },
                    description: { type: 'string' },
                    author: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
      atom: {
        type: 'object',
        xml: { name: 'feed' },
        properties: {
          title: { type: 'string' },
          id: { type: 'string' },
          updated: { type: 'string' },
          link: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                href: { type: 'string' },
                rel: { type: 'string' },
              },
            },
          },
          entry: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                id: { type: 'string' },
                updated: { type: 'string' },
                summary: { type: 'string' },
                author: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    schemas: {
      ...feedsSchemas,
      ...sourcesSchemas,
      ...errorSchemas,
    },
    parameters: {
      pageNumber: {
        name: 'pageNumber',
        in: 'query',
        description: 'Page number for pagination',
        required: true,
        default: 1,
        schema: {
          type: 'integer',
        },
      },
      pageSize: {
        name: 'pageSize',
        in: 'query',
        description: 'Page size for pagination',
        required: true,
        default: 10,
        schema: {
          type: 'integer',
        },
      },
    },
    responses: {
      unauthorizedError: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/unauthorizedError' },
          },
        },
      },
      validationError: {
        description: 'Validation Error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/validationError' },
          },
        },
      },
      notFoundError: {
        description: 'Not Found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/notFoundError' },
          },
        },
      },
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

swaggerAutogen({ openapi: '3.0.0', autoQuery: false, autoHeaders: false })(
  outputFile,
  endpointsFiles,
  doc
);
