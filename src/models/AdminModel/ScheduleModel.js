const db = require("../../../db.js");


exports.addSchedule = (date, start_time, end_time, exam_id, setID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "insert into schedule values('0', ?, ?, ?, ?, ?)",
            [date, start_time, end_time, exam_id, setID],
            (err, result) => {
                if (err) {
                    if (err.code === "ER_NO_REFERENCED_ROW_2") {
                        reject("referenced exam_id or setID does not exist");
                    } else {
                        reject(err.sqlMessage || "database error");
                    }
                } else {
                    if (result.affectedRows > 0) {
                        resolve("schedule inserted successfully");
                    } else {
                        reject("schedule not inserted due to unknown error");
                    }
                }
            }
        );
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};


exports.getAllSchedules = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from schedule", (err, result) => {
            if (err) {
                reject(err.sqlMessage || "database error");
            } else {
                resolve(result);
            }
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

exports.getScheduleById = (schedule_id) => {
    return new Promise((resolve, reject) => {
        db.query("select * from schedule where schedule_id = ?", [schedule_id], (err, result) => {
            if (err) {
                reject(err.sqlMessage || "database error");
            } else if (result.length === 0) {
                reject("schedule not found");
            } else {
                resolve(result[0]);
            }
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

exports.updateSchedule = (schedule_id, date, start_time, end_time, exam_id, setID) => {
    return new Promise((resolve, reject) => {
        const query = "update schedule set date = ?, start_time = ?, end_time = ?, exam_id = ?, setID = ? where schedule_id = ?";
        const values = [date, start_time, end_time, exam_id, setID, schedule_id];

        db.query(query, values, (err, result) => {
            if (err) {
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    reject("referenced exam_id or setID does not exist");
                } else if (err.code === 'ER_BAD_FIELD_ERROR' || err.code === 'ER_PARSE_ERROR') {
                    reject("invalid input or sql syntax error");
                } else {
                    reject(err.sqlMessage || "database error");
                }
            } else if (result.affectedRows === 0) {
                reject("schedule not found or no changes made");
            } else {
                resolve("schedule updated successfully");
            }
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};


exports.deleteSchedule = (schedule_id) => {
    return new Promise((resolve, reject) => {
        db.query("delete from schedule where schedule_id = ?", [schedule_id], (err, result) => {
            if (err) {
                reject(err.sqlMessage || "database error");
            } else if (result.affectedRows === 0) {
                reject("schedule not found");
            } else {
                resolve("schedule deleted successfully");
            }
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};


exports.searchScheduleByDate = (date) => {
    return new Promise((resolve, reject) => {
        db.query("select * from schedule where date = ?", [date], (err, result) => {
            if (err) {
                reject(err.sqlMessage || "database error");
            } else if (result.length === 0) {
                reject("no schedules found for the given date");
            } else {
                resolve(result);
            }
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};
