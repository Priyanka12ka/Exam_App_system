const QuestionModel = require("../../models/AdminModel/QuesionModel.js");

exports.addquestion = async (req, res) => {
  const { exam_id, question_text, option1, option2, option3, option4, answer, mark } = req.body;
  const response = await QuestionModel.addQuestion(exam_id, question_text, option1, option2, option3, option4, answer, mark);
  if ("result" in response) {
    res.status(201).json({ msg: response.result });
  } else {
    if (response.err === "Exam  doesn't exist") {
      res.status(404).json({ msg: response.err });
    } else {
      res.status(400).json({ msg: response.err });
    }
  }
};

exports.getAllQuestions = async (req, res) => {
  const response = await QuestionModel.getAllQuestion();
  if ("result" in response) {
    res.status(200).json({ data: response.result });
  } else {
    res.status(404).json({ msg: response.err });
  }
};


exports.getQuestionById = async (req, res) => {
  const { question_id } = req.body;

  if (!question_id) {
    return res.status(400).json({ msg: "Question ID is required" });
  }

  const response = await QuestionModel.getQuestionById(question_id);

  if ("result" in response) {
    res.status(200).json({ data: response.result });
  } else {
    res.status(404).json({ msg: response.err });
  }
};

exports.updateQuestion = async (req, res) => {
  const {question_id,question_text,option1, option2, option3, option4,answer,mark } = req.body;

  if (!question_id) {
    return res.status(400).json({ msg: "Valid Question ID is required" });
  }

  const response = await QuestionModel.updateQuestion(question_id,question_text,option1, option2, option3, option4,answer,mark);

  if ("result" in response) {
   return res.status(200).json({ msg: response.result });
  } else {
    return res.status(400).json({ msg: response.err });
  }
};
exports.deleteQuestion=async(req,res)=>{
 const{question_id}=req.body;
  if (!question_id) {
    return res.status(400).json({ msg: "Valid question_id is required" });
  }
  const response=await QuestionModel.deleteQuestion(question_id);
  if("result" in response)
  {
    return res.status(200).json({msg:response.result});
  }
  else{
    return res.status(400).json({msg:response.err});
  }
};

exports.searchQuestionByName = async (req, res) => {
  const {question_text} = req.body;
  console.log(question_text);
  const response = await QuestionModel.searchQuestionByName(question_text);

  if ("result" in response) {
    res.status(200).json({ questions: response.result });
  } else {
    res.status(500).json({ msg: response.err });
  }
};
