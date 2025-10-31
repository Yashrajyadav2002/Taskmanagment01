const express = require("express");
const route = express.Router();
const AdminController = require("../Controllers/adminController");

route.post("/login",AdminController.adminLogin);



module.exports=route;