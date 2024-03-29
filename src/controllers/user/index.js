//auth controllers
const {
  updatePassword,
  login,
  register,
  resetPassword,
  forgotPassword,
  refreshToken,
  logout,
  googleOAuth,
} = require("../auth");
const userInfo = require("./userInfo");

//wallet controllers
const {
  generateSTKPush,
  darajaWebhook,
  mpesaWithdraw,
  withdrawalHistory,
  mpesaDepositHistory,
} = require("./wallet");

module.exports = {
  updatePassword,
  login,
  register,
  resetPassword,
  forgotPassword,
  refreshToken,
  logout,
  googleOAuth,
  userInfo,
  generateSTKPush,
  darajaWebhook,
  mpesaWithdraw,
  withdrawalHistory,
  mpesaDepositHistory,
};
