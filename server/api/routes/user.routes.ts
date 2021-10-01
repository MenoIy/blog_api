import express, { Router } from 'express';

import { authenticated } from '../middlewares/auth';
import * as userMiddleware from '../middlewares/user.middleware';
import * as userController from '../controllers/user.controller';

export const router: Router = express.Router();

router.post('/', userMiddleware.createUser, userController.createUser, userController.sendMail);
router.post('/login', userMiddleware.loginUser, userController.loginUser, userController.authToken);

router.get('/logout', authenticated, userMiddleware.logoutUser, userController.logoutUser);
router.get('/verify/:token', userMiddleware.verifyEmail, userController.verifyEmail);

router.get('/me', authenticated, userMiddleware.me, userController.me);
router.get('/:username', authenticated, userMiddleware.getUserByUsername, userController.getUserByUsername);
router.get('/', authenticated, userMiddleware.getUsers, userController.getUsers);
//TODO getUserbyId

router.patch('/profile', authenticated, userMiddleware.updateUser, userController.updateUser);
