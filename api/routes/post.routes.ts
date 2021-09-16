import { Router } from 'express';
import * as postMiddleware from '../middlewares/post.middleware';
import postController from '../controllers/post.controller';
import { authenticated } from '../middlewares/auth';


const router: Router = Router();

router.post('/add', authenticated, postMiddleware.addPost, postController.addPost);

router.get('/:username', postMiddleware.getPostByUsername, postController.getPostByUsername);
router.get('/', postController.getPosts);

router.delete('/:id', authenticated, postMiddleware.deletePost, postController.deletePost);

router.patch('/:id', authenticated, postMiddleware.updatePost, postController.updatePost)

export default router;
