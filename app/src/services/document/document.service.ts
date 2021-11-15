import { Data } from '../../models/Document';
import { NotFoundError } from '../../lib/customErrors';
import * as documentMethods from './document.methods';
import { LeanDocument } from 'mongoose';
import { IDocument, IMutation, IBodyDoc, Tags } from '../../types';
import { removeAllObjectIds } from '../../lib/mongodb/removeAllObjectIds';

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
  tags: Tags;
  title: string;
  mutations?: IMutation[];
  body: IBodyDoc[];
}): Promise<LeanDocument<IDocument>> => {
  console.log(payload.mutations);
  // Step #1
  // Find or Create the root document
  const doc: IDocument = await documentMethods.findOrCreateRoot(payload);

  // Loop over 'body' mutations adding new items (put), updating (patch) or removing (delete)
  /* The '_positionIndex' field is used to order the doc.body array.
    E.g doc.body = [ 
      {name: 'a', _positionIndex: 3},
      {name: 'b', _positionIndex: 1},
      {name: 'c', _positionIndex: 2},
    ]

    The 'doc.body' when returned to the client is first ordered by '_positionIndex'
  */
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
      doc!.body!.id(mutation?._id)!.tags = mutation.tags.filter(
        (tag) => typeof tag === 'string'
      );
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

export const findAnyWithTags = async (
  tags: Tags
): Promise<LeanDocument<IDocument>[]> => {
  const docs = await Data.find({
    $or: [{ tags: { $in: tags } }, { 'body.tags': { $in: tags } }],
  });
  return docs;
};

export const cloneAndReturnNewDocument = async (
  id: string
): Promise<LeanDocument<IDocument>> => {
  const originalDoc = await Data.findById(id);
  if (originalDoc !== null) {
    const newDoc = await new Data(
      removeAllObjectIds(originalDoc.toObject())
    ).save();
    return newDoc.toObject({ transform: documentMethods.sanitize });
  }

  throw new NotFoundError('Not found');
};
