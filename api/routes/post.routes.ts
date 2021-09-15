import { Router } from 'express';
import * as postMiddleware from '../middlewares/post.middleware';
import postController from '../controllers/post.controller';
import { Authenticated } from '../middlewares/auth';


const router: Router = Router();

router.post('/add', Authenticated, postMiddleware.addPost, postController.addPost);

router.get('/:username', postMiddleware.getPostByUsername, postController.getPostByUsername);
router.get('/', postController.getPosts);

router.delete('/:id', Authenticated, postMiddleware.deletePost, postController.deletePost);

router.patch('/:id', Authenticated, postMiddleware.updatePost, postController.updatePost)

export default router;
