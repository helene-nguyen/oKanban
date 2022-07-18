//& Import JWT
import jwt from 'jsonwebtoken';
import { getRefreshToken } from '../middlewares/validateToken.js';

//~  JWT ACCESS_TOKEN
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }); // 1d => one day, 60m => 60 minutes
}

function generateRefreshToken(user, req) {
  //* -- register refresh tokens
  req.session.refreshToken = [];

  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '20m' }); // 1d => one day, 60m => 60 minutes

  const token = req.session.refreshToken;
  // console.log('\x1b[1;3m START GENERATE refreshTokens: \x1b[0m', token);

  token.push(refreshToken);
  // console.log('\x1b[1;3m END GENERATE refreshTokens: \x1b[0m', token);

  return refreshToken;
}

//~  JWT REFRESH_TOKEN
function refreshToken(req, res) {
  const tokenExists = req.session.refreshToken;
  // console.log('\x1b[1;33m START REFRESH TOKEN refreshTokens: \x1b[0m', req.session.refreshToken);
  // console.log('\x1b[1;33m START REFRESH TOKEN refreshTokens TOKEN EXISTS : \x1b[0m', tokenExists);
  
  getRefreshToken(req, res);

  // console.log('\x1b[1;33m END REFRESH TOKEN refreshTokens: \x1b[0m', req.session.refreshToken);

  if (req.session.refreshToken.length === 0) {

    //delete old token and replace with new token
    const accessToken = generateAccessToken({ user: req.body.email });
    // console.log("accessToken: ", accessToken);

    const refreshToken = generateRefreshToken({ user: req.body.email }, req);
    // console.log("refreshToken: ", refreshToken);

    // console.log('GO THERE');

    //generate a new accessToken and refreshToken
    res.json({ accessToken, refreshToken });
  }
}

export { generateAccessToken, generateRefreshToken, refreshToken };