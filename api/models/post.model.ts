import { Schema, model } from 'mongoose';
import { IPost } from '../interfaces/post.interface';

const postSchema = new Schema<IPost>({
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments : [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

const postModel = model<IPost>('Post', postSchema);

export default postModel;
