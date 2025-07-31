const express = require("express");
const AdminController = require("../controllers/Admin/Admin.js");
const Schedulercontroller=require("../controllers/Admin/SchedulController.js");
const ExamController=require("../controllers/Admin/ExamController.js")
const Schedulerouter=express.Router();
const AdminRouter = express.Router();
const ExamRouter=express.Router();

AdminRouter.post("/login", AdminController.adminLogin);


Schedulerouter.post("/addschedule", Schedulercontroller.addSchedule);
Schedulerouter.get("/getallschedule",Schedulercontroller.getAllSchedules);
Schedulerouter.get("/getschedulebyid",Schedulercontroller.getScheduleById);
Schedulerouter.put("/updateschedule",Schedulercontroller.updateSchedule);
Schedulerouter.delete("/deleteschedule", Schedulercontroller.deleteSchedule);
Schedulerouter.get("/searchschedulebydate", Schedulercontroller.searchScheduleByDate);

ExamRouter.post("/examadd", ExamController.addExam);
ExamRouter.get("/getallexam", ExamController.getAllExams);
ExamRouter.get("/getexambyid", ExamController.getExamById );
ExamRouter.put("/updateexam",ExamController.updateExam);
ExamRouter.delete("/deleteexam",ExamController.deleteExam);

module.exports ={ AdminRouter,Schedulerouter,ExamRouter};
