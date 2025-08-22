const db = require("../../../db.js");

exports.getAllStudents = () => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT stud_id, username, email, contact FROM students",
            (err, result) => {
                if (err) reject(err.sqlMessage || "database error");
                else resolve(result);
            }
        );
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};
