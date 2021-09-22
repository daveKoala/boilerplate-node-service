import app from './app';
import config from './lib/configManager';
import mongoose from './lib/mongodb';
import { DbError } from './lib/customErrors';
import redisClient from './lib/cache';
import { client } from './lib/azureAppInsights';
// Routers
import pingz from './services/pingz/pingz.router';
import ErrorHandler from './middleware/errorHandler';

app.use('/pingz', pingz);

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
  mongoose.connect(config.database.connectionString, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  throw new DbError((error as Error).message);
}

app.listen(config.host.port, (): void => {
  console.log(`Connected on port: ${config.host.port}`);
  client.trackEvent({
    name: `start ${config.serviceName}`,
  });
});
