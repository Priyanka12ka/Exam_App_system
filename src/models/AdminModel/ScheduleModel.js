const db = require("../../../db.js");

exports.addSchedule = (title, date, start_time, end_time, duration_minutes, exam_id, subject_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO schedule VALUES('0', ?, ?, ?, ?, ?, ?, ?)", [title, date, start_time, end_time, duration_minutes, exam_id, subject_id],
            (err, result) => {
                if (err) {
                    reject(err.sqlMessage || "Database error");
                } else {
                    if (result.affectedRows > 0) {
                        resolve("schedule inserted");
                    } else {
                        reject("Schedule not inserted");
                    }
                }
            }
        );
    }).then((result) => {
        return { result: result };
    }).catch((err) => {
        return { err: err };
    });
};

exports.getAllSchedules = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM schedule", (err, result) => {
            if (err) {
                reject(err.sqlMessage || "Database error");
            } else {
                resolve(result);
            }
        });
    }).then((result) => {
        return { result: result };
    }).catch((err) => {
        return { err: err };
    });
};


exports.getScheduleById = (schedule_id) => {
    return new Promise((resolve, reject) => {
        db.query("select * from schedule where schedule_id = ?", [schedule_id], (err, result) => {
            if (err) {
                reject(err.sqlMessage || "Database error");
            } else if (result.length === 0) {
                reject("Schedule not found");
            } else {
                resolve(result[0]);
            }
        });
    }).then((result) => {
        return { result: result };
    }).catch((err) => {
        return { err: err };
    });
};

exports.updateSchedule = (schedule_id,title,date,start_time, end_time, duration_minutes, exam_id,subject_id ) => {
    return new Promise((resolve, reject) => {
        const query = " update schedule set title = ?, date = ?, start_time = ?, end_time = ?, duration_minutes = ?,exam_id = ?, subject_id = ? where schedule_id = ?";
       const values = [title, date, start_time, end_time, duration_minutes, exam_id, subject_id, schedule_id];
         db.query(query, values, (err, result) => {
            if (err) {
                reject(err.sqlMessage || "Database error");
            } else if (result.affectedRows === 0) {
                reject("Schedule not found or no changes made");
            } else {
                resolve("Schedule updated successfully");
            }
        });
    }).then((result) => {
        return { result };
    }).catch((err) => {
        return { err };
    });
};

exports.deleteSchedule = (schedule_id) => {
    return new Promise((resolve, reject) => {
        db.query("delete from schedule where schedule_id = ?", [schedule_id], (err, result) => {
            if (err)
                {
                     reject(err.sqlMessage || "Database error");
                }
            else if (result.affectedRows === 0)
                {
                    reject("Schedule not found");
                }
        
            else
                {
                     resolve("Schedule deleted successfully");
                }
        });
    }).then((result) => {
        return { result };
    }).catch((err) => {
        return { err };
    });
};

exports.searchScheduleByDate = (date) => {
    return new Promise((resolve, reject) => {
        db.query("select * from schedule where date = ?" ,[date], (err, result) => {
        
            if (err) {
                reject(err.sqlMessage || "Database error");
            } else if (result.length === 0) {
                reject("No schedules found for the given date");
            } else {
                resolve(result);
            }
        });
    }).then((result) => {
        return { result };
    }).catch((err) => {
        return { err };
    });
};
