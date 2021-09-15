import { Request, Response, NextFunction } from 'express';
import postModel from '../models/post.model';
import { IPost } from '../interfaces/post.interface';
import userModel from '../models/user.model';

const create = async (req: Request, res: Response, next: NextFunction) => {
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

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await postModel.find().populate('createdBy', 'username').exec();
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};

const findByUserName = async (req: Request, res: Response, next: NextFunction) => {
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
export default { create, findAll, findByUserName };
