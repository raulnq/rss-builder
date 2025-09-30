import { UnauthorizedError } from './errorHandler.js';
import basicAuth from 'express-basic-auth';

export const ApiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const expectedApiKey = process.env.API_KEY;

  if (!expectedApiKey) {
    return next();
  }

  if (!apiKey) {
    throw new UnauthorizedError('API key is required');
  }

  if (apiKey !== expectedApiKey) {
    throw new UnauthorizedError('Invalid API key');
  }

  next();
};

export const swaggerBasicAuth = basicAuth({
  users: {
    [process.env.SWAGGER_USERNAME || 'admin']:
      process.env.SWAGGER_PASSWORD || 'password123',
  },
  challenge: true,
  realm: 'Swagger Documentation',
});
