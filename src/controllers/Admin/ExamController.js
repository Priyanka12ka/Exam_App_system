const ExamModel = require("../../models/AdminModel/ExamModel.js");

exports.addExam = async (req, res) => {
    const { subject_id, total_marks, per_question_marks } = req.body;
    const response = await ExamModel.addExam(subject_id, total_marks, per_question_marks);

    if ("result" in response) {
        res.status(201).json({ msg: response.result });
    } else {
        res.status(400).json({ msg: response.err });
    }
};

exports.getAllExams = async (req, res) => {
    const response = await ExamModel.viewExams();

    if ("result" in response) {
        res.status(200).json({ data: response.result });
    } else {
        res.status(500).json({ msg: response.err });
    }
};

exports.getExamById = async (req, res) => {
    const { exam_id } = req.body;
    const response = await ExamModel.getExamById(exam_id);

    if ("result" in response) {
        res.status(200).json({ data: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};

exports.updateExam = async (req, res) => {
    const { exam_id, subject_id, total_marks, per_question_marks } = req.body;
    const response = await ExamModel.updateExam(exam_id, subject_id, total_marks, per_question_marks);

    if ("result" in response) {
        res.status(200).json({ msg: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};

// Delete Exam
exports.deleteExam = async (req, res) => {
    const { exam_id } = req.body;
    const response = await ExamModel.deleteExam(exam_id);

    if ("result" in response) {
        res.status(200).json({ msg: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};

/*select  q.question_id, q.subject_id,q.question_text,q.option1,q.option2, q.option3,q.option4,q.answer
from exams e
join questions q on q.subject_id = e.subject_id
where e.exam_id = 4 and e.subject_id = 3;
 */