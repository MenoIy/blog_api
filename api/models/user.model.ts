import {Schema, Model, Document, model} from 'mongoose'

const userSchema : Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    emailVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
});

export interface IUser extends Document {
    firstName : string,
    lastName : string,
    emai:string,
    password : string
}

const userModel: Model<IUser> = model('user', userSchema);

export default userModel;