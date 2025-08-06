const db = require("../../../db.js");

exports.addQuestion = (subject_id, question_text, option1, option2, option3, option4, answer) => {
  return new Promise((resolve, reject) => {
    db.query("select subject_id from subjects where subject_id = ?", [subject_id], (err, subjectResult) => {
      if (err) {
        reject(err.sqlMessage || "database error");
      } else if (subjectResult.length === 0) {
        reject("subject not found");
      } else {
        db.query(
          "insert into questions (subject_id, question_text, option1, option2, option3, option4, answer) values (?, ?, ?, ?, ?, ?, ? )",
          [subject_id, question_text, option1, option2, option3, option4, answer],
          (err, result) => {
            if (err) {
              reject(err.sqlMessage || "database error");
            } else if (result.affectedRows > 0) {
              resolve("question inserted successfully");
            } else {
              reject("question not inserted");
            }
          }
        );
      }
    });
  })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

exports.getAllQuestion = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from questions", (err, result) => {
      if (err) {
        reject(err.sqlMessage || "database error");
      } else {
        if (result.length > 0) {
          resolve(result);
        } else {
          reject("question not present");
        }
      }
    });
  })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

exports.getQuestionById = (question_id) => {
  return new Promise((resolve, reject) => {
    db.query("select * from questions where question_id = ?", [question_id], (err, result) => {
      if (err) {
        reject(err.sqlMessage || "database error");
      } else {
        if (result.length > 0) {
          resolve(result[0]);
        } else {
          reject("question not found");
        }
      }
    });
  })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

exports.updateQuestion = (question_id, question_text, option1, option2, option3, option4, answer) => {
  return new Promise((resolve, reject) => {
    db.query(
      "update questions set question_text = ?, option1 = ?, option2 = ?, option3 = ?, option4 = ?, answer = ? where question_id = ?",
      [question_text, option1, option2, option3, option4, answer, question_id],
      (err, result) => {
        if (err) {
          reject(err.sqlMessage || "database error");
        } else {
          if (result.affectedRows > 0) {
            resolve("question updated successfully");
          } else {
            reject("question not found or no changes made");
          }
        }
      }
    );
  })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

exports.deleteQuestion = (question_id) => {
  return new Promise((resolve, reject) => {
    db.query("delete from questions where question_id = ?", [question_id], (err, result) => {
      if (err) {
        reject(err.sqlMessage || "database error");
      } else {
        if (result.affectedRows > 0) {
          resolve("question deleted successfully");
        } else {
          reject("question not found");
        }
      }
    });
  })
    .then(result => ({ result }))
    .catch(err => ({ err }));
};

exports.searchQuestionByName = (question_text) => {
  return new Promise((resolve, reject) => {
    db.query("select * from questions where question_text like ?", [`%${question_text}%`], (err, result) => {
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
