const catchAsync = require('./../utils/catchAsync');
const httpStatus = require('http-status');
const { userservice} = require('./../services');
const ApiError = require('../utils/ApiError');
const { authService } = require('./../services');
const TokenService= require('token-service')
const Token = require('../model/tokenmodel')
const {tokenTypes}= require('../config/tokens')
const config = require('../config/config')




const tokensService = new TokenService( Token, tokenTypes,config)

const register = catchAsync(async (req, res, next) => {
  const user = await userservice.createUser(req.body);
  const token = await tokensService.generateAuthToken(user._id);
  res.status(201).json({
    user,
    token,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.login(
    email,
    password,
    req.connection.remoteAddress,
  );
  // generate token
  const tokens = await tokensService.generateAuthTokens(user.id);
  res.status(200).send({ user, tokens });
});

const refreshToken = catchAsync(async (req, res) => {
  console.log('refresh token from controller', req.body.refreshToken);
  const tokens = await authService.refreshAuthToken(req.body.refreshToken);
  console.log('refresh token from controller', tokens);
  res.status(200).send(tokens);
});

module.exports = {
  register,
  login,
  refreshToken,
};
