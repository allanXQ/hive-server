const mongoose = require("mongoose");

const mpesaDeposits = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    mpesaRef: { type: String, required: true },
    phone: { type: Number, required: true },
    amount: { type: Number, required: true },
    resultCode: { type: Number, required: false },
    resultDesc: { type: String, required: false },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("mpesaDeposits", mpesaDeposits);

module.exports = model;
