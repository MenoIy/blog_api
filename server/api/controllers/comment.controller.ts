import { Request, Response, NextFunction } from 'express';
import { commentModel, postModel } from '../models';
import { IComment, IPost } from '../interfaces';

import * as Exception from '../exceptions';

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment: IComment = new commentModel({ ...req.body, createdBy: req.user._id, post: req.params.postId });
    const post: IPost | null = await postModel.findById(req.params.postId);

    if (!post) {
      return next(new Exception.PostNotFound());
    }
    post.comments.push(comment._id);
    await post.save();
    await comment.save();

    res.status(201).send(comment);
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post: IPost | null = await postModel.findById(req.params.postId, 'comments');
    if (!post) {
      return next(new Exception.PostNotFound());
    }
    const comments = await commentModel
      .find({ _id: { $in: post.comments } })
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 })
      .limit(Number(req.query.limit));

    res.status(201).send(comments);
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment: IComment | null = await commentModel.findById(req.params.commentId);

    if (!comment) {
      return next(new Exception.CommentNotFound());
    }

    res.status(201).send(comment);
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment: IComment | null = await commentModel.findById(req.params.commentId);

    if (!comment) {
      return next(new Exception.CommentNotFound());
    }

    if (String(comment.createdBy) !== String(req.user._id)) {
      return next(new Exception.Unauthorized());
    }
    comment.content = req.body.content;
    await comment.save();

    res.status(201).send(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment: IComment | null = await commentModel.findById(req.params.commentId);

    if (!comment) {
      return next(new Exception.CommentNotFound());
    }

    if (String(comment.createdBy) !== String(req.user._id)) {
      return next(new Exception.Unauthorized());
    }

    const post = await postModel.findOneAndUpdate({ _id: comment.post }, { $pull: { comments: { $eq: comment._id } } });

    if (!post) {
      return res.status(404).send({ error: { message: 'Post not found.' } });
    }

    await comment.delete();
    res.status(201).send(comment);
  } catch (error) {
    next(error);
  }
};
