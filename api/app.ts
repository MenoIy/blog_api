import express, { Request, Response, NextFunction } from 'express'
import errorMiddleware from './middlewares/error.middleware';
import HttpException from './exceptions/HttpException';

const app = express();

app.use((request: Request, response: Response, next: NextFunction) => {
    const error = new HttpException(404, 'Not found');
    next(error);
});

app.use(errorMiddleware);

export default app;