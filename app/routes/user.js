/* //~import modules
import { Router } from 'express';
const router = Router();

//^===============USER
router.get('/profile');
router.post('/signin');
router.post('/signup');

router.patch('/lists/:id');
router.delete('/lists/:id');

export { router }; */