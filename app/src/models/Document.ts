import { Document, Schema } from 'mongoose';
import { Base, BaseRefs } from './BaseModel';
import { SubItem, IBodyItem } from './BodyItem';

const MODEL_NAME = 'RootDocument';

export interface IDocument extends BaseRefs, Document {
  slug: string;
  title: string;
  body: IBodyItem[];
}

const DocumentBlockSchema: Schema = new Schema(
  {
    _ref: { type: String },
    _type: { type: String },
    slug: { type: String },
    title: { type: String },
    body: [SubItem],
  },
  {
    toObject: { versionKey: false },
  }
);

export const Data = Base.discriminator<IDocument>(
  MODEL_NAME,
  DocumentBlockSchema
);
