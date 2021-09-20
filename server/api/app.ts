import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware';
import { HttpException } from './exceptions/HttpException';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';
import commentRoutes from './routes/comment.routes';
import cors from 'cors';

dotenv.config();

mongoose.connect(process.env.DB_URL || '', () => console.log('MongoDB connected successfully.'));
mongoose.Promise = global.Promise;

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/users', postRoutes);
app.use('/posts', commentRoutes);
app.use('/comments', commentRoutes);

app.use((request: Request, response: Response, next: NextFunction) => {
  const error = new HttpException(404, 'Not found');
  next(error);
});

app.use(errorMiddleware);

export default app;
