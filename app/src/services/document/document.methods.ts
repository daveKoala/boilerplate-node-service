import { IBodyItem } from '../../models/BodyItem';
import { Data, IDocument } from '../../models/Document';

export interface Mutation {
  _id: string;
  verb: string; // put, post, delete
}

export const sanitize = (doc: any, ret: any, options: any): any => {
  return {
    ...doc.toObject(),
  };
};

export const findOrCreateRoot = async (payload: {
  _id: string;
  slug: string;
  title: string;
  body: IBodyItem[];
}): Promise<IDocument> => {
  const { _id, slug, title } = payload;

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
      body: payload.body,
    }).save();
  }

  if (document === null) {
    throw new Error(
      'Unable to create document. Try again. If it persists contact admin'
    );
  }

  return document;
};
