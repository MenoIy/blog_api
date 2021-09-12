import { Request, Response, NextFunction, Express } from 'express';
import userModel from '../models/user.model';
import { IUserDocument } from '../interfaces/user.interface';
import token from '../utils/token';
import passport from '../middlewares/passport';

const register = async (req: Request, res: Response, next: NextFunction) => {
  const user: IUserDocument = new userModel(req.body);

  try {
    const userIsRegistred: boolean = await userModel.userIsRegistred(req.body.email);

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
  passport.authenticate('login', { session: false }, (error, user, info) => {
    if (error) return next(error);
    if (info) return res.status(400).send(info);

    const payload = { _id: user._id };
    req.token = token.create(payload);
    next();
  })(req, res, next);
};

const authToken = (req: Request, res: Response) => {
  res.status(200).send({ authToken: req.token });
};

const profile = (req: Request, res: Response, next: NextFunction) => {
  const { userName, email } = req.user;
  console.log(req.user);
  res.status(200).send({
    userName: userName,
    email: email
  });
};

export default { login, register, authToken, profile };
