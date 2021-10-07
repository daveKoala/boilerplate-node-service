import express, { NextFunction, Request, Response } from 'express';
import { Data, IDocument } from '../../models/Document';
// import { BodyItem, IBodyItem } from '../../models/BodyBlock';
// import hasValidObjectId from '../../middleware/hasValidObjectId';
import { NotFoundError } from '../../lib/customErrors';
import { LeanDocument } from 'mongoose';

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
    throw new Error('Doc is NULL');
  }

  return document;
};

export const findRootById = async (
  id: string
): Promise<LeanDocument<IDocument>> => {
  const document = await Data.findById(id).populate('body');

  if (!document) {
    throw new NotFoundError('Not found');
  } else {
    return document?.toObject({ transform: sanitize });
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
  const doc: IDocument = await findOrCreateRoot(body);

  // Step #2
  // Loop through mutations and POST, PUT or DELETE

  // Step #3
  // Modify document. Add, remove or move ID's in body

  // Step #4
  // Save and return populated document

  return doc.toObject({ transform: sanitize });
};
