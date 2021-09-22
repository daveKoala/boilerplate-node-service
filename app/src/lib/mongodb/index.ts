import mongoose from 'mongoose';
import { client } from '../azureAppInsights';

export default mongoose;

mongoose.connection
  .on('connected', () => {
    console.log('Connected to database');
  })
  .on('disconnected', () => {
    console.log('Database disconnected');
  })
  .on('error', (error) => {
    console.log(error.message);
    client.trackEvent({
      name: 'mongoDB connection',
      properties: {
        onProperty: 'error',
        message: error.message,
      },
    });
  })
  .on('reconnect', () => {
    console.log('Database reconnected');
    client.trackEvent({
      name: 'mongoDB connection',
      properties: {
        onProperty: 'reconnect',
        message: 'Connection lost and retrying',
      },
    });
  })
  .on('reconnectFailed', (error) => {
    console.log('Database reconnectFailed:', error.message);
    client.trackEvent({
      name: 'mongoDB connection',
      properties: {
        onProperty: 'reconnectFailed',
        message: error.message,
      },
    });
  });
