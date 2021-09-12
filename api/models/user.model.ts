import { Schema, model } from 'mongoose';
import { IUserDocument, IUserModel } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';

const userSchema: Schema = new Schema<IUserDocument>({
    userName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    emailIsVerified: { type: Boolean, default: false },
    password: { type: String, required: true }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (error, hash) => {
        if (error) return next(error);
        this.password = hash;
        next();
    });
});

const emailIsVerified = async (email: string): Promise<boolean> => {
    const user: IUserDocument | null = await findUserByEmail(email);
    return !!user && user.emailIsVerified;
};

const findUserByEmail = async (
    email: string
): Promise<IUserDocument | null> => {
    const user: IUserDocument | null = await userModel.findOne({ email });
    return user;
};

const userIsRegistred = async (email: string): Promise<boolean> => {
    const user: IUserDocument | null = await findUserByEmail(email);
    return !!user;
};

userSchema.methods.passwordIsValid = async function (
    password: string
): Promise<boolean> {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
};

userSchema.statics.emailIsVerified = emailIsVerified;
userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.userIsRegistred = userIsRegistred;

const userModel = model<IUserDocument, IUserModel>('user', userSchema);

export default userModel;
