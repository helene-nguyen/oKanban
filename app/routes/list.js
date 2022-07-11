//~import modules
import { Router } from 'express';
const router = Router();

import { createList, deleteList, fetchAllLists, fetchOneList, updateList } from '../controllers/listController.js';


import { auth, admin } from '../middlewares/auth.js';

//^===============LIST
router.get('/lists', fetchAllLists);
router.post('/lists', createList);

router.get('/lists/:id', fetchOneList);
router.patch('/lists/:id', updateList);
router.delete('/lists/:id', deleteList);

export { router };
