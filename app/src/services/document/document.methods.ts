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

export const findOrCreateRoot = async (body: {
  _id: string;
  slug: string;
  title: string;
}): Promise<IDocument> => {
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
    throw new Error(
      'Unable to create document. Try again. If it persists contact admin'
    );
  }

  return document;
};
