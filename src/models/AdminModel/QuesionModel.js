const db = require("../../../db.js");

exports.addQuestion = (exam_id, question_text, option1, option2, option3, option4, answer, mark) => {
    return new Promise((resolve, reject) => {
        db.query(
            "insert into questions values('0', ?, ?, ?, ?, ?, ?, ?, ?)",
            [exam_id, question_text, option1, option2, option3, option4, answer, mark],
            (err, result) => {
                if (err) {
                    // Foreign key check
                    if (err.code === "ER_NO_REFERENCED_ROW_2") {
                        reject("Exam doesn't exist");
                    } else {
                        reject(err.sqlMessage || "Database Error");
                    }
                } else {
                    if (result.affectedRows > 0) {
                        resolve("Question inserted successfully");
                    } else {
                        reject("Question not inserted due to unknown error");
                    }
                }
            }
        );
    })
    .then((result) => {
        return { result: result };
    })
    .catch((err) => {
        return { err: err };
    });
};
exports.getAllQuestion = (question_id) => {
  return new Promise((resolve, reject) => {
    db.query("Select * from questions", (err, result) => {
      if (err) {
        reject(err.sqlMessage || "Database error");
      } else {
        if (result.length > 0) {
          resolve(result); 
        } else {
          reject("Question not present");
        }
      }
    });
  })
    .then((result) => {
      return { result };
    })
    .catch((err) => {
      return { err };
    });
};
exports.getQuestionById = (question_id) => {
  return new Promise((resolve, reject) => {
    db.query("select * from questions where question_id = ?", [question_id], (err, result) => {
      if (err) {
        reject(err.sqlMessage || "Database error");
      } else {
        if (result.length > 0) {
          resolve(result[0]); 
        } else {
          reject("Question not found");
        }
      }
    });
  })
    .then((result) => {
      return { result };
    })
    .catch((err) => {
      return { err };
    });
};

exports.updateQuestion = (question_id,question_text,option1,option2,option3,option4,answer,mark) => {
  return new Promise((resolve, reject) => {
    db.query("update questions set question_text = ?, option1 = ?, option2 = ?, option3 = ?, option4 = ?, answer = ?, mark = ? where question_id = ?",
      [question_text, option1, option2, option3, option4, answer, mark, question_id],
      (err, result) => {
        if (err) {
          reject(err.sqlMessage || "Database Error");
        } else {
          if (result.affectedRows > 0) {
            resolve("Question updated successfully");
          } else {
            reject("Question not found or no changes made");
          }
        }
      }
    );
  })
    .then((result) => {
      return { result };
    })
    .catch((err) => {
      return { err };
    });
};
exports.deleteQuestion = (question_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from questions where question_id = ?",
      [question_id],
      (err, result) => {
        if (err) {
          reject(err.sqlMessage || "Database error");
        } else {
          if (result.affectedRows > 0) {
            resolve("Question deleted successfully");
          } else {
            reject("Question not found");
          }
        }
      }
    );
  })
    .then((result) => {
      return { result };
    })
    .catch((err) => {
      return { err };
    });
};


exports.searchQuestionByName = (question_text) => {
  return new Promise((resolve, reject) => {
    db.query("select * from questions where question_text like ?", [`%${question_text}%`],(err, result) => {
        if (err) {
          reject(err.sqlMessage || "Database error");
        } else {
          resolve(result);
        }
      }
    );
  })
    .then((result) => {
      return { result };
    })
    .catch((err) => {
      return { err };
    });
};
