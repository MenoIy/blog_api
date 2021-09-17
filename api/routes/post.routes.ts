import { Router } from 'express';
import * as postMiddleware from '../middlewares/post.middleware';
import * as postController from '../controllers/post.controller';
import { authenticated } from '../middlewares/auth';


const router: Router = Router();


router.post('/', authenticated, postMiddleware.addPost, postController.addPost);
router.get('/:username/posts', postMiddleware.getPostByUsername, postController.getPostByUsername);
router.get('/', postController.getPosts);

router.get('/:postId', postMiddleware.getPost, postController.getPost);
router.delete('/:postId', authenticated, postMiddleware.deletePost, postController.deletePost);
router.patch('/:postId', authenticated, postMiddleware.updatePost, postController.updatePost)

export default router;
