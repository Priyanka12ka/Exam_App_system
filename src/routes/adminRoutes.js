const express = require("express");
const AdminController = require("../controllers/Admin/Admin.js");
const Schedulercontroller=require("../controllers/Admin/SchedulController.js")
const Schedulerouter=express.Router();
const AdminRouter = express.Router();

AdminRouter.post("/register", AdminController.adminLogin);
Schedulerouter.post("/addschedule", Schedulercontroller.addSchedule);


module.exports ={ AdminRouter,Schedulerouter};
