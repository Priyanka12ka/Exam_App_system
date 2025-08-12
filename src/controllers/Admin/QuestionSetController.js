
const QuestionSetModel = require("../../models/AdminModel/QuestionSetModel.js");

exports.addQuestionSet = async (req, res) => {
  const { title } = req.body;

  const response = await QuestionSetModel.addQuestionSet(title);

  if ("result" in response) {
    res.status(201).json({ msg: response.result });
  } else {
    res.status(400).json({ msg: response.err });
  }
};

exports.getAllQuestionSets = async (req, res) => {
  const response = await QuestionSetModel.getAllQuestionSets();

  if ("result" in response) {
    res.status(200).json({ data: response.result });
  } else {
    res.status(404).json({ msg: response.err });
  }
};

exports.getQuestionSetById = async (req, res) => {
  const { setId } = req.body;
  console.log(setId);

  if (!setId) {
    return res.status(400).json({ msg: "setId is required" });
  }

  const response = await QuestionSetModel.getQuestionSetById(setId);

  if ("result" in response) {
    res.status(200).json({ data: response.result });
  } else {
    res.status(404).json({ msg: response.err });
  }
};

exports.updateQuestionSet = async (req, res) => {
  const { setId, title } = req.body;

  if (!setId) {
    return res.status(400).json({ msg: "valid setId is required" });
  }

  const response = await QuestionSetModel.updateQuestionSet(setId, title);

  if ("result" in response) {
    return res.status(200).json({ msg: response.result });
  } else {
    return res.status(400).json({ msg: response.err });
  }
};

exports.deleteQuestionSet = async (req, res) => {
  const { setId } = req.body;

  if (!setId) {
    return res.status(400).json({ msg: "valid setId is required" });
  }

  const response = await QuestionSetModel.deleteQuestionSet(setId);

  if ("result" in response) {
    return res.status(200).json({ msg: response.result });
  } else {
    return res.status(400).json({ msg: response.err });
  }
};



