import { Request, Response, NextFunction } from 'express';
import commentModel from '../models/comment.model';
import postModel from '../models/post.model';
import { IComment } from '../interfaces/comment.interface';
import { IPost } from '../interfaces/post.interface';

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment: IComment = new commentModel({ ...req.body, createdBy: req.user._id, post: req.params.postId });
    const post: IPost | null = await postModel.findById(req.params.postId);

    if (!post) {
      return res.status(404).send({ error: { message: 'Post not found.' } });
    }
    post.comments.push(comment._id);
    await post.save();
    await comment.save();

    res.status(201).send({ message: 'Comment created.', comment: comment });
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post: IPost | null = await postModel.findById(req.params.postId, 'comments').populate('comments');
    if (!post) {
      return res.status(404).send({ error: { message: 'Post not found.' } });
    }

    res.status(201).send({ data: post.comments });
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment: IComment | null = await commentModel.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).send({ error: { message: 'Comment not found.' } });
    }

    res.status(201).send({ data: comment });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment: IComment | null = await commentModel.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).send({ error: { message: 'Comment not found.' } });
    }

    if (String(comment.createdBy) !== String(req.user._id)) {
      return res.status(401).send({ error: { message: 'Unauthorized' } });
    }
    comment.content = req.body.content;
    await comment.save();

    res.status(201).send({ message: 'Comment updated.', data: comment });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment: IComment | null = await commentModel.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).send({ error: { message: 'Comment not found.' } });
    }

    if (String(comment.createdBy) !== String(req.user._id)) {
      return res.status(401).send({ error: { message: 'Unauthorized' } });
    }

    const post = await postModel.findOneAndUpdate({ _id: comment.post }, { $pull: { comments: { $eq: comment._id } } });

    if (!post) {
      return res.status(404).send({ error: { message: 'Post not found.' } });
    }

    await comment.delete();
    res.status(201).send({ message: 'Comment deleted.' });
  } catch (error) {
    next(error);
  }
};
