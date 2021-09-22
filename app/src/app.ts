// import { client } from './lib/azureAppInsights';
import cors from 'cors';
import config from './lib/configManager';
import express, { Application } from 'express';
import helmet from 'helmet';
import ignoreFavIcon from './middleware/ignoreFavIcon';
import morgan from 'morgan';

const app: Application = express();

app
  .use(helmet())
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(ignoreFavIcon);

if (
  ['test', 'development', 'local'].includes(config.environment.toLowerCase())
) {
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
  );
}

export default app;
