import express, { Router } from 'express';
import * as commentMiddleware from '../middlewares/comment.middleware'
import * as commentController from '../controllers/comment.controller'
import { authenticated } from '../middlewares/auth';

const router: Router = express.Router();

router.post('/:id/comments/add', authenticated, commentMiddleware.addComment, commentController.addComment);

export default router;