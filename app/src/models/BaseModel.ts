import { model, Schema } from 'mongoose';

export interface ITimestamps {
  _createdAt: string;
  _updatedAt: string;
}

export interface BaseRefs {
  _ref: string;
  _type: string;
}

export const timestamps = {
  createdAt: '_createdAt',
  updatedAt: '_updatedAt',
};

const baseOptions = {
  discriminatorKey: '_typeKey',
  collection: `data`,
  timestamps,
};

const baseSchema: Schema = new Schema(
  {
    _ref: { type: String },
    _type: { type: String },
  },
  baseOptions
);

export const Base = model('Base', baseSchema);
