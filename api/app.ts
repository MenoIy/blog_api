require('dotenv').config();

import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import errorMiddleware from './middlewares/error.middleware';
import HttpException from './exceptions/HttpException';
import userRoutes from './routes/user.routes';

mongoose.connect(process.env.DB_URL || 'mongodb://127.0.0.1:27017/blog', () =>
    console.log('MongoDB connected successfully.')
);
mongoose.Promise = global.Promise;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/user', userRoutes);

app.use((request: Request, response: Response, next: NextFunction) => {
    const error = new HttpException(404, 'Not found');
    next(error);
});

app.use(errorMiddleware);

export default app;
