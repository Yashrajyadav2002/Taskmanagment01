const express = require("express");
const route = express.Router();
const EmpController  =require ("../controllers/empController");

route.post("/login",EmpController.emplogin);

module.exports=route;