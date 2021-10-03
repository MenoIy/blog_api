import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { errorMiddleware } from './middlewares/error.middleware';
import { HttpException } from './exceptions/';
import * as routes from './routes';

dotenv.config();

try {
  mongoose.connect(process.env.DB_URL || '', () => console.log('MongoDB connected successfully.'));
} catch (error) {
  console.log("Can't connect to mongodb");
}
mongoose.Promise = global.Promise;

const app = express();

app.use(morgan('dev'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/setup', routes.setup);
app.use('/api/v1/users', routes.userRoutes);
app.use('/api/v1/posts', routes.postRoutes);
app.use('/api/v1/users', routes.postRoutes);
app.use('/api/v1/posts', routes.commentRoutes);
app.use('/api/v1/comments', routes.commentRoutes);

app.use((request: Request, response: Response, next: NextFunction) => {
  const error = new HttpException(404, 'Not found');
  next(error);
});

app.use(errorMiddleware);

export default app;
