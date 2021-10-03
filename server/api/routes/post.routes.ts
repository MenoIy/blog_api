import { Router } from 'express';
import * as postMiddleware from '../middlewares/post.middleware';
import * as postController from '../controllers/post.controller';
import { authenticated } from '../middlewares/auth';

export const router: Router = Router();

router.post('/', authenticated, postMiddleware.createPost, postController.createPost);
router.get('/:username/posts', authenticated, postMiddleware.getPostByUsername, postController.getPostByUsername);
router.get('/', authenticated, postController.getPosts);
router.get('/:postId', authenticated, postMiddleware.getPost, postController.getPost);
router.delete('/:postId', authenticated, postMiddleware.deletePost, postController.deletePost);
router.patch('/:postId', authenticated, postMiddleware.updatePost, postController.updatePost);
