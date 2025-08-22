const db = require("../../../db.js");

// Add Exam
exports.addExam = (title, subject_id, total_marks, per_question_marks) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO exams (title, subject_id, total_marks, per_question_marks) VALUES (?, ?, ?, ?)",
            [title, subject_id, total_marks, per_question_marks],
            (err, result) => {
                if (err) {
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
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

// Get All Exams (joined with subject name for clarity)
exports.getAllExams = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT e.exam_id, e.title, e.subject_id, s.name AS subject_name,e.total_marks, e.per_question_marks FROM exams e LEFT JOIN subjects s ON e.subject_id = s.subject_id `;
        db.query(query, (err, result) => {
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
        const query = `
            SELECT e.exam_id, e.title, s.name AS subject_name, 
                   e.total_marks, e.per_question_marks 
            FROM exams e
            JOIN subjects s ON e.subject_id = s.subject_id
            WHERE e.exam_id = ?`;
        db.query(query, [exam_id], (err, result) => {
            if (err) return reject(err.sqlMessage || "database error");
            if (result.length === 0) return reject("exam not found");
            resolve(result[0]);
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

// Update Exam
exports.updateExam = (exam_id, title, subject_id, total_marks, per_question_marks) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE exams 
            SET title = ?, subject_id = ?, total_marks = ?, per_question_marks = ? 
            WHERE exam_id = ?`;
        db.query(query, [title, subject_id, total_marks, per_question_marks, exam_id], (err, result) => {
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
        db.query("DELETE FROM exams WHERE exam_id = ?", [exam_id], (err, result) => {
            if (err) return reject(err.sqlMessage || "database error");
            if (result.affectedRows === 0) return reject("exam not found");
            resolve("exam deleted successfully");
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};
