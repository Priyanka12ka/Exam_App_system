const ExamModel = require("../../models/AdminModel/ExamModel.js");

// Add Exam
exports.addExam = async (req, res) => {
    const { title, subject_id, total_marks, per_question_marks } = req.body;
    const response = await ExamModel.addExam(title, subject_id, total_marks, per_question_marks);

    if ("result" in response) {
        res.status(201).json({ msg: response.result });
    } else {
        res.status(400).json({ msg: response.err });
    }
};

// Get All Exams
exports.getAllExams = async (req, res) => {
    const response = await ExamModel.getAllExams();

    if ("result" in response) {
        res.status(200).json({ data: response.result });
    } else {
        res.status(500).json({ msg: response.err });
    }
};

// Get Exam By ID
exports.getExamById = async (req, res) => {
    const { exam_id } = req.body;
    const response = await ExamModel.getExamById(exam_id);

    if ("result" in response) {
        res.status(200).json({ data: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};

// Update Exam
exports.updateExam = async (req, res) => {
    const { exam_id, title, subject_id, total_marks, per_question_marks } = req.body;
    const response = await ExamModel.updateExam(exam_id, title, subject_id, total_marks, per_question_marks);

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