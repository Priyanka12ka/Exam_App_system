

const StudentAnswerModel = require("../../models/AdminModel/EvaluateStudentansmodel");

function saveAnswer(req, res) {
  const { result_id, question_id, student_answer } = req.body;

  StudentAnswerModel.saveStudentAnswer(result_id, question_id, student_answer, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "internal server error", error: err.message });
    }
    res.json({ message: "answer saved", data });
  });
}

module.exports = { saveAnswer };
