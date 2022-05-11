//~import modules
import { Router } from 'express';
const router = Router();

//~routers
import { router as mainRouter } from './main.js';
router.use(mainRouter);

export { router };