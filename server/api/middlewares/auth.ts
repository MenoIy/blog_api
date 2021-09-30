import { Request, Response, NextFunction } from 'express';
import passport from './passport';
import { userModel } from '../models';
import { IUserDocument } from '../interfaces';

export const authenticated = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, async (error, user) => {
    if (error) return next(error);
    try {
      const found: IUserDocument | null = await userModel.findById({ _id: user._id });
      if (found) {
        req.user = found;
        next();
      } else {
        res.status(401).json({ error: { message: 'Invalid token' } });
      }
    } catch (error) {
      res.status(400).json({ error: { message: 'Unauthorized' } });
    }
  })(req, res, next);
};
