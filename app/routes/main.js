//~import modules
import { Router } from 'express';
const router = Router();

import { testDB } from '../controllers/mainController.js';

//~routers
router.get('/', testDB);

//^===============LIST
router.get('/lists');
router.post('/lists');

router.get('/lists/:id');
router.patch('/lists/:id');
router.delete('/lists/:id');

//^===============CARD
router.get('/cards');
router.post('/cards');

router.get('/cards/:id');
router.patch('/cards/:id');
router.delete('/cards/:id');

//^================TAG
router.get('/tags');
router.post('/tags');

router.get('/tags/:id');
router.patch('/tags/:id');
router.delete('/tags/:id');
router.put('/tags/:id');


export { router };