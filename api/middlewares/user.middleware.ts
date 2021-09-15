import { Request, Response, NextFunction } from 'express';
import userValidator from '../validators/user.validator';

export const register = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userValidator.register.validate(req.body);

  if (!error) return next();
  res.status(400).json({ error: { message: error.message } });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userValidator.login.validate(req.body);

  if (!error) return next();
  res.status(400).json({ error: { message: error.message } });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userValidator.update.validate(req.body);

  if (!error) return next();
  res.status(400).json({ error: { message: error.message } });
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userValidator.getUser.validate(req.params);

  if (!error) return next();
  res.status(400).json({ error: { message: error.message } });
};