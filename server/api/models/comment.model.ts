import { Schema, model } from 'mongoose';

import { IComment } from '../interfaces';

const commentSchema = new Schema<IComment>(
  {
    content: {
      type: String,
      required: true
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

export const commentModel = model<IComment>('Comment', commentSchema);
