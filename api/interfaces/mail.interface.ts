import { Document, ObjectId } from 'mongoose';

export interface IMail extends Document {
    user : ObjectId;
    token : string;
    createdAt : Date;
}