import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import { IUserDocument, IUserModel } from '../interfaces';

const userSchema: Schema = new Schema<IUserDocument>({
  username: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  emailIsVerified: { type: Boolean, default: false },
  password: { type: String, required: true },
  avatar: { type: String, default: 'uploads/avatar.png' },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

userSchema.methods.passwordIsCorrect = async function (password: string): Promise<boolean> {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

userSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error: any) {
    next(error);
  }
});

const emailIsVerified = async (email: string): Promise<boolean> => {
  const user: IUserDocument | null = await userModel.findOne({ email });
  return !!user && user.emailIsVerified;
};

const emailExists = async (email: string): Promise<boolean> => {
  const user: IUserDocument | null = await userModel.findOne({ email });
  return !!user;
};
const usernameExists = async (username: string): Promise<boolean> => {
  const user: IUserDocument | null = await userModel.findOne({ username });
  return !!user;
};

userSchema.statics.emailExists = emailExists;
userSchema.statics.usernameExists = usernameExists;
userSchema.statics.emailIsVerified = emailIsVerified;

export const userModel = model<IUserDocument, IUserModel>('User', userSchema);
