const mongoose = require("mongoose");

const Memberships = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    chamaId: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("memberships", Memberships);
