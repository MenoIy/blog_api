import express, { Router } from 'express';
import * as userMiddleware from '../middlewares/user.middleware';
import { authenticated } from '../middlewares/auth';
import * as userController from '../controllers/user.controller';

const router: Router = express.Router();


router.post('/', userMiddleware.addUser, userController.addUser); // need to send mail later !
router.post('/login', userMiddleware.loginUser, userController.loginUser, userController.authToken);
router.get('/logout', authenticated, userMiddleware.logoutUser, userController.logoutUser)
router.get('/profile', authenticated, userMiddleware.me ,userController.me);
router.patch('/profile', authenticated, userMiddleware.updateUser, userController.updateUser);
router.get('/:username', userMiddleware.getUser, userController.getUser);
// add delete update

export default router;
