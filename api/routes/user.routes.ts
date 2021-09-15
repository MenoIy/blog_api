import express, { Router } from 'express';
import * as userMiddleware from '../middlewares/user.middleware';
import { Authenticated } from '../middlewares/auth';
import userController from '../controllers/user.controller';

const router: Router = express.Router();


router.post('/register', userMiddleware.register, userController.register); // need to send mail later !
router.post('/login', userMiddleware.login, userController.login, userController.authToken);
router.get('/', Authenticated, userController.profile);
router.patch('/profile', Authenticated, userMiddleware.update, userController.update);
router.get('/:username', userMiddleware.getUser, userController.getUser);

// add delete update

export default router;
