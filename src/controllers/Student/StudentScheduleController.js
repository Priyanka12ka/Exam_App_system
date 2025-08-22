const scheduleModel = require("../../models/StudentModel/StudentSchedule");

exports.getStudentSchedule = async (req, res) => {
    try {
        const stud_id = req.user?.stud_id; // now works because middleware sets req.user
        if (!stud_id) {
            return res.status(400).json({ msg: "Student ID not found in token" });
        }

        const schedules = await scheduleModel.getStudentSchedule(stud_id);
        res.status(200).json({ data: schedules });
    } catch (err) {
        console.error("Error fetching schedule:", err);
        res.status(404).json({ msg: err });
    }
};
