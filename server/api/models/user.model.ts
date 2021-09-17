import { Schema, model } from 'mongoose';
import { IUserDocument, IUserModel } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';

const userSchema: Schema = new Schema<IUserDocument>({
  username: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  emailIsVerified: { type: Boolean, default: false },
  password: { type: String, required: true },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
});

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, (error, hash) => {
    if (error) return next(error);
    this.password = hash;
    next();
  });
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

userSchema.methods.passwordIsCorrect = async function (password: string): Promise<boolean> {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

userSchema.statics.emailExists = emailExists;
userSchema.statics.usernameExists = usernameExists;
userSchema.statics.emailIsVerified = emailIsVerified;

const userModel = model<IUserDocument, IUserModel>('User', userSchema);

export default userModel;
