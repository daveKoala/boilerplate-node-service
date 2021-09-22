import { ConfigSettings } from './types';

const config: ConfigSettings = {
  host: {
    port: parseInt(`${process.env.PORT}` || '3000'),
  },
  cache: {
    connectionString: process.env.CACHE_CONNECTION_STRING || '',
    expiryTime: parseInt(`${process.env.CACHE_DEFAULT_EXPIRY_TIME}` || '3000'),
  },
  database: {
    collection: process.env.MONGODB_COLLECTION_NAME || '',
    connectionString: process.env.MONGODB_CONNECTION_STRING || '',
  },
  environment: process.env.NODE_ENV || 'development',
  secretString: process.env.SECRET_STRING || 'fMRVE5OdK0vqOgo5',
};

export default config;
