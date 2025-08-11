const scheduleModel = require("../../models/AdminModel/ScheduleModel.js");

// add schedule
exports.addSchedule = async (req, res) => {
    const { date, start_time, end_time, exam_id, setID } = req.body;

    let response = await scheduleModel.addSchedule(date, start_time, end_time, exam_id, setID);

    if ("result" in response) {
        res.status(201).json({ "msg": response.result });
    } else {
        res.status(400).json({ "msg": response.err });
    }
};

// get all schedules
exports.getAllSchedules = async (req, res) => {
    let response = await scheduleModel.getAllSchedules();

    if ("result" in response) {
        res.status(200).json({ data: response.result });
    } else {
        res.status(500).json({ msg: response.err });
    }
};

// get schedule by id
exports.getScheduleById = async (req, res) => {
    const { schedule_id } = req.body;

    let response = await scheduleModel.getScheduleById(schedule_id);

    if ("result" in response) {
        res.status(200).json({ data: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};

// update schedule
exports.updateSchedule = async (req, res) => {
    const { schedule_id, date, start_time, end_time, exam_id, setID } = req.body;

    let response = await scheduleModel.updateSchedule(schedule_id, date, start_time, end_time, exam_id, setID);

    if ("result" in response) {
        res.status(200).json({ msg: response.result });
    } else {
        res.status(400).json({ msg: response.err });
    }
};

// delete schedule
exports.deleteSchedule = async (req, res) => {
    const { schedule_id } = req.body;

    let response = await scheduleModel.deleteSchedule(schedule_id);

    if ("result" in response) {
        res.status(200).json({ msg: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};

// search schedule by date
exports.searchScheduleByDate = async (req, res) => {
    const { date } = req.body;

    let response = await scheduleModel.searchScheduleByDate(date);

    if ("result" in response) {
        res.status(200).json({ data: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};
