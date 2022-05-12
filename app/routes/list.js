//~import modules
import { Router } from 'express';
const router = Router();

import { createList, fetchAllLists } from '../controllers/listController.js'

//^===============LIST
router.get('/lists', fetchAllLists);
router.post('/lists', createList);

router.get('/lists/:id');
router.patch('/lists/:id');
router.delete('/lists/:id');

export { router };