import { Request, Response, NextFunction } from 'express';
import postValidator from '../validators/post.validator';

const create = (req: Request, res: Response, next: NextFunction) => {
    const { error } = postValidator.create.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}

export default {create}