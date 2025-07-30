const express = require("express");
const router = express.Router();
const { AdminRouter, Schedulerouter,ExamRouter } = require("./adminRoutes");
const studentrouter = require("./studentRoutes.js");

router.use("/admin", AdminRouter);
router.use('/scheduler', Schedulerouter); 
router.use("/exam", ExamRouter );
router.use("/students",studentrouter);

module.exports = router;
