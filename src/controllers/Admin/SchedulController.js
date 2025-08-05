
const scheduleModel = require("../../models/AdminModel/ScheduleModel.js");

exports.addSchedule = async (req, res) => {
    const { title, date, start_time, end_time, duration_minutes, exam_id, subject_id } = req.body;
    let response = await scheduleModel.addSchedule(title, date, start_time, end_time, duration_minutes, exam_id, subject_id);
    if ("result" in response) {
        res.status(201).json({ "msg": response.result });
    }
    else {
        res.status(400).json({ "msg": response.err });
    }


}

exports.getAllSchedules = async (req, res) => {
    let response = await scheduleModel.getAllSchedules();

    if ("result" in response) {
        res.status(200).json({ data: response.result });
    } else {
        res.status(500).json({ msg: response.err });
    }
};

exports.getScheduleById = async (req, res) => {
    const schedule_id = req.body.schedule_id;


    let response = await scheduleModel.getScheduleById(schedule_id);

    if ("result" in response) {
        res.status(200).json({ data: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};



exports.updateSchedule = async (req, res) => {
    const {schedule_id, title,date,start_time,end_time,duration_minutes, exam_id, subject_id} = req.body;

    let response = await scheduleModel.updateSchedule(schedule_id,title,date,start_time, end_time, duration_minutes, exam_id,subject_id );
    if ("result" in response) {
        res.status(200).json({ msg: response.result });
    } else {
        res.status(400).json({ msg: response.err });
    }
};
exports.deleteSchedule = async (req, res) => {
    const { schedule_id } = req.body;

    let response = await scheduleModel.deleteSchedule(schedule_id);

    if ("result" in response) {
        res.status(200).json({ msg: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};

exports.searchScheduleByDate = async (req, res) => {
    const { date } = req.body;

    const response = await scheduleModel.searchScheduleByDate(date);

    if ("result" in response) {
        res.status(200).json({ data: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};

