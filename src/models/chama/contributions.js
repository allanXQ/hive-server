const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  chamaId: { type: mongoose.Types.ObjectId, ref: "Chama" },
  chama: { type: String, required: true },
  amount: Number,
  contributionDate: Date,
  // Additional fields for tracking contributions...
});

module.exports = mongoose.model("contributions", contributionSchema);
