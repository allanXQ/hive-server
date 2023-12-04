const mongoose = require("mongoose");

//features

const Types = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("chamaTypes", Types);
