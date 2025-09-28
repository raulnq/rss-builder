import express from 'express';
const PORT = process.env.PORT || 5000;
const app = express();
import healthcheck from 'express-healthcheck';
import morgan from 'morgan';

app.use(morgan('dev'));
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
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
