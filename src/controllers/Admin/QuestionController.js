const QuestionModel = require("../../models/AdminModel/QuesionModel.js");

exports.addquestion = async (req, res) => {
  const { subject_id, question_text, option1, option2, option3, option4, answer } = req.body;

  const response = await QuestionModel.addQuestion(subject_id, question_text, option1, option2, option3, option4, answer);

  if ("result" in response) {
    res.status(201).json({ msg: response.result });
  } else {
    if (response.err === "subject not found") {
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
    return res.status(400).json({ msg: "question_id is required" });
  }

  const response = await QuestionModel.getQuestionById(question_id);

  if ("result" in response) {
    res.status(200).json({ data: response.result });
  } else {
    res.status(404).json({ msg: response.err });
  }
};

exports.updateQuestion = async (req, res) => {
  const { question_id, question_text, option1, option2, option3, option4, answer} = req.body;

  if (!question_id) {
    return res.status(400).json({ msg: "valid question_id is required" });
  }

  const response = await QuestionModel.updateQuestion(question_id, question_text, option1, option2, option3, option4, answer);

  if ("result" in response) {
    return res.status(200).json({ msg: response.result });
  } else {
    return res.status(400).json({ msg: response.err });
  }
};

exports.deleteQuestion = async (req, res) => {
  const { question_id } = req.body;

  if (!question_id) {
    return res.status(400).json({ msg: "valid question_id is required" });
  }

  const response = await QuestionModel.deleteQuestion(question_id);

  if ("result" in response) {
    return res.status(200).json({ msg: response.result });
  } else {
    return res.status(400).json({ msg: response.err });
  }
};

exports.searchQuestionByName = async (req, res) => {
  const { question_text } = req.body;

  const response = await QuestionModel.searchQuestionByName(question_text);

  if ("result" in response) {
    res.status(200).json({ questions: response.result });
  } else {
    res.status(500).json({ msg: response.err });
  }
};
