import { Request, Response, NextFunction, Application } from 'express';
import userModel from '../models/user.model';
import { IUserDocument } from '../interfaces/user.interface';

const register = async (req: Request, res: Response, next: NextFunction) => {
    const user: IUserDocument = new userModel(req.body);

    try {
        const userIsRegistred: boolean = await userModel.userIsRegistred(
            req.body.email
        );

        if (userIsRegistred) {
            return res.status(403).send({
                error: {
                    message: 'Adress mail already exists.'
                }
            });
        }
        await user.save();
        res.status(201).send({
            message: 'User created',
            user: user.email
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    try {
        const user:IUserDocument | null = await userModel.findUserByEmail(email);

        if (!user) {
            return res.status(403).send({
                error : {
                    message : 'Invalide email, account not found'
                }
            })
        }
        const passIsValide = await user.passwordIsValid(password);
        
        if (!passIsValide)
        {
            return res.status(403).send({
                error : {
                    message : 'Password is incorrect.'
                }
            })
        }

        if (!user.emailIsVerified){
            return res.status(403).send({
                error : {
                    message : 'Account non verified !'
                }
            })
        }
        res.status(201).send({
            message: 'User connecter',
            user: user.email
        });
    } catch (error)
    {
        next(error);
    }
};

export default { register, login };
