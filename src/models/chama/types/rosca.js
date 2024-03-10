const mongoose = require("mongoose");
const chama = require("../chamas");

const rosca = chama.discriminator(
  "rosca",
  new mongoose.Schema({
    roscaPayoutOrder: [String], // List of member IDs in payout order for ROSCA
    roscaPayoutAmount: Number, // Amount to be paid out to each member in ROSCA
  })
);
module.exports = mongoose.model("rosca", rosca);
