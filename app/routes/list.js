//~import modules
import { Router } from 'express';
const router = Router();

import { createList, fetchAllLists, fetchOneList, updateList } from '../controllers/listController.js'

//^===============LIST
router.get('/lists', fetchAllLists);
router.post('/lists', createList);

router.get('/lists/:id', fetchOneList);
router.patch('/lists/:id', updateList);
router.delete('/lists/:id');

export { router };