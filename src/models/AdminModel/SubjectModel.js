const db = require("../../../db.js");

exports.addSubject = (name) => {
    return new Promise((resolve, reject) => {
        db.query("insert into subjects (name) values (?)", [name], (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else resolve("subject added successfully");
        });
    }).then(result => ({ result }))
        .catch(err => ({ err }));
};

exports.viewSubjects = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from subjects", (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else resolve(result);
        });
    }).then(result => ({ result }))
        .catch(err => ({ err }));
};
exports.getSubjectById = (subject_id) => {
    return new Promise((resolve, reject) => {
        db.query("select *from subjects where subject_id=?", [subject_id], (err, result) => {
            if (err) {
                reject(err.sqlMessage || "database error");
            }
            else {
                resolve(result)
            }
        });
    }).then(result => {
        if (result.length === 0) {
            return { err: "No subject found with this id " };
        } else {
            return { result };
        }
    }).catch(err => {
        return { err };
    })
}

exports.updateSubject = (subject_id, name) => {
    return new Promise((resolve, reject) => {
        db.query("update subjects set name = ? where subject_id = ?", [name, subject_id], (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else if (result.affectedRows === 0) reject("subject not found or no changes made");
            else resolve("subject updated successfully");
        });
    }).then(result => ({ result }))
        .catch(err => ({ err }));
};

exports.deleteSubject = (subject_id) => {
    return new Promise((resolve, reject) => {
        db.query("delete from subjects where subject_id = ?", [subject_id], (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else if (result.affectedRows === 0) reject("subject not found");
            else resolve("subject deleted successfully");
        });
    }).then(result => ({ result }))
        .catch(err => ({ err }));
};
exports.searchSubjectByName = (name) => {
    return new Promise((resolve, reject) => {
        db.query("select * from subjects where name = ?", [name], (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else if (result.length === 0) reject("subject not found");
            else resolve(result);
        });
    }).then(result => ({ result }))
        .catch(err => ({ err }));
};