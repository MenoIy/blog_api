import { Document, Model} from 'mongoose';

interface IUser {
  userName: string;
  email: string;
  password: string;
  emailIsVerified: boolean;
}

export interface IUserDocument extends IUser, Document {
  passwordIsValid: (password: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  emailIsVerified: (mail: string) => Promise<boolean>;
  userIsRegistred: (mail: string) => Promise<boolean>;
  findUserByEmail: (mail: string) => Promise<IUserDocument | null>;
}
