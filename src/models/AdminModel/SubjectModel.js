const db = require("../../../db.js");

exports.addExam = (subject_id, total_marks, per_question_marks) => {
    return new Promise((resolve, reject) => {
        db.query("insert into exams (subject_id, total_marks, per_question_marks) values (?, ?, ?)",[subject_id, total_marks, per_question_marks],
            (err, result) => {
                if (err) reject(err.sqlMessage || "database error");
                else resolve("exam added successfully");
            }
        );
    }).then(result => ({ result }))
        .catch(err => ({ err }));
};

exports.viewExams = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from exams", (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else resolve(result);
        });
    }).then(result => ({ result }))
        .catch(err => ({ err }));
};

exports.getExamById = (exam_id) => {
    return new Promise((resolve, reject) => {
        db.query("select * from exams where exam_id = ?", [exam_id], (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else resolve(result);
        });
    }).then(result => {
        if (result.length === 0) {
            return { err: "no exam found with this id" };
        } else {
            return { result };
        }
    }).catch(err => ({ err }));
};

exports.updateExam = (exam_id, subject_id, total_marks, per_question_marks) => {
    return new Promise((resolve, reject) => {
        db.query(
            "update exams set subject_id = ?, total_marks = ?, per_question_marks = ? where exam_id = ?",
            [subject_id, total_marks, per_question_marks, exam_id],
            (err, result) => {
                if (err) reject(err.sqlMessage || "database error");
                else if (result.affectedRows === 0) reject("exam not found or no changes made");
                else resolve("exam updated successfully");
            }
        );
    }).then(result => ({ result }))
        .catch(err => ({ err }));
};

exports.deleteExam = (exam_id) => {
    return new Promise((resolve, reject) => {
        db.query("delete from exams where exam_id = ?", [exam_id], (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else if (result.affectedRows === 0) reject("exam not found");
            else resolve("exam deleted successfully");
        });
    }).then(result => ({ result }))
        .catch(err => ({ err }));
};

exports.searchExamBySubjectId = (subject_id) => {
    return new Promise((resolve, reject) => {
        db.query("select * from exams where subject_id = ?", [subject_id], (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else if (result.length === 0) reject("no exam found for this subject");
            else resolve(result);
        });
    }).then(result => ({ result }))
        .catch(err => ({ err }));
};
