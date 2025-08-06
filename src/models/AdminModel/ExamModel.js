const db = require("../../../db.js");

// add exam
exports.addExam = (name, subject_id, question_set, total_marks, per_question_marks) => {
    return new Promise((resolve, reject) => {
        db.query("select subject_id from subjects where subject_id = ?", [subject_id], (err, subjectResult) => {
            if (err) {
                reject(err.sqlMessage || "database error");
            } else if (subjectResult.length === 0) {
                reject("subject not found");
            } else {
                if (!Array.isArray(question_set) || question_set.length === 0) {
                    reject("question_set should be a non-empty array");
                    return;
                }

                db.query(
                    "select question_id from questions where subject_id = ? and question_id in (?)",
                    [subject_id, question_set],
                    (err, qResult) => {
                        if (err) {
                            reject(err.sqlMessage || "database error");
                        } else if (qResult.length !== question_set.length) {
                            reject("some questions not found or not matched with subject");
                        } else {
                            db.query(
                                "insert into exams (name, subject_id, question_set, total_marks, per_question_marks) values (?, ?, ?, ?, ?)",
                                [name, subject_id, JSON.stringify(question_set), total_marks, per_question_marks],
                                (err, result) => {
                                    if (err) {
                                        reject(err.sqlMessage || "database error");
                                    } else {
                                        resolve(result.insertId);
                                    }
                                }
                            );
                        }
                    }
                );
            }
        });
    })
    .then((result) => ({ result }))
    .catch((err) => ({ err }));
};

// get all exams
exports.getAllExams = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from exams", (err, result) => {
            if (err) {
                reject(err.sqlMessage || "database error");
            } else if (result.length === 0) {
                reject("no exams found");
            } else {
                const parsedResult = result.map(row => ({
                    ...row,
                    question_set: row.question_set
                }));
                resolve(parsedResult);
            }
        });
    })
    .then((result) => ({ result }))
    .catch((err) => ({ err }));
};

// get exam by id
// ✅ get exam by id
exports.getExamById = (exam_id) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM exams WHERE exam_id = ?", [exam_id], (err, result) => {
            if (err) {
                reject(err.sqlMessage || "database error");
            } else if (result.length === 0) {
                reject("exam not found");
            } else {
                const exam = {
                    ...result[0],
                    question_set: typeof result[0].question_set === 'string'
                        ? JSON.parse(result[0].question_set || '[]')
                        : result[0].question_set
                };
                resolve(exam);
            }
        });
    })
    .then((result) => ({ result }))
    .catch((err) => ({ err }));
};

// update exam
exports.updateExam = (exam_id, name, subject_id, question_set, total_marks, per_question_marks) => {
    return new Promise((resolve, reject) => {
        db.query("select subject_id from subjects where subject_id = ?", [subject_id], (err, subjectResult) => {
            if (err) {
                reject(err.sqlMessage || "database error");
            } else if (subjectResult.length === 0) {
                reject("subject not found");
            } else {
                if (!Array.isArray(question_set) || question_set.length === 0) {
                    reject("question_set should be a non-empty array");
                    return;
                }

                db.query(
                    "select question_id from questions where subject_id = ? and question_id in (?)",
                    [subject_id, question_set],
                    (err, qResult) => {
                        if (err) {
                            reject(err.sqlMessage || "database error");
                        } else if (qResult.length !== question_set.length) {
                            reject("some questions not found or not matched with subject");
                        } else {
                            db.query(
                                "update exams set name = ?, subject_id = ?, question_set = ?, total_marks = ?, per_question_marks = ? where exam_id = ?",
                                [name, subject_id, JSON.stringify(question_set), total_marks, per_question_marks, exam_id],
                                (err, result) => {
                                    if (err) {
                                        reject(err.sqlMessage || "database error");
                                    } else if (result.affectedRows === 0) {
                                        reject("exam not found can't make changes");
                                    } else {
                                        resolve("exam updated successfully");
                                    }
                                }
                            );
                        }
                    }
                );
            }
        });
    })
    .then((result) => ({ result }))
    .catch((err) => ({ err }));
};

// delete exam
exports.deleteExam = (exam_id) => {
    return new Promise((resolve, reject) => {
        db.query("delete from exams where exam_id = ?", [exam_id], (err, result) => {
            if (err) {
                reject(err.sqlMessage || "database error");
            } else if (result.affectedRows === 0) {
                reject("exam not found");
            } else {
                resolve("exam deleted successfully");
            }
        });
    })
    .then((result) => ({ result }))
    .catch((err) => ({ err }));
};
