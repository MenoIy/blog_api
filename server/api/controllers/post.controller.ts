import { Request, Response, NextFunction } from 'express';

import { IUserDocument, IPost } from '../interfaces';
import { userModel, postModel } from '../models';
import * as Exception from '../exceptions';

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const post: IPost = new postModel({ ...req.body, createdBy: req.user._id });
  try {
    const user: IUserDocument | null = await userModel.findOne({ _id: req.user._id });
    if (!user) {
      return next(new Exception.UserNotFound());
    }

    user.posts.push(post._id);
    await user.save();
    await post.save();

    res.status(201).send(post);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { offset, limit } = req.query;

    const posts: IPost[] = await postModel
      .find()
      .populate('createdBy', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(offset ? Number(offset) : 0)
      .limit(limit ? Number(limit) : 10);

    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};

export const getPostByUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUserDocument | null = await userModel.findOne(req.params, 'posts').populate('posts');
    if (!user) {
      return next(new Exception.UserNotFound());
    }
    res.status(200).send(user.posts);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post: IPost | null = await postModel.findOne({ _id: req.params.postId });

    if (!post) {
      return next(new Exception.PostNotFound());
    }

    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post: IPost | null = await postModel.findOne({ _id: req.params.postId });
    if (!post) {
      return next(new Exception.PostNotFound());
    }

    if (String(post.createdBy) !== String(req.user._id)) {
      return next(new Exception.Unauthorized());
    }

    const user: IUserDocument | null = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { posts: { $eq: post._id } } }
    );

    if (!user) {
      return next(new Exception.UserNotFound());
    }

    await post.delete();
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post: IPost | null = await postModel.findOne({ _id: req.params.postId });

    if (!post) {
      return next(new Exception.PostNotFound());
    }

    if (String(post.createdBy) !== String(req.user._id)) {
      return next(new Exception.Unauthorized());
    }

    post.body = req.body.body;
    await post.save();
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};
