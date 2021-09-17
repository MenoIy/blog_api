import { Document, ObjectId } from 'mongoose';

export interface IPost extends Document {
  body: string;
  createdAt: Date;
  createdBy: ObjectId;
  comments: [ObjectId];
}
