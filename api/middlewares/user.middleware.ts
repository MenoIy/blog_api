import { Request, Response, NextFunction } from 'express';
import userValidator from '../validators/user.validator';
import passport from './passport'
import userModel from '../models/user.model';
import { IUserDocument } from '../interfaces/user.interface';

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


const auth = (req : Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', {
        session: false
    }, async (error, user) => {
        if (error) return next(error);
        try{
            const found :IUserDocument|null = await userModel.findById({_id : user._id});
            if(found) {
                req.user = found;
                next();
            }
            else {
                res.status(401).json({
                    error: {
                        message: 'Invalid token'
                    }
                });
            }

        }catch(error){
            res.status(400).json({
                error: {
                    message: 'Unauthorized'
                }
            });
        }  
    })(req, res, next);
}

export default { register, login , auth};
