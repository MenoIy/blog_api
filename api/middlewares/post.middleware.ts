import { Request, Response, NextFunction } from 'express';
import postValidator from '../validators/post.validator';

const create = (req: Request, res: Response, next: NextFunction) => {
  const { error } = postValidator.create.validate(req.body);
  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
  next();
};

const findByUserName = (req: Request, res: Response, next: NextFunction) => {
  const { error } = postValidator.findByUserName.validate(req.params);

  if (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
  next();
};

export default { create, findByUserName };
