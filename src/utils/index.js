const createId = require("./createId");
const messages = require("./messages");
const logger = require("./logger");
const errorHOC = require("./errorHOC");
const generateAccessToken = require("./generateAccessToken");
const getTimeStamp = require("./timestamp");
const { clearTokens, generateTokens, setCookies } = require("./cookie");

module.exports = {
  messages,
  logger,
  errorHOC,
  createId,
  clearTokens,
  generateTokens,
  setCookies,
  generateAccessToken,
  getTimeStamp,
};
