import { Document, Model, ObjectId } from 'mongoose';

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
}

export interface IUserDocument extends IUser, Document {
  passwordIsCorrect: (password: string) => Promise<boolean>;
  emailIsVerified: boolean;
  Posts: [ObjectId];
  [key: string]: any;
}

export interface IUserModel extends Model<IUserDocument> {
  emailIsVerified: (mail: string) => Promise<boolean>;
  usernameExists: (username: string) => Promise<boolean>;
  emailExists: (email: string) => Promise<boolean>;
}

export type IUpdateUser = {
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  emailIsVerified?: boolean;
  avatar?: string;
};
