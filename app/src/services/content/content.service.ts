import { Request, Response } from 'express';

const defaultService = async (
  _req: Request,
  response: Response
): Promise<void> => {
  response.status(200).send('ok');
};

const create = async (_req: Request, response: Response): Promise<void> => {
  response.status(200).send('ok');
};

export default {
  create,
  defaultService,
};
