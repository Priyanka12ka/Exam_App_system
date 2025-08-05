const studentprofilemodel = require("../../models/StudentModel/StudentProfile.js");

exports.viewprofile = async (req, res) => {
        const studentId = req.body.stud_id; 
        const response = await studentprofilemodel.viewstudentprofile(studentId);

        if ("result" in response) {
            res.status(200).json({ msg: response.result });
        } else {
            res.status(400).json({ msg: response.err });
        }
    
};
