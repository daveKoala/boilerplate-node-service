import { Document, Types } from 'mongoose';

export interface ITimestamps {
  _createdAt: string;
  _updatedAt: string;
}

export interface BaseRefs {
  _ref: string;
  _type: string;
}

export interface IBodyItem extends BaseRefs {
  name: string;
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
