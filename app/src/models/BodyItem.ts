import { timestamps } from './BaseModel';
import { Schema } from 'mongoose';
import { IBodyDoc } from '../types';

export const SubItem: Schema<IBodyDoc> = new Schema(
  {
    _ref: { type: String },
    _type: { type: String },
    name: { type: String, required: true },
    tags: [{ type: String }],
    _positionIndex: { type: Number, required: true },
  },
  { timestamps }
);
