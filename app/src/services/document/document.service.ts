import { Data, IDocument } from '../../models/Document';
import { IMutation, IBodyItem } from '../../models/BodyItem';
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

export const mutateRootDocument = async (payload: {
  _id: string;
  slug: string;
  title: string;
  mutations?: IMutation[];
  body: IBodyItem[];
}): Promise<LeanDocument<IDocument>> => {
  // Step #1
  // Find or Create a new root document
  const doc: IDocument = await documentMethods.findOrCreateRoot(payload);

  // Loop over 'body' mutations adding new items (put), updating (patch) or removing (delete)
  payload.mutations?.forEach((mutation, index) => {
    if (mutation.method.toLowerCase() === 'put') {
      doc.body.push({ ...mutation, _positionIndex: index });
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
  doc.save();

  return doc.toObject({ transform: documentMethods.sanitize });
};
