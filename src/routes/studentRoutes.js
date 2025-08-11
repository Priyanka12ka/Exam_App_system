const express = require("express");
const studentController = require("../controllers/Student/studentLoginController");
const viewprofilecontroller = require("../controllers/Student/StudentProfile.js");
const { verifystudent } = require("../../src/Middleware/StudentMiddleware.js");

const studentrouter = express.Router();
const studentprofilerouter=express.Router();

studentrouter.post("/register", studentController.registerStudent);
studentrouter.post("/login", studentController.loginStudent);


studentprofilerouter.get("/view", verifystudent, viewprofilecontroller.viewprofile);
studentprofilerouter.get("/update",verifystudent,viewprofilecontroller.updatestudentprofile);

module.exports = { studentrouter ,studentprofilerouter};
