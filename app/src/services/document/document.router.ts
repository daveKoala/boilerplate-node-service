import express, { NextFunction, Request, Response } from 'express';
import { nextTick } from 'process';
import hasValidObjectId from '../../middleware/hasValidObjectId';
import {
  findRootById,
  deleteRootById,
  mutateRootDocument,
} from './document.service';

const router = express.Router();

export interface Mutation {
  _id: string;
  verb: string; // put, post, delete
}

router.get(
  '/:id',
  hasValidObjectId('id'),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const rootDocument = await findRootById(request.params.id);
      response.status(200).json(rootDocument);
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
      response.status(200).json(rootDocument);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
