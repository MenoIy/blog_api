import { Request, Response, NextFunction } from 'express';

import { userSchema } from '../validators';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.createUser.validate(req.body);

  if (!error) return next();
  res.status(400).json({ error: { message: error.message } });
};

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.loginUser.validate(req.body);

  if (!error) return next();
  res.status(400).json({ error: { message: error.message } });
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.updateUser.validate(req.body);

  if (!error) return next();
  res.status(400).json({ error: { message: error.message } });
};

export const me = (req: Request, res: Response, next: NextFunction) => {
  next();
};

export const getUserByUsername = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.getUserByUsername.validate(req.params);

  if (!error) return next();
  res.status(400).json({ error: { message: error.message } });
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.getUsersQuery.validate(req.query);

  if (!error) return next();
  res.status(400).json({ error: { message: error.message } });
};

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  next();
};

export const verifyEmail = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.verifyEmail.validate(req.params);

  if (!error) return next();
  res.status(400).json({ error: { message: error.message } });
};
