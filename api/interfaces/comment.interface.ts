import { Document, ObjectId } from 'mongoose';

export interface IComment extends Document {
  content: string;
  post: ObjectId;
  createdBy: ObjectId;
  createdAt: Date;
}
