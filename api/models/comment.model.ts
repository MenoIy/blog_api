import { Schema, model } from 'mongoose'
import { IComment } from '../interfaces/comment.interface'
import postModel from './post.model';

const commentSchema = new Schema<IComment>({
    content : {
        type : String,
        required : true,
    },
    post : {
        type : Schema.Types.ObjectId,
        ref : 'Post',
        required : true,
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    createdAt : {
        type : Date,
        default : new Date(),
    }
})

const commentModel = model<IComment>('Comment', commentSchema);

export default commentModel;