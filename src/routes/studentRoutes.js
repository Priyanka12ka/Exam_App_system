const express = require("express");
const studentController = require("../controllers/Student/studentLoginController");
const viewprofilecontroller = require("../controllers/Student/StudentProfile.js");
const stud_schduleController = require("../controllers/Student/StudentScheduleController.js");
const { verifystudent } = require("../../src/Middleware/StudentMiddleware.js");

const studentrouter = express.Router();
const studentprofilerouter = express.Router();
const stud_scheduleRouter = express.Router();

studentrouter.post("/register", studentController.registerStudent);
studentrouter.post("/login", studentController.loginStudent);

// Profile routes
studentprofilerouter.get("/view", verifystudent, viewprofilecontroller.viewprofile);
studentprofilerouter.put("/update", verifystudent, viewprofilecontroller.updatestudentprofile);

// Schedule routes
stud_scheduleRouter.get("/getschduleforstud", verifystudent, stud_schduleController.getStudentSchedule);

module.exports = { studentrouter, studentprofilerouter, stud_scheduleRouter };
