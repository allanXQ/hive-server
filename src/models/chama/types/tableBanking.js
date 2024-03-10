const mongoose = require("mongoose");
const chama = require("../chamas");

const tableBanking = chama.discriminator(
  "tableBanking",
  new mongoose.Schema({
    tableBankingLoanAmount: Number, // Amount of loan available for table banking
    tableBankingLoanInterestRate: Number, // Interest rate for table banking loans
  })
);

module.exports = tableBanking;
