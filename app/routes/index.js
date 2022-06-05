//~import modules
import { Router } from 'express';
const router = Router();

//~routers
//main
import { router as mainRouter } from './main.js';
router.use(mainRouter);
//user
import { router as userRouter } from './user.js';
router.use(userRouter);
//list
import { router as listRouter } from './list.js';
router.use(listRouter);
//card
import { router as cardRouter } from './card.js';
router.use(cardRouter);
//tag
import { router as tagRouter } from './tag.js';
router.use(tagRouter);

export { router };
