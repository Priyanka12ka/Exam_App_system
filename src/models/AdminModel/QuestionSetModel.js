const db = require("../../../db.js");

exports.addQuestionSet = (title) => {
    return new Promise((resolve, reject) => {
        db.query(
            "insert into questionset (title) values (?)",
            [title],
            (err, result) => {
                if (err) {
                    reject(err.sqlMessage || "database error");
                } else {
                    if (result.affectedRows > 0) {
                        resolve("question set inserted successfully");
                    } else {
                        reject("question set not inserted due to unknown error");
                    }
                }
            }
        );
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

exports.getAllQuestionSets = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from questionset", (err, result) => {
            if (err) {
                reject(err.sqlMessage || "database error");
            } else {
                resolve(result);
            }
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

exports.getQuestionSetById = (setId) => {
    return new Promise((resolve, reject) => {
        db.query("select * from questionset where setId = ?", [setId], (err, result) => {
            if (err) {
                reject(err.sqlMessage || "database error");
            } else if (result.length === 0) {
                reject("question set not found");
            } else {
                resolve(result[0]);
            }
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

exports.updateQuestionSet = (setId, title) => {
    return new Promise((resolve, reject) => {
        const query = "update questionset set title = ? where setId = ?";
        const values = [title, setId];

        db.query(query, values, (err, result) => {
            if (err) {
                if (err.code === 'ER_BAD_FIELD_ERROR' || err.code === 'ER_PARSE_ERROR') {
                    reject("invalid input or sql syntax error");
                } else {
                    reject(err.sqlMessage || "database error");
                }
            } else if (result.affectedRows === 0) {
                reject("question set not found or no changes made");
            } else {
                resolve("question set updated successfully");
            }
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

exports.deleteQuestionSet = (setId) => {
    return new Promise((resolve, reject) => {
        db.query("delete from questionset where setId = ?", [setId], (err, result) => {
            if (err) {
                reject(err.sqlMessage || "database error");
            } else if (result.affectedRows === 0) {
                reject("question set not found");
            } else {
                resolve("question set deleted successfully");
            }
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};
