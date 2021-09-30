import express, { Router } from 'express';

import * as commentMiddleware from '../middlewares/comment.middleware';
import * as commentController from '../controllers/comment.controller';
import { authenticated } from '../middlewares/auth';

export const router: Router = express.Router();

router.post('/:postId/comments', authenticated, commentMiddleware.addComment, commentController.addComment);
router.get('/:postId/comments', commentMiddleware.getComments, commentController.getComments);
router.get('/:commentId', commentMiddleware.getComment, commentController.getComment);
router.patch('/:commentId', authenticated, commentMiddleware.updateComment, commentController.updateComment);
router.delete('/:commentId', authenticated, commentController.deleteComment, commentController.deleteComment);
