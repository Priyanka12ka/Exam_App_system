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
