import { Request, Response, NextFunction } from 'express';

import { userModel, commentModel, postModel } from '../models';
import { IUserDocument, IPost } from '../interfaces';
import * as Exception from '../exceptions';

import usersDb from './users_data.json';
import postsDb from './posts_data.json';
import commentsDb from './comments_data.json';

export const clear = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userModel.collection.drop();
    await postModel.collection.drop();
    await commentModel.collection.drop();
    next();
  } catch (error) {
    next(error);
  }
};

export const loadUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userModel.insertMany(usersDb);
    await userModel.updateMany(
      {},
      { emailIsVerified: true, avatar: `uploads/${Math.floor(Math.random() * 7) + 1}.png` }
    );
    next();
  } catch (error) {
    next(error);
  }
};

export const loadContents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users: IUserDocument[] = await userModel.find({});
    if (!users) return next(new Exception.UserNotFound());

    const posts = postsDb.map((post, index) => {
      const user: IUserDocument = users[index];
      const newPost: IPost = new postModel({ body: post.body, createdBy: user._id });

      user.posts.push(newPost._id);

      commentsDb.map((comment) => {
        const newComment = new commentModel({
          content: comment.content,
          createdBy: users[Math.floor(Math.random() * 100)]._id,
          post: newPost.id
        });
        newPost.comments.push(newComment._id);
        newComment.save();
      });
      user.save();
      return newPost;
    });
    await postModel.insertMany(posts);
    res.status(201).send({ message: 'Setup done' });
  } catch (error) {
    next(error);
  }
};
