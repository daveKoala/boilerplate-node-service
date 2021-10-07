import mongoose from 'mongoose';

const validObjectId = (id: string): boolean =>
  mongoose.Types.ObjectId.isValid(id);

export default validObjectId;
