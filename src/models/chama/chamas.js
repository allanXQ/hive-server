const mongoose = require("mongoose");

// types:{
//     Rotating Savings and Credit Associations (ROSCAs),
//     Accumulating Savings and Credit Associations (ASCAs)
//     Investment Groups
//     Welfare/Social Chamas
// }

//events: contributions
const chamaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ["ROSCA", "ASCA", "tableBanking", "investment", "welfare"],
    },
    createdAt: { type: Date, default: Date.now },
  },
  { discriminatorKey: "chamaType" }
);

module.exports = mongoose.model("chama", chamaSchema);
