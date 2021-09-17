import { Request, Response, NextFunction } from 'express';
import * as userValidator from '../validators/user.validator';

export const addUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userValidator.addUserSchema.validate(req.body);

  if (!error) return next();
  res.status(400).json({ error: { message: error.message } });
};

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userValidator.loginUserSchema.validate(req.body);

  if (!error) return next();
  res.status(400).json({ error: { message: error.message } });
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userValidator.updateUserSchema.validate(req.body);

  if (!error) return next();
  res.status(400).json({ error: { message: error.message } });
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userValidator.getUserSchema.validate(req.params);

  if (!error) return next();
  res.status(400).json({ error: { message: error.message } });
};

export const me = (req: Request, res: Response, next: NextFunction) => {
  next();
};

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  next();
};