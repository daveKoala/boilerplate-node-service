import { Data } from '../../models/Document';
import { NotFoundError } from '../../lib/customErrors';
import * as documentMethods from './document.methods';
import { LeanDocument } from 'mongoose';
import { IDocument, IMutation, IBodyDoc } from '../../types';

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

export const mutateRootDocument = async (payload: {
  _id: string;
  slug: string;
  title: string;
  mutations?: IMutation[];
  body: IBodyDoc[];
}): Promise<LeanDocument<IDocument>> => {
  // Step #1
  // Find or Create a new root document
  const doc: IDocument = await documentMethods.findOrCreateRoot(payload);

  // Loop over 'body' mutations adding new items (put), updating (patch) or removing (delete)
  payload.mutations?.forEach((mutation, index) => {
    // There needs to be validation of the mutations for put and patch that takes into account the _type of each body item
    if (mutation.method.toLowerCase() === 'put') {
      doc.body.addToSet({ ...mutation, _positionIndex: index });
    }

    if (
      mutation.method.toLowerCase() === 'patch' &&
      doc.body.id(mutation._id) !== null
    ) {
      doc!.body!.id(mutation?._id)!.name = mutation.name;
      doc!.body!.id(mutation?._id)!._type = mutation._type;
      doc!.body!.id(mutation?._id)!._positionIndex = index;
    }

    if (
      mutation.method.toLowerCase() === 'delete' &&
      doc.body.id(mutation._id) !== null
    ) {
      doc!.body!.id(mutation?._id)!.remove();
    }
  });

  // Save the root document. NOTE, sub documents are not persisted until root is saved
  await doc.save();

  return doc.toObject({ transform: documentMethods.sanitize });
};
