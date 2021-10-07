import express, { NextFunction, Request, Response } from 'express';
import { Data, IDocument } from '../../models/Document';
// import { BodyItem, IBodyItem } from '../../models/BodyBlock';
import hasValidObjectId from '../../middleware/hasValidObjectId';

const router = express.Router();

export interface Mutation {
  _id: string;
  verb: string; // put, post, delete
}

export const sanitize = (doc: any, ret: any, options: any): any => {
  return {
    ...doc,
  };
};

router.get(
  '/:id',
  hasValidObjectId('id'),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const document = await Data.findById(request.params.id).populate('body');
      response.status(200).json(document?.toObject({ transform: sanitize }));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', async (request: Request, response: Response) => {
  // const newDocument = await new Data(request.body).save();

  // Step #1
  // Create a new document if there is no ID
  // Find document if there is an ID
  const doc: IDocument = await (async (body): Promise<IDocument> => {
    const { _id, slug, title } = body;

    let document: IDocument | null;

    if (_id) {
      document = await Data.findByIdAndUpdate(
        _id,
        { slug, title },
        { new: true }
      );
    } else {
      document = await new Data({
        slug,
        title,
        body: [{ name: 'dave', type: 'span' }],
      }).save();
    }

    if (document === null) {
      throw new Error('Doc is NULL');
    }

    return document;
  })(request.body);

  // Step #2
  // Loop through mutations and POST, PUT or DELETE

  // Step #3
  // Modify document. Add, remove or move ID's in body

  // Step #4
  // Save and return populated document

  response.status(200).json(doc.toObject());
});

export default router;
