import express, { NextFunction, Request, Response } from 'express';
import hasValidObjectId from '../../middleware/hasValidObjectId';
import { IBodyItem } from '../../models/BodyItem';
import {
  findRootById,
  deleteRootById,
  mutateRootDocument,
} from './document.service';

const router = express.Router();

export interface ITypes {
  description: string;
  _type: IBodyItem['_type'];
}

const availableTypes = (): ITypes[] => [
  { _type: 'span', description: '' },
  { _type: 'mainImage', description: '' },
  { _type: 'banner', description: '' },
  { _type: 'textArea', description: '' },
];

router.get(
  '/:id',
  hasValidObjectId('id'),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const rootDocument = await findRootById(request.params.id);
      response
        .status(200)
        .json({ document: rootDocument, availableTypes: availableTypes() });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  hasValidObjectId('id'),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await deleteRootById(request.params.id);
      response.status(204).end('ok');
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const rootDocument = await mutateRootDocument(request.body);
      response
        .status(200)
        .json({ document: rootDocument, availableTypes: availableTypes() });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
