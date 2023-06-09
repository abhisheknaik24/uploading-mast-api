import express, { Router } from 'express';
import authController from '../controllers/authController';

const router: Router = express.Router();

router.post('/signIn', authController.signIn);

router.post('/signUp', authController.signUp);

router.post('/validateEmail', authController.validateEmail);

export default router;
