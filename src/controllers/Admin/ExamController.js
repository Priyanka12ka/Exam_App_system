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
