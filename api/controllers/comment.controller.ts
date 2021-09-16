import { Request, Response, NextFunction } from 'express';
import commentModel from '../models/comment.model';
import { IComment } from '../interfaces/comment.interface';

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment: IComment = new commentModel({ ...req.body, createdBy: req.user._id, post: req.params.id });

    await comment.save();

    res.status(201).send({ message: 'Comment created', comment: comment });
  } catch (error) {
    next(error);
  }
};
