const db=require("../../../db.js");
exports.addExam = (name, subject_id) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO exams (name, subject_id) VALUES (?, ?)", [name, subject_id], (err, result) => {
            if (err) {
                reject(err.sqlMessage || "Database error");
            } else {
                resolve(result.insertId);
            }
        });
    }).then((result) => {
        return { result };
    }).catch((err) => {
        return { err };
    });
};

exports.getAllExams = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM exams", (err, result) => {
            if (err) {
                reject(err.sqlMessage || "Database error");
            } else if (result.length === 0) {
                reject("No exams found");
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
