import { Data, IDocument } from '../../models/Document';
import { NotFoundError } from '../../lib/customErrors';
import { LeanDocument } from 'mongoose';
import * as documentMethods from './document.methods';

export const findRootById = async (
  id: string
): Promise<LeanDocument<IDocument>> => {
  const document = await Data.findById(id).populate('body');

  if (!document) {
    throw new NotFoundError('Not found');
  } else {
    return document?.toObject({ transform: documentMethods.sanitize });
  }
};

export const deleteRootById = async (id: string): Promise<void> => {
  const result = await Data.findByIdAndDelete(id);
  if (result === null) {
    throw new NotFoundError('Not found');
  }
};

export const mutateRootDocument = async (body: {
  _id: string;
  slug: string;
  title: string;
}): Promise<LeanDocument<IDocument>> => {
  // const newDocument = await new Data(request.body).save();

  // Step #1
  // Create a new document if there is no ID
  // Find document if there is an ID
  const doc: IDocument = await documentMethods.findOrCreateRoot(body);

  // Step #2
  // Loop through mutations and POST, PUT or DELETE

  // Step #3
  // Modify document. Add, remove or move ID's in body

  // Step #4
  // Save and return populated document

  return doc.toObject({ transform: documentMethods.sanitize });
};
