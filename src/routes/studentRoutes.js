const express = require("express");
const studentrouter = express.Router();

const studentController = require("../controllers/Student/studentLoginController");

studentrouter.post("/register",studentController.registerStudent);
studentrouter.post("/login", studentController.loginStudent);


module.exports = studentrouter;
