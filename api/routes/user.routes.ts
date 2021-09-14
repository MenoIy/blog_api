import express, { Router } from 'express';
import userMiddleware from '../middlewares/user.middleware';
import userController from '../controllers/user.controller';

const router: Router = express.Router();

router.post('/register', userMiddleware.register, userController.register); // need to send mail later !
router.post('/login', userMiddleware.login, userController.login, userController.authToken);
router.get('/', userMiddleware.auth, userController.profile);
router.patch('/profile', userMiddleware.auth, userMiddleware.update, userController.update);
//router.get('/:userName', userMiddleware.getUser, userController.getUser);

export default router;
