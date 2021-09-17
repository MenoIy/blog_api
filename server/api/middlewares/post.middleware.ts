import { Request, Response, NextFunction } from 'express';
import * as postValidator from '../validators/post.validator';

export const addPost = (req: Request, res: Response, next: NextFunction) => {
  const { error } = postValidator.addPostSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
  next();
};

export const getPostByUsername = (req: Request, res: Response, next: NextFunction) => {
  const { error } = postValidator.getPostByUsernameSchema.validate(req.params);

  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
  next();
};

export const getPost = (req: Request, res: Response, next: NextFunction) => {
  const { error } = postValidator.getPostSchema.validate(req.params);

  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
  next();
};

export const updatePost = (req: Request, res: Response, next: NextFunction) => {
  const { error } = postValidator.updatePostSchema.validate({ params: req.params, body: req.body });

  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
  next();
};

export const deletePost = (req: Request, res: Response, next: NextFunction) => {
  const { error } = postValidator.deletePostSchema.validate(req.params);

  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
  next();
};
