import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { userModel, mailModel } from '../models';
import { IUserDocument, IMail, IUpdateUser, IUser } from '../interfaces';

import token from '../utils/token';
import * as mail from '../utils/mail';
import passport from '../middlewares/passport';

dotenv.config();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const newUser: IUserDocument = new userModel(req.body);

  try {
    // check if email already exist
    const emailExists: boolean = await userModel.emailExists(req.body.email);
    if (emailExists) {
      return res.status(403).send({ email: 'Address mail already exists' });
    }

    // check if username already exist
    const usernameExists: boolean = await userModel.usernameExists(req.body.username);
    if (usernameExists) {
      return res.status(403).send({ username: 'username already exists' });
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
    const errorMessage: { [key: string]: string } = {
      username: "Username you entered isn't connected to an account",
      password: "The password that you've entered is incorrect",
      email: 'account not verified, visit you email to verify'
    };
    if (error) return next(error);
    if (info) return res.status(400).send({ [info.message]: errorMessage[info.message] });

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
  res.status(200).cookie('token', req.token, { httpOnly: true }).send({ message: 'Connected' });
};

export const me = (req: Request, res: Response, next: NextFunction) => {
  const { _id, username, firstName, lastName, email } = req.user;

  res.status(200).send({ _id, firstName, lastName, username, email });
};

export const getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check if user exist
    const user: IUserDocument | null = await userModel.findOne({ username: req.params.username });
    if (!user) {
      return res.status(401).send({ error: { message: 'User not found.' } });
    }

    const { _id, username, firstName, lastName, email } = user;
    res.status(200).send({ _id, username, firstName, lastName, email });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = req.query.limit ?? 0; // default 0 if limit is not specified in request query
    const users: IUserDocument[] = await userModel
      .find()
      .select('_id username firstName LastName email')
      .sort({ createdAt: -1 })
      .limit(Number(limit));
    res.status(200).send({ users });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newInfo: IUpdateUser = { ...req.body };

    if (req.body?.email !== req.user.email) {
      const emailExists: boolean = await userModel.emailExists(req.body.email);
      if (emailExists) {
        return res.status(403).send({ email: 'email already exists' });
      }
    }

    if (req.body?.username !== req.user.username) {
      const usernameExists: boolean = await userModel.usernameExists(req.body.username);
      if (usernameExists) {
        return res.status(403).send({ username: 'username already exists' });
      }
    }

    // do not update if its the same email or username
    if (req.body?.email === req.user.email) {
      delete newInfo.email;
    }
    if (req.body?.username === req.user.username) {
      delete newInfo.username;
    }

    const user: IUserDocument | null = await userModel.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(401).send({ error: { message: 'User not found.' } });
    }

    newInfo.emailIsVerified = !(newInfo.email && newInfo.email != req.user.email);

    if (newInfo.password) {
      newInfo.password = await bcrypt.hash(newInfo.password, 10);
    }

    await user.update(newInfo);

    res.status(200).send({ message: 'User updated' });
  } catch (err) {
    next(err);
  }
};

export const sendMail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id, username, firstName, lastName, email } = res.locals.user;
    const payload = { _id, email };
    const verifyMail: IMail = new mailModel({
      user: _id,
      token: token.create(payload)
    });

    await verifyMail.save();

    const body: string = process.env.HOST + ':' + process.env.PORT + '/users/verify/' + verifyMail.token;
    mail.sendMail(email, 'Account activation', body);
    res.status(201).send({ _id, username, firstName, lastName, email });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check if address mail is valide
    const mail = await mailModel.findOne({ token: req.params.token });
    if (!mail) {
      return res.status(403).send({ error: { message: 'Invalid token' } });
    }
    const user: IUserDocument | null = await userModel.findOne({ _id: mail.user });

    if (!user) {
      return res.status(404).send({ error: { message: 'User not found.' } });
    }
    if (user.emailIsVerified) {
      return res.status(403).send({ error: { message: 'Invalid token' } });
    }
    await user.update({ emailIsVerified: true });
    await mail.delete();
    res.status(200).send({ message: 'Email verified' });
  } catch (error) {
    next(error);
  }
};
