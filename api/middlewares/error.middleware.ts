import HttpException from '../exceptions/HttpException'
import { Request, Response, NextFunction } from 'express'


const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'something wrong.'
    response.status(status).json({
        error: {
            message
        }
    })
}

export default errorMiddleware;