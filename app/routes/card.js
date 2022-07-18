//~import modules
import { Router } from 'express';
const router = Router();

import {
  fetchAllCards,
  createCard,
  fetchOneCard,
  updateCard,
  deleteCard,
  fetchAllCardsByListId,
  deleteCardsByListId
} from '../controllers/cardController.js';

import { auth, admin } from '../../app/middlewares/auth.js';
import { validateToken } from '../../app/middlewares/validateToken.js';

//^===============CARD
router.get('/cards', [validateToken, auth, admin ],fetchAllCards);
router.post('/cards', createCard);

router.get('/cards/:id', fetchOneCard);
router.patch('/cards/:id', updateCard);
router.delete('/cards/:id', deleteCard);

router.get('/lists/:id/cards', fetchAllCardsByListId);

router.delete('/lists/:id/cards', deleteCardsByListId);

export { router };
