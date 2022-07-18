import jwt from 'jsonwebtoken';
import { ErrorApi } from '../../app/services/errorHandler.js';
import debug from 'debug';
const logger = debug('ErrorHandling');

function validateToken(req, res, next) {
  try {
    //   get token from header
    const authHeader = req.headers['authorization'];

    if (authHeader === undefined) throw new ErrorApi('No token found', req, res, 400);

    //header contains token "Bearer <token>", split the string and get the 2nd part of the array
    const accessToken = authHeader.split(' ')[1];

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        throw new ErrorApi('Token is invalid !', req, res, 403);
      }
      req.email = user;
      req.session.token = accessToken;
      
      // console.log('JETON VALIDE');
      next();
    });
  } catch (err) {
    logger(err.message);
  }
}

function getRefreshToken(req, res, next) {
  try {
    //get token from header
    const authHeader = req.headers['authorization'];
    // console.log('\x1b[1;36m authHeader: \x1b[0m', authHeader);

    if (authHeader === undefined) throw new ErrorApi('No token found', req, res, 400);
    
    //header contains token "Bearer <token>", split the string and get the 2nd part of the array
    let refreshToken = authHeader.split(' ')[1];
    // console.log('\x1b[1;36m AUTH HEADER SPLIT IN GET REFRESH : \x1b[0m', refreshToken);
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {

      if (err) {
        throw new ErrorApi('Token is invalid !', req, res, 403);
      }

      // console.log('\x1b[1;34m START GET refreshTokens: \x1b[0m', refreshToken);

      // reset refresh token in session
      req.session.refreshToken = [];

      // console.log('\x1b[1;34m END GET refreshToken reset: \x1b[0m', req.session.refreshToken);

      return refreshToken;

    });
  } catch (err) {
    logger(err.message);
  }
}

export { validateToken, getRefreshToken };
