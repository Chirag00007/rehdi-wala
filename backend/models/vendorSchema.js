const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const vendorSchema = new mongoose.Schema({
  vendorName: {
    type: String,
    required: true,
    minLength: [3, "Name must be at least 3 characters long"],
    maxLength: [30, "Name must be at most 30 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
 
  vendorPassword: {
    type: String,
    required: true,
    minLength: [8, "Password must be at least 8 characters long"],
    maxLength: [30, "Password must be at most 30 characters long"],
    select: false,
  },
  vendorPhone: {
    type: Number,
    required: true,
    minLength: [10, "Phone number must be at least 10 characters long"],
    maxLength: [10, "Phone number must be at most 10 characters long"],
  },
  vendorAadhar: {
    type: Number,
    required: true,
    minLength: [12, "Aadhar number must be at least 12 characters long"],
    maxLength: [12, "Aadhar number must be at most 12 characters long"],
  },
  vendorShop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VendorShop",
  },
  verified: {
    type: Boolean,
    default: false,
  },

});

vendorSchema.pre("save", async function (next) {
  this.vendorPassword = await bcrypt.hash(this.vendorPassword, 12);
  next();
});

vendorSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.vendorPassword);
};


vendorSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


module.exports = mongoose.model("Vendor", vendorSchema);
