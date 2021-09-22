import { Request, Response, NextFunction, Express } from 'express';
import userModel from '../models/user.model';
import postModel from '../models/post.model';
import usersDb from './users_data.json';
import postsDb from './posts_data.json';
import commentsDb from './comments_data.json';
import commentModel from '../models/comment.model';
import { IUserDocument } from '../interfaces/user.interface';
import { IPost } from '../interfaces/post.interface';

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
    await userModel.updateMany({}, { emailIsVerified: true });
    next();
  } catch (error) {
    next(error);
  }
};

export const loadContents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.find({});
    if (!users) return res.status(404).send({ error: { message: 'users not Found' } });

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

    next();
  } catch (error) {
    next(error);
  }
};
