import { Router } from 'express';
import { signup } from './controllers/AuthController.ts';

const router = Router();
router.get('/', (req, res) => {
    res.send('Hello, World!');
});
router.post('/signup', signup);

export default router;