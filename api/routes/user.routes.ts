import express from 'express'
import userMiddleware from '../middlewares/user.middleware'
import userController from '../controllers/user.controller'

const router = express.Router();

router.post('/create', userMiddleware.createUser, userController.create);

export default router;