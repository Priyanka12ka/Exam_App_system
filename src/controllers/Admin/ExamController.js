const examModel=require("../../models/AdminModel/ExamModel.js");

exports.addExam = async (req, res) => {
    const { name, subject_id } = req.body;

    let response = await examModel.addExam(name, subject_id);

    if ("result" in response) {
        res.status(201).json({ msg: "Exam added successfully", exam_id: response.result });
    } else {
        res.status(400).json({ msg: response.err });
    }
};

exports.getAllExams = async (req, res) => {
    let response = await examModel.getAllExams();

    if ("result" in response) {
        res.status(200).json({ data: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};

exports.getExamById = async (req, res) => {
    const exam_id = req.body.exam_id;
   
    let response = await examModel.getExamById(exam_id);

    if ("result" in response) {
        res.status(200).json({ data: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};

exports.updateExam = async (req, res) => {
    const { exam_id, name, subject_id } = req.body;

    const response = await examModel.updateExam(exam_id, name, subject_id);

    if ("result" in response) {
        res.status(200).json({ msg: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};

exports.deleteExam = async (req, res) => {
    const { exam_id } = req.body;

    const response = await examModel.deleteExam(exam_id);

    if ("result" in response) {
        res.status(200).json({ msg: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};
