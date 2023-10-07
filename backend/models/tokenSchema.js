const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: ["User" , "Vendor"],
    unique: true,
  },
  token: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});

module.exports = mongoose.model("Token", tokenSchema);