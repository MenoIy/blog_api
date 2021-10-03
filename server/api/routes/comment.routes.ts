import express, { Router } from 'express';

import * as commentMiddleware from '../middlewares/comment.middleware';
import * as commentController from '../controllers/comment.controller';
import { authenticated } from '../middlewares/auth';

export const router: Router = express.Router();

router.post('/:postId/comments', authenticated, commentMiddleware.createComment, commentController.createComment);
router.get('/:postId/comments', authenticated, commentMiddleware.getComments, commentController.getComments);
router.get('/:commentId', authenticated, commentMiddleware.getComment, commentController.getComment);
router.patch('/:commentId', authenticated, commentMiddleware.updateComment, commentController.updateComment);
router.delete('/:commentId', authenticated, commentController.deleteComment, commentController.deleteComment);
