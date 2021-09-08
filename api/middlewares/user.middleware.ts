import { Request, Response, NextFunction, Application } from 'express';
import userValidator from '../validators/user.validator';

const register = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userValidator.register.validate(req.body);

    if (!error) return next();
    res.status(400).json({
        error: {
            message: error.message
        }
    });
};

const login = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userValidator.login.validate(req.body);

    if (!error) return next();
    res.status(400).json({
        error: { message: error.message }
    });
};

export default { register, login };
