const mongoose = require("mongoose");

const Memberships = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    chamaId: { type: mongoose.Types.ObjectId, ref: "chama", required: true },
    role: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("memberships", Memberships);
