const users = require("./users");
const mpesaDeposits = require("./mpesaDeposits");
const memberships = require("./chama/memberships");
const chamas = require("./chama/chamas");
const contributions = require("./chama/contributions");
const tableBanking = require("./chama/types/tableBanking");
// const chamaTypes = require("./chama/types");

module.exports = {
  users,
  mpesaDeposits,
  chamas,
  memberships,
  tableBanking,
  contributions,
  // chamaTypes,
};
