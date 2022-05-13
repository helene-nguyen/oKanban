//~import modules
import { Router } from 'express';
const router = Router();

import { fetchAllCards, createCard, fetchOneCard, updateCard, deleteCard } from '../controllers/cardController.js';

//^===============CARD
router.get('/cards', fetchAllCards);
router.post('/cards', createCard);

router.get('/cards/:id', fetchOneCard);
router.patch('/cards/:id', updateCard);
router.delete('/cards/:id', deleteCard);


export {router};