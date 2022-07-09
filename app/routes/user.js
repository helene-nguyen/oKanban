//~import modules
import { Router } from 'express';
const router = Router();

import { fetchOneUser, signInUser, createUser, updateUser, deleteUser, signOutUser } from '../controllers/userController.js';

import { auth, admin } from '../middlewares/auth.js';

//^===============USER
//form
router.get('/users/profile/:id', auth, fetchOneUser); //fetch
router.post('/users/signin', signInUser); //signin (logIn)

router.post('/users/signup', createUser); //create

router.get('/users/signout', signOutUser); // Deconnexion signOut

router.patch('/users/profile/:id', updateUser); //update
router.delete('/users/profile/:id', deleteUser); //delete

export { router };