import { Document, ObjectId, Date } from 'mongoose';

export interface IComment extends Document {
  content: string;
  post: ObjectId;
  createdBy: ObjectId;
}
