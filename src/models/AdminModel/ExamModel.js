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

exports.getExamById = (exam_id) => {
    return new Promise((resolve, reject) => {
        db.query("select * from exams where exam_id = ?", [exam_id], (err, result) => {
            if (err) {
                reject(err.sqlMessage || "Database error");
            } else if (result.length === 0) {
                reject("Exam not found");
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
exports.updateExam = (exam_id, name, subject_id) => {
    return new Promise((resolve, reject) => {
        db.query("update exams set name = ?, subject_id = ? where exam_id = ?", [name, subject_id, exam_id],(err, result) => {
            if (err) {
                reject(err.sqlMessage || "Database error");
            } else if (result.affectedRows === 0) {
                reject("Exam not found can't made changes ");
            } else {
                resolve("Exam updated successfully");
            }
        });
    }).then((result) => {
        return { result };
    }).catch((err) => {
        return { err };
    });
};


exports.deleteExam = (exam_id) => {
    return new Promise((resolve, reject) => {
        db.query("delete from exams where exam_id = ?", [exam_id], (err, result) => {
            if (err) {
                reject(err.sqlMessage || "Database error");
            } else if (result.affectedRows === 0) {
                reject("Exam not found");
            } else {
                resolve("Exam deleted successfully");
            }
        });
    }).then((result) => ({ result }))
      .catch((err) => ({ err }));
};
