import { Document, ObjectId } from 'mongoose';

export interface IPost extends Document {
  body: string;
  createdBy: ObjectId;
  comments: [ObjectId];
}
