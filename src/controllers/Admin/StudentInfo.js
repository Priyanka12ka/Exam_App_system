const model = require("../../models/AdminModel/StudentInfoModel");

// get all students
exports.getAllStudents = async (req, res) => {
    const response = await model.getAllStudents();
    if ("result" in response) res.status(200).json({ data: response.result });
    else res.status(500).json({ msg: response.err });
};
