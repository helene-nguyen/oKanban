//~import modules
import { Router } from 'express';
const router = Router();

import { fetchOneUser, signInUser, createUser, updateUser, deleteUser } from '../controllers/userController.js';

//^===============USER
//form
router.get('/users/profile/:id', fetchOneUser); //fetch
router.post('/users/signin', signInUser);//signin (logIn)

router.post('/users/signup', createUser);//create

router.patch('/users/profile/:id', updateUser); //update
router.delete('/users/profile/:id', deleteUser); //delete

export { router };
