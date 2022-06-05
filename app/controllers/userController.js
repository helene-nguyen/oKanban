//~import modules
import { _401, _404, _500 } from './errorController.js';
import { User } from '../models/user.js';
//security
import bcrypt from 'bcrypt';
import emailValidator from 'email-validator';
import passwordValidator from 'password-validator';
const schema = new passwordValidator();
//Add properties
// schema.is().min(6); // Minimum length 6 // Blacklist these values
/* .is().max(100) // Maximum length 100
.has().uppercase(1) // Must have uppercase letters
.has().lowercase(1) // Must have lowercase letters
.has().digits(2) // Must have at least 2 digits
.has().symbols(1) // Must have at least 1 symbol
.has().not().spaces() // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']) */
//~controller
//~ ------------------------------------------------ PROFIL PAGE
async function fetchOneUser(req, res) {
  try {
    const targetId = +req.params.id;
    if (isNaN(targetId)) return res.json(`Target id is not a number !`);

    const user = await User.findByPk(targetId);
    if (!user) return res.json(`User doesn't exist !`);

    res.status(200).json(user);
  } catch (err) {
    _500(err, req, res);
  }
}

//~ ------------------------------------------------ SIGN IN
async function signInUser(req, res) {
  try {
    //get datas
    let { email, password } = req.body;

    //email validation
    if (!emailValidator.validate(email)) return res.json(`${email} is not a valid email !`);

    //if ok, find the user
    const user = await User.findOne({
      where: { email }
    });

    //-check if user exist
    if (!user) return res.json(`User doesn't exist !`);

    //security
    const validatePassword = await bcrypt.compare(password, user.password);

    //^condition
    if (!validatePassword) return res.json('Please retry, email or password do not match !');

    return res.status(200).res.json(`Hello ${user.firstname}`);
  } catch (err) {
    _500(err, req, res);
  }
}

//~ ------------------------------------------------ CREATE
async function createUser(req, res) {
  try {
  } catch (err) {
    _500(err, req, res);
  }
}

//~ ------------------------------------------------ UPDATE
async function updateUser(req, res) {
  try {
  } catch (err) {
    _500(err, req, res);
  }
}

//~ ------------------------------------------------ DELETE
async function deleteUser(req, res) {
  try {
  } catch (err) {
    _500(err, req, res);
  }
}

export { fetchOneUser, signInUser, createUser, updateUser, deleteUser };
