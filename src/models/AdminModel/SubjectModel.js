const db = require("../../../db.js");

exports.addSubject = (name) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO subjects (name) VALUES (?)", [name], (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else resolve("subject added successfully");
        });
    }).then(result => ({ result }))
      .catch(err => ({ err }));
};


exports.getAllSubjects = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM subjects", (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else resolve(result);
        });
    }).then(result => {
        if (result.length === 0) {
            return { err: "no subject present" };
        } else {
            return { result };
        }
    }).catch(err => ({ err }));
};


exports.getSubjectById = (subject_id) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM subjects WHERE subject_id = ?", [subject_id], (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else resolve(result);
        });
    }).then(result => {
        if (result.length === 0) {
            return { err: "no subject found with this id" };
        } else {
            return { result };
        }
    }).catch(err => ({ err }));
};

exports.updateSubject = (subject_id, name) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE subjects SET name = ? WHERE subject_id = ?", [name, subject_id], (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else if (result.affectedRows === 0) reject("subject not found or no changes made");
            else resolve("subject updated successfully");
        });
    }).then(result => ({ result }))
      .catch(err => ({ err }));
};

exports.deleteSubject = (subject_id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM subjects WHERE subject_id = ?", [subject_id], (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else if (result.affectedRows === 0) reject("subject not found");
            else resolve("subject deleted successfully");
        });
    }).then(result => ({ result }))
      .catch(err => ({ err }));
};

exports.searchSubjectByName = (name) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM subjects WHERE name LIKE ?", [`%${name}%`], (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else if (result.length === 0) reject("no subject found with this name");
            else resolve(result);
        });
    }).then(result => ({ result }))
      .catch(err => ({ err }));
};
