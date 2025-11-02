const express = require("express");
const route = express.Router();
const adminController = require("../controllers/adminController");

route.post("/login",adminController.adminLogin);


module.exports = route;