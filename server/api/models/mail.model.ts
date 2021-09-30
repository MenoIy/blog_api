import { Schema, model } from 'mongoose';
import { IMail } from '../interfaces';

const verificationEmail = new Schema<IMail>(
  {
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: true
    },
    token: {
      type: String,
      unique: true,
      required: true
    }
  },
  { timestamps: true }
);

// emailVerificationSchema.statics.emailVerified = async token => {
//     const user = await mongoose.model('Mail').findOne({
//         token
//     });
//     return !!user;
// };

// const mailVerificationModel = mongoose.model('Mail', emailVerificationSchema);

export const mailModel = model<IMail>('Mail', verificationEmail);
