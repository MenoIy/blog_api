import express from 'express';
import userMiddleware from '../middlewares/user.middleware';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/create', userMiddleware.register, userController.register);
router.post('/login', userMiddleware.login, userController.login);

export default router;
