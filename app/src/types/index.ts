import { Document, Types } from 'mongoose';

export type Tags = string[];
export interface ITimestamps {
  _createdAt: string;
  _updatedAt: string;
}

export interface BaseRefs {
  _ref: string;
  _type: string;
  tags: Tags;
}

export interface IBodyItem extends BaseRefs {
  name: string;
  tags: Tags;
}

export interface ITypes {
  description: string;
  _type: IBodyItem['_type'];
}

export interface IBodyDoc extends IBodyItem, ITimestamps, Document {
  _positionIndex: number;
}

export interface IMutation extends IBodyDoc {
  method: string;
}

export interface IDocument extends BaseRefs, ITimestamps, Document {
  slug: string;
  title: string;
  body: Types.DocumentArray<IBodyDoc>;
}
