import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';

import { userModel } from '../models';
import { IUserDocument } from '../interfaces';

dotenv.config();

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    async (username: string, password: string, done) => {
      try {
        const user: IUserDocument | null = await userModel.findOne({ username });
        if (!user) {
          return done(null, false, {
            message: 'username'
          });
        }
        const passwordIsCorrect = await user.passwordIsCorrect(password);

        if (!passwordIsCorrect) {
          return done(null, false, { message: 'password' });
        }
        if (!user.emailIsVerified) {
          return done(null, false, {
            message: 'email'
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
      jwtFromRequest: (req) => {
        const token = req.cookies.token;
        return token;
      }
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
