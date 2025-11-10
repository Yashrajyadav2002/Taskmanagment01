const express = require("express");
const route = express.Router();
const AdminController = require("../controllers/adminController");

route.post("/login",AdminController.adminLogin);
route.post("/usercreate",AdminController.userCreate);
route.get("/empdisplay",AdminController.empDisplay);
route.post("/tasksave",AdminController.taskSave);
route.get("/taskreportdisplay", AdminController.taskreportDisplay);
route.get("/taskreassign", AdminController.taskReassign);

module.exports = route;