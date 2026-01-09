import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import { clerkMiddleware } from '@clerk/express';
import { errorHandler } from './middlewares/errorHandler.js';
import feedRoutes from './features/feeds/routes.js';
import sourceRoutes from './features/sources/routes.js';
const PORT = process.env.PORT || 5000;
const app = express();
import healthcheck from 'express-healthcheck';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'node:fs';
import { swaggerBasicAuth } from './middlewares/securityHandler.js';
const swaggerFile = JSON.parse(readFileSync('./swagger-output.json', 'utf-8'));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));
app.use(clerkMiddleware());
app.use(
  '/live',
  healthcheck({
    healthy: () => ({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: Date.now(),
    }),
  })
);
app.use(
  '/api-docs',
  swaggerBasicAuth,
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile)
);
// No global auth - routes apply their own auth
app.use('/api/feeds', feedRoutes);
app.use('/api/feeds', sourceRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
