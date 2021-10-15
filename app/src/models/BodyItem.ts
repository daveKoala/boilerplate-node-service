import { BaseRefs, timestamps } from './BaseModel';
import { Document, Schema } from 'mongoose';

export interface IBodyItem extends BaseRefs, Document {
  name: string;
  _positionIndex: number;
}

export interface IMutation extends IBodyItem {
  method: string;
}

export const SubItem: Schema<IBodyItem> = new Schema(
  {
    _ref: { type: String },
    _type: { type: String },
    name: { type: String, required: true },
    _positionIndex: { type: Number, required: true },
  },
  { timestamps }
);
