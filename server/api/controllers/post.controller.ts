import { Request, Response, NextFunction } from 'express';
import postModel from '../models/post.model';
import { IPost } from '../interfaces/post.interface';
import { IUserDocument } from '../interfaces/user.interface';
import userModel from '../models/user.model';

export const addPost = async (req: Request, res: Response, next: NextFunction) => {
  const post: IPost = new postModel({ ...req.body, createdBy: req.user._id });
  try {
    const user: IUserDocument | null = await userModel.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).send({ error: { message: 'User not found.' } });
    }

    user.posts.push(post._id);
    await user.save();
    await post.save();

    res.status(201).send({
      message: 'Post created',
      post: post
    });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await postModel.find().populate('createdBy', 'username');
    res.status(200).send({ posts });
  } catch (error) {
    next(error);
  }
};

export const getPostByUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.findOne(req.params, 'posts').populate('posts');
    if (!user) {
      return res.status(404).send({ error: { message: 'User not found.' } });
    }
    res.status(200).send({ data: user.posts });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post: IPost | null = await postModel.findOne({ _id: req.params.postId });

    if (!post) {
      return res.status(404).send({ error: { message: 'Post not found.' } });
    }

    res.status(200).send({ post });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post: IPost | null = await postModel.findOne({ _id: req.params.postId });

    if (!post) {
      return res.status(404).send({ error: { message: 'Post not found.' } });
    }
    if (String(post.createdBy) !== String(req.user._id)) {
      return res.status(401).send({ error: { message: 'Unauthorized' } });
    }
    const user = await userModel.findOneAndUpdate({ _id: req.user._id }, { $pull: { posts: { $eq: post._id } } });

    if (!user) {
      return res.status(404).send({ error: { message: 'User not found.' } });
    }

    await post.delete();
    res.status(200).send({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post: IPost | null = await postModel.findOne({ _id: req.params.postId });

    if (!post) {
      return res.status(404).send({ error: { message: 'Post not found.' } });
    }

    if (String(post.createdBy) !== String(req.user._id)) {
      return res.status(403).send({ error: { message: 'Unauthorized' } });
    }

    post.body = req.body.body;
    await post.save();
    res.status(200).send({ message: 'Post updated', data: post });
  } catch (error) {
    next(error);
  }
};
