const express = require("express");
const route = express.Router();
const EmpController  =require ("../controllers/empController");

route.post("/login",EmpController.emplogin);
route.post("/showtask",EmpController.showTask);
route.put("/taskreport",EmpController.taskReports);

module.exports=route;