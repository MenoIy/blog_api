import { Request, Response, NextFunction } from 'express';
import * as commentValidator from '../validators/comment.validator'


export const addComment = (req : Request, res : Response, next : NextFunction) => {
    const { error } = commentValidator.addSchema.validate({body : req.body, params : req.params});

    if (error){
        res.status(400).send({ error : { message : error.message} })
    }
    next();
}