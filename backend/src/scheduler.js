import dotenv from 'dotenv';
dotenv.config();
import cron from 'node-cron';
import db from './config/database.js';
import { syncSources } from './features/sources/syncSources.js';

async function runTask() {
  const startTime = new Date();
  console.log('Running task at:', startTime);
  try {
    await syncSources();
    const endTime = new Date();
    const duration = endTime - startTime;
    console.log(`Task completed(${duration}ms) at:`, endTime);
  } catch (error) {
    console.error('Error running task:', error);
  }
}
const schedule = process.env.SCHEDULE || '0 * * * *';
console.log('Registering cron schedule:', schedule);
if (!cron.validate(schedule)) {
  console.error('Invalid cron schedule:', schedule);
  process.exit(1);
}
cron.schedule(schedule, runTask);

console.log('Scheduler started successfully');

async function gracefulShutdown(signal) {
  console.log(`Received ${signal}. Closing DB connection...`);
  try {
    await db.destroy();
    console.log('DB connection closed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error closing DB connection:', error);
    process.exit(1);
  }
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
