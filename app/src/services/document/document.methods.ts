import { IBodyDoc, IBodyItem, IDocument, Tags } from '../../types';
import { Data } from '../../models/Document';

export interface Mutation {
  _id: string;
  verb: string; // put, post, delete
}

export const sortedBodyItems = (bodyItems: IBodyDoc[]): IBodyDoc[] => {
  return bodyItems?.sort((a: IBodyDoc, b: IBodyDoc) => {
    if (a._positionIndex < b._positionIndex) {
      return -1;
    }
    if (a._positionIndex > b._positionIndex) {
      return 1;
    }
    return 0;
  });
};

export const sanitize = (doc: any, ret: any, options: any): IDocument => {
  return {
    ...doc.toObject(),
    body: sortedBodyItems(doc.toObject().body),
  };
};

export const findOrCreateRoot = async (payload: {
  _id: string;
  slug: string;
  tags: Tags;
  title: string;
  body: IBodyItem[];
}): Promise<IDocument> => {
  const { _id, slug, tags, title } = payload;

  let document: IDocument | null;

  if (_id) {
    document = await Data.findByIdAndUpdate(
      _id,
      { slug, tags, title },
      { new: true }
    );
  } else {
    document = await new Data({
      slug,
      tags,
      title,
      body: payload.body.reduce((acc, item, index) => {
        acc.push({ ...item, _positionIndex: index });
        return acc;
      }, [] as unknown[]),
    }).save();
  }

  if (document === null) {
    throw new Error(
      'Unable to create document. Try again. If error persists contact admin'
    );
  }

  return document;
};
