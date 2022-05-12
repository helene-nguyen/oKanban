//~import modules
import { Router } from 'express';
const router = Router();

//^===============CARD
router.get('/cards');
router.post('/cards');

router.get('/cards/:id');
router.patch('/cards/:id');
router.delete('/cards/:id');

export { router };