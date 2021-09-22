import app from './app';
import config from './lib/configManager';

import pingz from './services/pingz/pingz.router';

app.use('/pingz', pingz);

app.listen(config.host.port, (): void => {
  console.log(`Connected on port: ${config.host.port}`);
  // client.trackEvent({
  //   name: 'start notification service',
  // });
});
