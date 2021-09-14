import { Request, Response, NextFunction, Express } from 'express';
import userModel from '../models/user.model';
import { IUserDocument } from '../interfaces/user.interface';
import token from '../utils/token';
import passport from '../middlewares/passport';

const register = async (req: Request, res: Response, next: NextFunction) => {
  const newUser: IUserDocument = new userModel(req.body);

  try {
    const user: IUserDocument | null = await userModel.findOne({
      $or: [{ email: newUser.email }, { userName: newUser.userName }]
    });

    if (user) {
      const message =
        user.email === newUser.email ? 'Email is already in use' : 'User name is already in use';
      return res.status(403).send({
        error: {
          message
        }
      });
    }

    await newUser.save();
    res.status(201).send({
      message: 'User created',
      user: newUser.email
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
  const { userName, firstName, lastName, email } = req.user;

  res.status(200).send({
    firstName,
    lastName,
    userName,
    email
  });
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.email) {
      const userIsRegistred: boolean = await userModel.userIsRegistred(req.body.email);
      if (userIsRegistred) {
        return res.status(403).send({
          error: {
            message: 'Address mail already exists.'
          }
        });
      }
    }
    const user: IUserDocument | null = await userModel.findOneAndUpdate(
      {
        _id: req.user._id
      },
      { ...req.body, emailIsVerified: !req.body.email }
    );

    res.status(200).send({
      message: 'User updated'
    });
  } catch (err) {
    next(err);
  }
};

export default { login, register, authToken, profile, update };
