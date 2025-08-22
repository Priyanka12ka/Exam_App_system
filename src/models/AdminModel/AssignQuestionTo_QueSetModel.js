const db = require("../../../db.js");

exports.addQuestionToSet = (setID, questionID) => {
    return new Promise((resolve, reject) => {
        db.query("select * from setquestionentry where setID = ? and questionID = ?", [setID, questionID], (err, results) => {
            if (err) {
                return reject(err.sqlMessage || "database error");
            }
            if (results.length > 0) {
                return reject("this question is already added to the set");
            } else {
                db.query("insert into setquestionentry (setID, questionID) values (?, ?)", [setID, questionID], (err, result) => {
                    if (err) {
                        if (err.code === "ER_NO_REFERENCED_ROW_2") {
                            return reject("referenced setID or questionID does not exist");
                        } else {
                            return reject(err.sqlMessage || "database error");
                        }
                    } else if (result.affectedRows > 0) {
                        return resolve("question added to set successfully");
                    } else {
                        return reject("failed to add question to set");
                    }
                });
            }
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

exports.getQuestionsInSet = (setID) => {
    return new Promise((resolve, reject) => {
        const query = "select sqe.setQuestionID, sqe.setID, sqe.questionID, q.question_text, q.option1, q.option2, q.option3, q.option4 from setquestionentry sqe join questions q on sqe.questionID = q.question_id where sqe.setID = ?";
        db.query(query, [setID], (err, result) => {
            if (err) {
                reject(err.sqlMessage || "database error");
            } else if (result.length === 0) {
                reject("no questions found for the given setID");
            } else {
                resolve(result);
            }
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

exports.removeQuestionFromSet = (setID, questionID) => {
    return new Promise((resolve, reject) => {
        db.query("delete from setquestionentry where setID = ? and questionID = ?", [setID, questionID], (err, result) => {
            if (err) {
                reject(err.sqlMessage || "database error");
            } else if (result.affectedRows === 0) {
                reject("question not found in set");
            } else {
                resolve("question removed from set successfully");
            }
        });
    })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};
