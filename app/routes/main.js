//~import modules
import { Router } from 'express';
const router = Router();

import { testDB } from '../controllers/mainController.js';

//~routers
router.get('/', testDB);

export { router };