const express = require("express");
const { verifyadmin } = require("../../src/Middleware/AdminMiddleware.js");

const AdminController = require("../controllers/Admin/Admin.js");
const Schedulercontroller=require("../controllers/Admin/SchedulController.js");
const ExamController=require("../controllers/Admin/ExamController.js");
const SubjectController=require("../controllers/Admin/SubjectController.js");
const QuestionController=require("../controllers/Admin/QuestionController.js");
const Questionsetcontroller =require("../controllers/Admin/QuestionSetController.js");
const EvaluateStudAns=require("../controllers/Admin/EvaluateStudentans.js");
const AssignQuestionToQuestionSet=require("../controllers/Admin/AssignQuestionTo_QueSet.js");
const Resultcontroller=require("../controllers/Admin/ResultGeneratecontroller.js");

const Schedulerouter=express.Router();
const AdminRouter = express.Router();
const ExamRouter=express.Router();
const SubjectRouter=express.Router();
const QuestionRouter=express.Router();
const QuestionSetRouter=express.Router();
const EvaluateAnsRouter=express.Router();
const AssignQueToQueSet=express.Router();
const ResultRoutes=express.Router();

AdminRouter.post("/login", AdminController.adminLogin);

Schedulerouter.post("/addschedule",verifyadmin, Schedulercontroller.addSchedule);

Schedulerouter.get("/getallschedule",verifyadmin, Schedulercontroller.getAllSchedules);
Schedulerouter.get("/getschedulebyid", verifyadmin, Schedulercontroller.getScheduleById);
Schedulerouter.put("/updateschedule",verifyadmin, Schedulercontroller.updateSchedule);
Schedulerouter.delete("/deleteschedule", verifyadmin,Schedulercontroller.deleteSchedule);
Schedulerouter.get("/searchschedulebydate",verifyadmin, Schedulercontroller.searchScheduleByDate);

ExamRouter.post("/examadd",verifyadmin, ExamController.addExam);
ExamRouter.get("/getallexam",verifyadmin, ExamController.getAllExams);
ExamRouter.get("/getexambyid",verifyadmin, ExamController.getExamById );
ExamRouter.put("/updateexam",verifyadmin,ExamController.updateExam);
ExamRouter.delete("/deleteexam",verifyadmin, ExamController.deleteExam);

SubjectRouter.post("/addsubject",verifyadmin,SubjectController.addSubject);
SubjectRouter.get("/getallsubject",verifyadmin,SubjectController.getAllSubjects);
SubjectRouter.get("/getsubjectbyid",verifyadmin,SubjectController.getsubjectbyid);
SubjectRouter.put("/updatesubject",verifyadmin,SubjectController.updateSubject);
SubjectRouter.delete("/deletesubject",verifyadmin,SubjectController.deleteSubject);
SubjectRouter.get("/searchsubjectbyname",verifyadmin, SubjectController.searchSubjectByName);

QuestionRouter.post("/addquestion" ,verifyadmin,QuestionController.addquestion);
QuestionRouter.get("/getallquestion" ,verifyadmin,QuestionController.getAllQuestions);
QuestionRouter.get("/getquestionbyid" ,verifyadmin,QuestionController.getQuestionById);
QuestionRouter.put("/updatequestion" ,verifyadmin,QuestionController.updateQuestion);
QuestionRouter.delete("/deletequestion",verifyadmin,QuestionController.deleteQuestion);
QuestionRouter.post("/searchquestion", verifyadmin, QuestionController.searchQuestionByName);

QuestionSetRouter.post("/addquestionset", verifyadmin, Questionsetcontroller.addQuestionSet);
QuestionSetRouter.get("/getallquestionset", verifyadmin, Questionsetcontroller.getAllQuestionSets);
QuestionSetRouter.post("/getquestionsetbyid", verifyadmin, Questionsetcontroller.getQuestionSetById);
QuestionSetRouter.delete("/deletequestionset", verifyadmin, Questionsetcontroller.deleteQuestionSet);
QuestionSetRouter.put("/updateQuestionset", verifyadmin, Questionsetcontroller.updateQuestionSet);

EvaluateAnsRouter.post("/evaluateanswers", verifyadmin, EvaluateStudAns.saveAnswer);


AssignQueToQueSet.post("/addquetoqueset",verifyadmin, AssignQuestionToQuestionSet.addQuestionToSet);
AssignQueToQueSet.get("/getqueinset",verifyadmin ,AssignQuestionToQuestionSet.getQuestionsInSet);
AssignQueToQueSet.delete("/deletequestionfromset", verifyadmin, AssignQuestionToQuestionSet.removeQuestionFromSet);

ResultRoutes.post("/createresult", verifyadmin, Resultcontroller.getResultByStudentId);

module.exports ={ AdminRouter,Schedulerouter,ExamRouter ,SubjectRouter,QuestionRouter, QuestionSetRouter, EvaluateAnsRouter,AssignQueToQueSet,ResultRoutes};
