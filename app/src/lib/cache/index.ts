import redis, { RetryStrategyOptions } from 'redis';
import config from '../configManager';

const redisClient = redis.createClient(config.cache.connectionString, {
  retry_strategy: (options: RetryStrategyOptions) => {
    const { error, total_retry_time: totalRetryTime, attempt } = options;
    if (error && error.code === 'ECONNREFUSED') {
      console.log(error.code);
    }
    if (totalRetryTime > 1000 * 15) {
      console.log('Retry time exhausted');
    }
    if (attempt > 10) {
      return new Error(`unable to connect after ${attempt} attempts`);
    }
    console.log('Attempting connection');

    return Math.min(options.attempt * 100, 3000);
  },
});

export const getByKey = (
  key: string,
  resetExpiryTime = true
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        // reject(err);
        resolve(null);
        return;
      }
      if (val == null) {
        resolve(null);
        return;
      }

      try {
        if (resetExpiryTime) {
          redisClient.expire(key, config.cache.expiryTime);
        }
        resolve(val);
      } catch (ex) {
        resolve(val);
      }
    });
  });
};

export const saveToCache = (key: string, payload: unknown): void => {
  console.log({ key, payload });
};

export const makeKey = (): string => {
  return 'post-url-body';
};

export default redisClient;
