const express = require("express");
const router = express.Router();
const { AdminRouter, Schedulerouter,ExamRouter,SubjectRouter ,QuestionRouter, QuestionSetRouter, EvaluateAnsRouter ,AssignQueToQueSet} = require("./adminRoutes");
const {studentrouter,studentprofilerouter}= require("./studentRoutes.js");


router.use("/admin", AdminRouter);
router.use('/scheduler', Schedulerouter); 
router.use("/exam", ExamRouter );
router.use("/subject", SubjectRouter);
router.use("/question",QuestionRouter);
router.use("/questionset",QuestionSetRouter);
router.use("/evaluteans",EvaluateAnsRouter);
router.use("/assignquetoqueset", AssignQueToQueSet);

router.use("/students",studentrouter);
router.use("/studentprofile",studentprofilerouter);



module.exports = router;
