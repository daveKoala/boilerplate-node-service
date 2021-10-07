import app from './app';
import config from './lib/configManager';
import mongooseConnect from './lib/mongodb';
import { DbError } from './lib/customErrors';
import redisClient from './lib/cache';
import { client } from './lib/azureAppInsights';
// Routers
import pingz from './services/pingz/pingz.router';
import document from './services/document/document.router';
import ErrorHandler from './middleware/errorHandler';

app.use('/pingz', pingz).use('/data', document);

// This is the last item of middleware
app.use(ErrorHandler);

redisClient
  .on('ready', () => {
    console.log('Connected to cache');
  })
  .on('error', (err) => {
    console.log(`Redis error: ${err.message}`);
    client.trackEvent({ name: 'redis-connection-error', measurements: err });
  });

try {
  mongooseConnect({ db: config.database.connectionString });
} catch (error) {
  throw new DbError((error as Error).message);
}

app.listen(config.host.port, (): void => {
  console.log(`Connected on port: ${config.host.port}`);
  client.trackEvent({
    name: `start ${config.serviceName}`,
  });
});
