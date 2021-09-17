import { Schema, model } from 'mongoose'
import { IMail } from '../interfaces/mail.interface'

const verificationEmail = new Schema<IMail>({
    user: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});


// emailVerificationSchema.statics.emailVerified = async token => {
//     const user = await mongoose.model('Mail').findOne({
//         token
//     });
//     return !!user;
// };

// const mailVerificationModel = mongoose.model('Mail', emailVerificationSchema);


const mailModel = model<IMail>('Mail', verificationEmail);

export default mailModel