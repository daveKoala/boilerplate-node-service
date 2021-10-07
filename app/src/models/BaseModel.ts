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

export const Base = model('Base', new Schema({}, baseOptions));
