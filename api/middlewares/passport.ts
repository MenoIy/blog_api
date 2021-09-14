import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import userModel from '../models/user.model';
import { IUserDocument } from '../interfaces/user.interface';

dotenv.config();

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'userName',
      passwordField: 'password'
    },
    async (userName: string, password: string, done) => {
      try {
        const user: IUserDocument | null = await userModel.findOne({userName});
        if (!user) {
          return done(null, false, {
            message: 'Invalide userName, account not found'
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

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET || 'THIS IS A SECRET',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    (payload: any, done: any) => {
      try {
        done(null, payload);
      } catch (err) {
        done(err);
      }
    }
  )
);

export default passport;
