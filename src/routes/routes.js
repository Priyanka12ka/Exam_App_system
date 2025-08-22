const express = require("express");
const router = express.Router();
const { AdminRouter, Schedulerouter,ExamRouter,SubjectRouter ,QuestionRouter, QuestionSetRouter, EvaluateAnsRouter ,AssignQueToQueSet, ResultRoutes, AssignStudToSch, StudRouter} = require("./adminRoutes");
const {studentrouter,studentprofilerouter, stud_scheduleRouter}= require("./studentRoutes.js");


router.use("/admin", AdminRouter);
router.use('/scheduler', Schedulerouter); 
router.use("/exam", ExamRouter );
router.use("/subject", SubjectRouter);
router.use("/question",QuestionRouter);
router.use("/questionset",QuestionSetRouter);
router.use("/evaluteans",EvaluateAnsRouter);
router.use("/assignquetoqueset", AssignQueToQueSet);
router.use("/assignstudtosch", AssignStudToSch);
router.use("/stud", StudRouter);
router.use("/result",ResultRoutes);


router.use("/students",studentrouter);
router.use("/studentprofile",studentprofilerouter);
router.use("/stud-schedule", stud_scheduleRouter);



module.exports = router;
