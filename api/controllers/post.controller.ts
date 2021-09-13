import { Request, Response, NextFunction } from 'express';
import postModel from '../models/post.model';
import { IPost } from '../interfaces/post.interface';

const create = async (req: Request, res: Response, next: NextFunction) => {
    const post:IPost = new postModel({...req.body, createdBy: req.user._id});
    try {
        await post.save();
        res.status(201).send({
            message: 'Post created',
          });

    }catch(error)
    {
        next(error);
    }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await postModel.find().exec();
        res.status(200).send(posts);
    }catch(error)
    {
        next(error);
    }
};

export default {create, findAll}