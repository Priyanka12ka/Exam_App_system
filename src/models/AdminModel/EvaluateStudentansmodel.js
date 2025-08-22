const db = require("../../../db.js");

// Start Exam
exports.startExam = (schedule_id, stud_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT s.exam_id, s.setID 
       FROM student_schedule ss 
       INNER JOIN schedule s ON s.schedule_id = ss.schedule_id 
       WHERE ss.stud_id = ? AND ss.schedule_id = ?`,
      [stud_id, schedule_id],
      (err, result) => {
        if (err) {
          return reject(err.sqlMessage || "database error");
        }
        if (result.length === 0) {
          return reject("unauthorized exam access");
        }

        const exam_id = result[0].exam_id;
        const setID = result[0].setID;

        // Check if result already exists
        db.query(
          "SELECT result_id FROM results WHERE exam_id = ? AND stud_id = ?",
          [exam_id, stud_id],
          (err2, rows) => {
            if (err2) {
              return reject(err2.sqlMessage || "database error");
            }

            if (rows.length > 0) {
              resolve({ result: { result_id: rows[0].result_id, setID } });
            } else {
              db.query(
                "INSERT INTO results (exam_id, stud_id) VALUES (?, ?)",
                [exam_id, stud_id],
                (err3, result3) => {
                  if (err3) {
                    return reject(err3.sqlMessage || "database error");
                  }
                  resolve({ result: { result_id: result3.insertId, setID } });
                }
              );
            }
          }
        );
      }
    );
  }).catch(err => {
    return { err };
  });
};


exports.fetchQuestionByIndex = (set_id, index) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
          q.question_id, 
          q.question_text, 
          q.option1, 
          q.option2, 
          q.option3, 
          q.option4
      FROM 
          questions q
      JOIN 
          setquestionentry sqe ON q.question_id = sqe.questionID
      WHERE 
          sqe.setID = ?
      LIMIT 1 OFFSET ?
    `;
    db.query(query, [set_id, parseInt(index)], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0] || null);
      }
    });
  });
};

// Save Student Answer
exports.saveStudentAnswer = (result_id, question_id, student_answer) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT answer FROM questions WHERE question_id = ?",
      [question_id],
      (err, question) => {
        if (err) {
          return reject(err.sqlMessage || "database error");
        }
        if (question.length === 0) {
          return reject("question not found");
        }

        const correctAnswer = question[0].answer;
        const isCorrect = student_answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase() ? 1 : 0;

        // Check if the answer already exists
        db.query(
          "SELECT * FROM studentanswerentries WHERE result_id = ? AND question_id = ?",
          [result_id, question_id],
          (err2, existing) => {
            if (err2) {
              return reject(err2.sqlMessage || "database error");
            }

            if (existing.length > 0) {
              db.query(
                "UPDATE studentanswerentries SET isCorrect = ? WHERE result_id = ? AND question_id = ?",
                [isCorrect, result_id, question_id],
                (err3) => {
                  if (err3) {
                    return reject(err3.sqlMessage || "database error");
                  }
                  resolve({ result: { result_id, question_id, isCorrect } });
                }
              );
            } else {
              db.query(
                "INSERT INTO studentanswerentries (result_id, isCorrect, question_id) VALUES (?, ?, ?)",
                [result_id, isCorrect, question_id],
                (err4) => {
                  if (err4) {
                    return reject(err4.sqlMessage || "database error");
                  }
                  resolve({ result: { result_id, question_id, isCorrect } });
                }
              );
            }
          }
        );
      }
    );
  }).catch(err => {
    return { err };
  });
};
exports.generateResult = (req, res) => {
  const { stud_id, exam_id } = req.params;
console.log("modelll");
console.log(stud_id,exam_id);
  const query = `
    SELECT
      r.result_id,
      s.username AS student_name,
      e.title AS exam_name,
      sub.name AS subject_name,
      COUNT(a.isCorrect) AS correct_answers,
      e.total_marks,
      ROUND((COUNT(a.isCorrect) / e.total_marks) * 100, 2) AS percentage,
      CASE
        WHEN (COUNT(a.isCorrect) / e.total_marks) * 100 >= 40 THEN 'Pass'
        ELSE 'Fail'
      END AS status
    FROM results r
    JOIN students s ON r.stud_id = s.stud_id
    JOIN exams e ON r.exam_id = e.exam_id
    JOIN subjects sub ON e.subject_id = sub.subject_id
    LEFT JOIN studentanswerentries a ON a.result_id = r.result_id AND a.isCorrect = 1
    WHERE r.stud_id = ? AND r.exam_id = ?
    GROUP BY r.result_id, s.username, e.title, sub.name, e.total_marks
  `;

  db.query(query, [stud_id, exam_id], (err, rows) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: "Result not found" });
    }
    const r = rows[0];
    res.json({
      result_id: r.result_id,
      student_name: r.student_name,
      exam_name: r.exam_name,
      subject_name: r.subject_name,
      total_marks: r.total_marks,
      score: r.correct_answers,
      percentage: r.percentage,
      status: r.status
    });
  });
};