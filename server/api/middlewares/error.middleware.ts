import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/';

export const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'something wrong.';
  response.status(status).send({
    status,
    message
  });
};
