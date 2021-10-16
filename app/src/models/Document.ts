import { Schema } from 'mongoose';
import { Base } from './BaseModel';
import { SubItem } from './BodyItem';
import { IDocument } from '../types';

const MODEL_NAME = 'RootDocument';

// https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1

const DocumentBlockSchema: Schema = new Schema(
  {
    slug: { type: String },
    title: { type: String },
    body: [{ type: SubItem, ref: 'SubItem', required: true }],
  },
  {
    toObject: { versionKey: false },
  }
);

export const Data = Base.discriminator<IDocument>(
  MODEL_NAME,
  DocumentBlockSchema
);
