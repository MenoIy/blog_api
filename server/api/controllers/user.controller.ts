import { Request, Response, NextFunction, Express } from 'express';
import userModel from '../models/user.model';
import { IUserDocument } from '../interfaces/user.interface';
import { IMail } from '../interfaces/mail.interface';
import mailModel from '../models/mail.model';
import token from '../utils/token';
import * as mail from '../utils/mail';
import passport from '../middlewares/passport';
import dotenv from 'dotenv';

dotenv.config();

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
  const newUser: IUserDocument = new userModel(req.body);

  try {
    if (req.body.email) {
      const emailExists: boolean = await userModel.emailExists(req.body.email);
      if (emailExists) {
        return res.status(403).send({ error: { message: 'email already exists' } });
      }
    }

    if (req.body.username) {
      const usernameExists: boolean = await userModel.usernameExists(req.body.username);
      if (usernameExists) {
        return res.status(403).send({ error: { message: 'username already exists' } });
      }
    }

    await newUser.save();
    res.locals.user = newUser;
    next();
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('login', { session: false }, (error, user, info) => {
    if (error) return next(error);
    console.log('hello :', info);
    if (info) return res.status(400).send(info);

    const payload = { _id: user._id };
    req.token = token.create(payload);
    next();
  })(req, res, next);
};

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('token');

  res.status(200).send({ message: 'User logged out' });
};

export const authToken = (req: Request, res: Response) => {
  res.status(200).cookie('token', req.token, { httpOnly: true }).send({ authToken: req.token });
};

export const me = (req: Request, res: Response, next: NextFunction) => {
  const { username, firstName, lastName, email } = req.user;

  res.status(200).send({ firstName, lastName, username, email });
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUserDocument | null = await userModel.findOne({ username: req.params.username });
    if (!user) {
      return res.status(401).send({ error: { message: 'User not found.' } });
    }
    const { username, firstName, lastName } = user;
    res.status(200).send({ username, firstName, lastName });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.email && req.body.email != req.user.email) {
      const emailExists: boolean = await userModel.emailExists(req.body.email);
      if (emailExists) {
        return res.status(403).send({ error: { message: 'email already exists' } });
      }
    }

    if (req.body.username && req.body.username != req.user.username) {
      const usernameExists: boolean = await userModel.usernameExists(req.body.username);
      if (usernameExists) {
        return res.status(403).send({ error: { message: 'username already exists' } });
      }
    }

    let user: IUserDocument | null = await userModel.findOne({ _id: req.user._id });

    if (!user) return res.status(401).send({ error: { message: 'User not found.' } });
    for (const key in req.body) {
      const value: string = req.body[key];
      user[key] = value;
    }
    user.emailIsVerified = !(req.body.email && req.body.email != req.user.email);
    user.save();

    res.status(200).send({ message: 'User updated' });
  } catch (err) {
    next(err);
  }
};

export const sendMail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    const payload = { _id: user._id, mail: user.mail };
    const verifyMail: IMail = new mailModel({
      user: user._id,
      token: token.create(payload)
    });

    await verifyMail.save();

    const body: string = process.env.HOST + ':' + process.env.PORT + '/users/verify/' + verifyMail.token;
    mail.sendMail(user.email, 'Account activation', body);
    res.status(201).send({ message: 'User created', user: user.email });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mail = await mailModel.findOne({ token: req.params.token });

    if (!mail) {
      return res.status(403).send({ error: { message: 'Invalid token' } });
    }
    const user = await userModel.findOne({ _id: mail.user });

    if (!user) {
      return res.status(404).send({ error: { message: 'User not found.' } });
    }
    if (user.emailIsVerified) {
      return res.status(403).send({ error: { message: 'Invalid token' } });
    }
    user.emailIsVerified = true;
    await user.save();
    await mail.delete();
    res.status(200).send({ message: 'Email verified' });
  } catch (error) {
    next(error);
  }
};
