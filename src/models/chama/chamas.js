const mongoose = require("mongoose");

// types:{
//     Rotating Savings and Credit Associations (ROSCAs),
//     Accumulating Savings and Credit Associations (ASCAs)
//     Investment Groups
//     Welfare/Social Chamas
// }

const contributions = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//events: contributions
const chamaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      //reference types schema
      type: String,
      enum: ["ROSCAs", "ASCAs", "Investment Groups", "Welfare/Social Chamas"],
      required: true,
    },
    contributions: [contributions],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chama", chamaSchema);
