import express, { NextFunction, Request, Response } from 'express';
import hasValidObjectId from '../../middleware/hasValidObjectId';
import { ITypes } from '../../types';
import {
  cloneAndReturnNewDocument,
  deleteRootById,
  findAnyWithTags,
  findRootById,
  mutateRootDocument,
} from './document.service';

const router = express.Router();

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

router.post(
  '/tags',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      if (!request.body.tags) {
        throw new Error('no tags given');
      }

      const docs = await findAnyWithTags(request.body.tags);
      response.status(200).json(docs);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/clone/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const doc = await cloneAndReturnNewDocument(request.params.id);
      response.status(200).json(doc);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
