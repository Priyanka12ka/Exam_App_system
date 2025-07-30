const express = require("express");
const AdminController = require("../controllers/Admin/Admin.js");
const Schedulercontroller=require("../controllers/Admin/SchedulController.js")
const Schedulerouter=express.Router();
const AdminRouter = express.Router();

AdminRouter.post("/login", AdminController.adminLogin);


Schedulerouter.post("/addschedule", Schedulercontroller.addSchedule);
Schedulerouter.get("/getallschedule",Schedulercontroller.getAllSchedules);
Schedulerouter.get("/getschedulebyid",Schedulercontroller.getScheduleById);
Schedulerouter.put("/updateschedule",Schedulercontroller.updateSchedule);
Schedulerouter.delete("/deleteschedule", Schedulercontroller.deleteSchedule);
Schedulerouter.get("/searchschedulebydate", Schedulercontroller.searchScheduleByDate);


module.exports ={ AdminRouter,Schedulerouter};
