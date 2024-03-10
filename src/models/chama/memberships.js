const mongoose = require("mongoose");

const Memberships = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  chamaId: { type: mongoose.Types.ObjectId, ref: "chama", required: true },
  role: { type: String, enum: ["admin", "treasurer", "secretary", "member"] },
  joinDate: Date,
});

module.exports = mongoose.model("memberships", Memberships);
