import {Router} from 'express';
import postMiddleware from '../middlewares/post.middleware';
import postController from '../controllers/post.controller';
import userMiddleware from '../middlewares/user.middleware';

const router : Router = Router();

router.post('/create', userMiddleware.auth, postMiddleware.create, postController.create);
router.get('', postController.findAll);

export default router;