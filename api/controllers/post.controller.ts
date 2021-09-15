import { Request, Response, NextFunction } from 'express';
import postModel from '../models/post.model';
import { IPost } from '../interfaces/post.interface';
import userModel from '../models/user.model';

const addPost = async (req: Request, res: Response, next: NextFunction) => {
  const post: IPost = new postModel({ ...req.body, createdBy: req.user._id });
  try {
    await post.save();
    res.status(201).send({
      message: 'Post created'
    });
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await postModel.find().populate('createdBy', 'username').exec();
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};

const getPostByUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.findOne(req.params);
    if (!user) {
      return res.status(401).send({
        error: {
          message: 'User not found.'
        }
      });
    }
    const posts = await postModel.find({ createdBy: user._id }).exec();
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post: IPost | null = await postModel.findOne({ _id: req.params.id });

    if (!post) {
      return res.status(403).send({ error: { message: 'Post not found' } });
    }
    if (String(post.createdBy) !== String(req.user._id)) {
      return res.status(403).send({ error: { message: 'Unauthorized' } });
    }

    await post.delete();
    res.status(200).send({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post: IPost | null = await postModel.findOne({ _id: req.params.id });

    if (!post) {
      return res.status(403).send({ error: { message: 'Post not found' } });
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

export default { addPost, getPosts, getPostByUsername, deletePost, updatePost };
