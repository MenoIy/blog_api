import { Request, Response, NextFunction } from 'express';
import passport from './passport';

import { userModel } from '../models';
import { IUserDocument } from '../interfaces';
import * as Exception from '../exceptions';

export const authenticated = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, async (error, user) => {
    if (error) return next(error);
    try {
      const found: IUserDocument | null = await userModel.findById({ _id: user._id });
      if (found) {
        req.user = found;
        next();
      } else {
        return next(new Exception.InvalidToken());
      }
    } catch (error) {
      return next(new Exception.Unauthorized());
    }
  })(req, res, next);
};
