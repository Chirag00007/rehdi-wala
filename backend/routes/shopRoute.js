const express = require("express");
const {
  isVendorAuth,
} = require("../middlewares/isAuthenticated");
const { createShop } = require("../controller/vendorShopController.js");
const router = express.Router();

router.get("/vendor/me", isVendorAuth, createShop);
