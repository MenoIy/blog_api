import { Request, Response, NextFunction } from 'express';

import { commentSchema } from '../validators';

export const createComment = (req: Request, res: Response, next: NextFunction) => {
  const { error } = commentSchema.createComment.validate({ body: req.body, params: req.params });

  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
  next();
};

export const getComments = (req: Request, res: Response, next: NextFunction) => {
  const { error } = commentSchema.getComments.validate({ params: req.params, query: req.query });

  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
  next();
};

export const getComment = (req: Request, res: Response, next: NextFunction) => {
  const { error } = commentSchema.getComment.validate(req.params);

  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
  next();
};

export const updateComment = (req: Request, res: Response, next: NextFunction) => {
  const { error } = commentSchema.updateComment.validate({ body: req.body, params: req.params });

  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
  next();
};

export const deleteComment = (req: Request, res: Response, next: NextFunction) => {
  const { error } = commentSchema.deleteComment.validate(req.body.params);

  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
  next();
};
