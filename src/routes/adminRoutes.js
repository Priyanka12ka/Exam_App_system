const express = require("express");
const AdminController = require("../controllers/Admin/Admin.js");
const Schedulercontroller=require("../controllers/Admin/SchedulController.js")
const Schedulerouter=express.Router();
const AdminRouter = express.Router();

AdminRouter.post("/login", AdminController.adminLogin);


Schedulerouter.post("/addschedule", Schedulercontroller.addSchedule);
Schedulerouter.post("/getallschedule",Schedulercontroller.getAllSchedules);
Schedulerouter.post("/getschedulebyid",Schedulercontroller.getScheduleById);
Schedulerouter.post("/updateschedule",Schedulercontroller.updateSchedule);
Schedulerouter.post("/deleteschedule", Schedulercontroller.deleteSchedule);
Schedulerouter.post("/searchschedulebydate", Schedulercontroller.searchScheduleByDate);


module.exports ={ AdminRouter,Schedulerouter};
