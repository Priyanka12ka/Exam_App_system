const model = require("../../models/AdminModel/AssignSchTOStudModel");

// CREATE assignment
exports.assignSchedule = async (req, res) => {
    const { stud_id, schedule_id } = req.body;
    const response = await model.assignSchedule(stud_id, schedule_id);
    if ("result" in response) {
        res.status(201).json({ msg: response.result });
    }
    else {

        res.status(400).json({ msg: response.err });
    }
};

exports.getAllAssignments = async (req, res) => {
    const response = await model.getAllAssignments();
    if ("result" in response) {
        res.status(200).json({ data: response.result });
    }
    else {
        res.status(500).json({ msg: response.err });
    }
};

exports.getAssignmentById = async (req, res) => {
    const { id } = req.body;
    const response = await model.getAssignmentById(id);
    if
        ("result" in response) {

        res.status(200).json({ data: response.result });
    }
    else {
        res.status(404).json({ msg: response.err });
    }
};


exports.updateAssignment = async (req, res) => {
    const { id, stud_id, schedule_id } = req.body;
    const response = await model.updateAssignment(id, stud_id, schedule_id);
    if ("result" in response) {
        res.status(200).json({ msg: response.result });
    }
    else {

        res.status(400).json({ msg: response.err });
    }
};

// DELETE assignment (ID from body)
exports.deleteAssignment = async (req, res) => {
    const { id } = req.body;
    const response = await model.deleteAssignment(id);
    if ("result" in response) {
        res.status(200).json({ msg: response.result });
    }
    else {
        res.status(400).json({ msg: response.err });
    }
};
