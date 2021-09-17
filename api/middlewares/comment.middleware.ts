import { Request, Response, NextFunction } from 'express';
import * as commentValidator from '../validators/comment.validator'


export const addComment = (req : Request, res : Response, next : NextFunction) => {
    const { error } = commentValidator.addCommentSchema.validate({body : req.body, params : req.params});

    if (error){
        return res.status(400).send({ error : { message : error.message} })
    }
    next();
}
 
export const getComments = (req : Request, res : Response, next : NextFunction) => {
    const { error } = commentValidator.getCommentsSchema.validate(req.params);

    if (error){
        return res.status(400).send({ error : { message : error.message} })
    }
    next();
}

export const getComment = (req : Request, res : Response, next : NextFunction) => {
    const { error } = commentValidator.getCommentSchema.validate(req.params);

    if (error){
        return res.status(400).send({ error : { message : error.message} })
    }
    next()
}

export const updateComment = (req : Request, res : Response, next : NextFunction) => {
    const { error } = commentValidator.updateCommentSchema.validate({body : req.body, params : req.params});

    if (error){
        return res.status(400).send({ error : { message : error.message} })
    }
    next()
}

export const deleteComment = (req : Request, res : Response, next : NextFunction) => {
    const { error } = commentValidator.deleteCommentSchema.validate(req.body.params);

    if (error){
        return res.status(400).send({ error : { message : error.message} })
    }
    next()
}