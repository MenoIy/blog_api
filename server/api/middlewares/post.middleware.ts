import { Request, Response, NextFunction } from 'express';
import { postSchema } from '../validators';

export const createPost = (req: Request, res: Response, next: NextFunction) => {
  const { error } = postSchema.createPost.validate(req.body);

  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
  next();
};

export const getPostByUsername = (req: Request, res: Response, next: NextFunction) => {
  const { error } = postSchema.getPostByUsername.validate(req.params);

  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
  next();
};

export const getPost = (req: Request, res: Response, next: NextFunction) => {
  const { error } = postSchema.getPostbyId.validate(req.params);

  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
  next();
};

export const updatePost = (req: Request, res: Response, next: NextFunction) => {
  const { error } = postSchema.updatePost.validate({ params: req.params, body: req.body });

  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
  next();
};

export const deletePost = (req: Request, res: Response, next: NextFunction) => {
  const { error } = postSchema.deletePost.validate(req.params);

  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
  next();
};

export const getPosts = (req: Request, res: Response, next: NextFunction) => {
  const { error } = postSchema.getPosts.validate(req.query);

  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};
