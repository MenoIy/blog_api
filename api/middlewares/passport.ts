import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import userModel from '../models/user.model';
import { IUserDocument } from '../interfaces/user.interface';

passport.use('login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user: IUserDocument | null = await userModel.findUserByEmail(email);
        if (!user) {
          return done(null, false, {
            message: 'Invalide email, account not found'
          });
        }
        if (!user.passwordIsValid(password)) {
          return done(null, false, { message: 'Wrong password' });
        }
        if (!user.emailIsVerified) {
          return done(null, false, {
            message: 'Account non verified !'
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;