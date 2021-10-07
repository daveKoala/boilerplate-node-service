/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import * as myErrors from '../../lib/customErrors';
import { client } from '../../lib/azureAppInsights';

const middleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  client.trackException({ exception: error });

  if (error instanceof myErrors.BaseError) {
    res.status(error.code).send(error.message);
  } else {
    const defaultMessage =
      'Unknown problem. If it persists then contact site owners';
    res.status(500).send(error.message || defaultMessage);
  }
};

export default middleware;
