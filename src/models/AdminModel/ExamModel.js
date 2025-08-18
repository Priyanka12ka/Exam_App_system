
const db = require("../../../db.js");



exports.addExam = (subject_id, total_marks, per_question_marks) => {
    return new Promise((resolve, reject) => {
        db.query(
            "insert into exams (subject_id, total_marks, per_question_marks) values (?, ?, ?)",
            [subject_id, total_marks, per_question_marks],
            (err, result) => {
                if (err) {
                    //  Handle foreign key constraint error
                    if (err.code === "ER_NO_REFERENCED_ROW_2") {
                        reject("subject_id does not exist in the subjects table");
                    } else {
                        reject(err.sqlMessage || "database error");
                    }
                } else {
                    resolve("exam added successfully");
                }
            }
        );
    })
    .then((result) => ({ result }))
    .catch((err) => ({ err }));
};


// Get All Exams
exports.getAllExams = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from exams", (err, result) => {
            if (err) return reject(err.sqlMessage || "database error");
            if (result.length === 0) return reject("no exams found");
            resolve(result);
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

// Get Exam by ID
exports.getExamById = (exam_id) => {
    return new Promise((resolve, reject) => {
        db.query("select * from exams where exam_id = ?", [exam_id], (err, result) => {
            if (err) return reject(err.sqlMessage || "database error");
            if (result.length === 0) return reject("exam not found");
            resolve(result[0]);
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

// Update Exam
exports.updateExam = (exam_id, subject_id, total_marks, per_question_marks) => {
    return new Promise((resolve, reject) => {
        const query = "update exams set subject_id = ?, total_marks = ?, per_question_marks = ? where exam_id = ?";

        db.query(query, [subject_id, total_marks, per_question_marks, exam_id], (err, result) => {
            if (err) return reject(err.sqlMessage || "database error");
            if (result.affectedRows === 0) return reject("exam not found");
            resolve("exam updated successfully");
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

// Delete Exam
exports.deleteExam = (exam_id) => {
    return new Promise((resolve, reject) => {
        db.query("delete from exams where exam_id = ?", [exam_id], (err, result) => {
            if (err) return reject(err.sqlMessage || "database error");
            if (result.affectedRows === 0) return reject("exam not found");
            resolve("exam deleted successfully");
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};
