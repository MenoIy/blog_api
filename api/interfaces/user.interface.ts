import { Document, Model, ObjectId } from 'mongoose';

interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  emailIsVerified: boolean;
  Posts: [ObjectId];
  [key: string]: any;
}

export interface IUserDocument extends IUser, Document {
  passwordIsCorrect: (password: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  emailIsVerified: (mail: string) => Promise<boolean>;
  usernameExists: (username: string) => Promise<boolean>;
  emailExists: (email: string) => Promise<boolean>;
}
