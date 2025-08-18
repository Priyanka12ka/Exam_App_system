const db = require("../../../db");

function saveStudentAnswer(result_id, question_id, student_answer, callback) {
  //  get correct answer from questions table
  db.query(
    "Select answer from questions where question_id = ?",
    [question_id],
    (err, question) => {
      if (err) return callback(err);
      if (question.length === 0) return callback(new Error("question not found"));

      const correctAnswer = question[0].answer;
      const isCorrect =
        student_answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()? 1: 0;

      db.query(
        "Select * from studentanswerentries where result_id = ? and question_id = ?",
        [result_id, question_id],
        (err, existing) => {
          if (err) return callback(err);

          if (existing.length > 0) {
            // update answer
            db.query(
              "Update studentanswerentries set isCorrect = ? where result_id = ? and question_id = ?",
              [isCorrect, result_id, question_id],
              (err, result) => {
                if (err) {
                  if (err.code === "ER_NO_REFERENCED_ROW_2") {
                    return callback(new Error("Referenced result_id or question_id does not exist"));
                  }
                  return callback(err);
                }
                return callback(null, { result_id, question_id, isCorrect });
              }
            );
          } else {
            // insert answer
            db.query(
              "insert into studentanswerentries (result_id, isCorrect, question_id) values (?, ?, ?)",
              [result_id, isCorrect, question_id],
              (err, result) => {
                if (err) {
                  if (err.code === "ER_NO_REFERENCED_ROW_2") {
                    return callback(new Error("Referenced result_id or question_id does not exist"));
                  }
                  return callback(err);
                }
                return callback(null, { result_id, question_id, isCorrect });
              }
            );
          }
        }
      );
    }
  );
}

module.exports = { saveStudentAnswer };
