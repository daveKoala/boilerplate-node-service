import { BaseRefs, timestamps } from './BaseModel';
import { Document, Schema } from 'mongoose';

export interface IBodyItem extends BaseRefs, Document {
  name: string;
  type: string;
}

export const SubItem: Schema<IBodyItem> = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps }
);
