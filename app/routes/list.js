//~import modules
import { Router } from 'express';
const router = Router();

import { createList, deleteList, fetchAllLists, fetchOneList, updateList, updateTest } from '../controllers/listController.js'

//^===============LIST
router.get('/lists', fetchAllLists);
router.post('/lists', createList);

router.get('/lists/:id', fetchOneList);
router.patch('/lists/:id', updateList);
router.put('/lists/:id', updateTest);
router.delete('/lists/:id', deleteList);

export { router };