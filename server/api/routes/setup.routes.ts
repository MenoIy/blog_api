import express, { Router } from 'express';
import * as setup from '../setup';

export const router: Router = express.Router();

router.post('/', setup.clear, setup.loadUsers, setup.loadContents);
