import { Schema, model } from 'mongoose';
import { IPost } from '../interfaces';

const postSchema = new Schema<IPost>(
  {
    body: {
      type: String,
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  { timestamps: true }
);

export const postModel = model<IPost>('Post', postSchema);
