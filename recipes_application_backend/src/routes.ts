import { Router } from 'express';
import { signup, login } from './controllers/AuthController.ts';
import {verifyToken} from './middleware/Auth.ts';

const router = Router();

router.get('/', verifyToken,(req, res) => {
    res.send('Hello, World!');
});

router.post('/signup', signup);
router.post('/login',login);

export default router;