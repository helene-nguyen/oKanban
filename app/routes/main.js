//~import modules
import { Router } from 'express';
const router = Router();

import { testDB } from '../controllers/mainController.js';

//~routers
router.get('/', testDB);
router.post('/', (req, res) => {
    res.json('Blabla')
});

export { router };