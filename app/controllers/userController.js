//~import modules
import errorAPI from './errorController.js';
import { User } from '../models/user.js';
//security
import bcrypt from 'bcrypt';
import emailValidator from 'email-validator';
import passwordValidator from 'password-validator';
const schema = new passwordValidator();
//Add properties
schema.is().min(6); // Minimum length 6 // Blacklist these values
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
    if (isNaN(targetId)) return errorAPI({ message: `Target id is not a number !` }, req, res, 400);

    const user = await User.findByPk(targetId);
    if (!user) return errorAPI({ message: `User doesn't exist !` }, req, res, 400);

    res.status(200).json(user);
  } catch (err) {
    errorAPI(err, req, res,500);
  }
}

//~ ------------------------------------------------ SIGN IN
async function signInUser(req, res) {
  try {
    //get datas
    let { email, password } = req.body;

    //email validation
    if (!emailValidator.validate(email)) return errorAPI({ message: `${email} is not a valid email !` }, req, res, 401);

    //if ok, find the user
    const user = await User.findOne({
      where: { email }
    });

    //-check if user exist
    if (!user) return errorAPI({ message: `User doesn't exist !` }, req, res, 400);

    //security
    const validatePassword = await bcrypt.compare(password, user.password);

    //^condition
    if (!validatePassword) return errorAPI({ message: 'Please retry, email or password do not match !' }, req, res, 401);

    //&------------------- SESSION
    req.session.user = user;
    //delete datavalues password to protect data
    delete user.dataValues.password;
    //&------------------- SESSION

    return res.status(200).json(user);
  } catch (err) {
    errorAPI(err, req, res,500);
  }
}

//~ ------------------------------------------------ CREATE
async function createUser(req, res) {
  try {
    //get datas
    let { firstname, email, password, passwordConfirm } = req.body;
    //-check if user exist
    const user = await User.findOne({ where: { email } });

    //-check entries
    if (user) return errorAPI({ message: `This ${email} already exist, please retry !` }, req, res, 401);
    if (!emailValidator.validate(email)) return errorAPI({ message: `${email} is not a valid email !` }, req, res, 401);
    if (!schema.validate(password)) return errorAPI({ message: 'Password must contains 6 char.' }, req, res, 401);
    if (password !== passwordConfirm) return errorAPI({ message: 'Not the same password !' }, req, res, 401);
    //if no firstname
    firstname === undefined ? (firstname = '') : firstname;

    //~encrypt password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    //~create user
    await User.create({ ...req.body, password });

    return res.status(201).json(`Welcome ${firstname}, your are registered ! You can now create your Kanban !`);
  } catch (err) {
    errorAPI(err, req, res, 500);
  }
}

//~ ------------------------------------------------ UPDATE
async function updateUser(req, res) {
  try {
    const targetId = +req.params.id;
    if (isNaN(targetId)) return errorAPI({ message: `Target id is not a number` }, req, res, 400);
    //~find user
    const user = await User.findByPk(targetId);
    if (!user) return errorAPI({ message: `User doesn't exist !` }, req, res, 400);

    //&____________get datas__________
    let { firstname, lastname, email, password, passwordConfirm } = req.body;

    //~email exist
    if (email) {
      email !== undefined ? email : email === user.email;
      if (!emailValidator.validate(email)) return errorAPI({ message: `${email} is not a valid email !` }, req, res, 401);
    }

    //~encrypt password if password exist
    if (password) {
      password ? password : password === user.password;
      if (!schema.validate(password)) return errorAPI({ message: 'Password must contains 6 characters' }, req, res, 401);
      if (password !== passwordConfirm) return errorAPI({ message: 'Not the same password !' }, req, res, 401);
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }

    //~update user
    await User.update({ firstname, lastname, email, password }, { where: { id: targetId } });

    res.status(200).json(`User updated !`);
  } catch (err) {
    errorAPI(err, req, res,500);
  }
}

//~ ------------------------------------------------ DELETE
async function deleteUser(req, res) {
  try {
    const targetId = +req.params.id;
    if (isNaN(targetId)) return errorAPI({ message: `Target id is not a number !` }, req, res, 400);

    const user = await User.findByPk(targetId);

    if (!user) return errorAPI({ message: `User doesn't exist !` }, req, res, 400);

    await User.destroy({ where: { id: targetId } });

    res.status(200).json(`User with email ${user.email} was deleted !`);
  } catch (err) {
    errorAPI(err, req, res,500);
  }
}

//~------------------------------------------- SIGN OUT USER
async function signOutUser(req, res) {
  try {
    req.session.user
      ? res.status(200).json(`User with e-mail  [ ${req.session.user.email} ] is deconnected !`)
      : errorAPI({ message: `No user authenticated !` }, req, res, 400);
    req.session.destroy();
  } catch (err) {
    errorAPI(err, req, res,500);
  }
}

export { fetchOneUser, signInUser, createUser, updateUser, deleteUser, signOutUser };
