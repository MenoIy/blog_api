import { Request, Response, NextFunction } from 'express';
import { commentModel, postModel, userModel } from '../models';
import { IComment, IPost, IUserDocument } from '../interfaces';

import * as Exception from '../exceptions';

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment: IComment = new commentModel({ ...req.body, createdBy: req.user._id, post: req.params.postId });
    const post: IPost | null = await postModel.findById(req.params.postId);

    if (!post) {
      return next(new Exception.PostNotFound());
    }
    post.comments.push(comment._id);

    await userModel.updateOne({ id: req.user._id }, { $push: { comments: comment._id } });
    await post.save();
    await comment.save();

    res.status(201).send(comment);
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 3;
    const post: IPost | null = await postModel.findById(req.params.postId, 'comments');
    if (!post) {
      return next(new Exception.PostNotFound());
    }
    const comments = await commentModel
      .find({ _id: { $in: post.comments } })
      .populate('createdBy', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

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
      return next(new Exception.Forbidden());
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
      return next(new Exception.PostNotFound());
    }

    const user: IUserDocument | null = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { comments: { $eq: comment._id } } }
    );

    if (!user) {
      return next(new Exception.UserNotFound());
    }

    await comment.delete();
    res.status(201).send(comment);
  } catch (error) {
    next(error);
  }
};
