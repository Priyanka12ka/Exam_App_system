const ExamModel = require("../../models/AdminModel/EvaluateStudentansmodel");
const db=require("../../../db");

// Start Exam
exports.startExam = async (req, res) => {
  console.log("\n=== startExam API called ===");
  console.log("Request body:", req.body);

  const { schedule_id, stud_id } = req.body;
  
  try {
    const response = await ExamModel.startExam(schedule_id, stud_id);
    console.log("Model response:", response);

    if ("result" in response) {
      console.log("startExam success -> Sending result_id:", response.result.result_id);
      res.status(200).json({ data: response.result });
    } else {
      const msg = response.err || "Unknown error";
      console.warn("startExam failed:", msg);
      res.status(msg === "unauthorized exam access" ? 403 : 400).json({ msg });
    }
  } catch (err) {
    console.error("Controller error in startExam:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get a single question by index
exports.getExamQuestions = async (req, res) => {
  console.log("\n=== getExamQuestions API called ===");
  console.log("Request params:", req.params);

  const { set_id, index } = req.params;

  try {
    const question = await ExamModel.fetchQuestionByIndex(set_id, index);
    console.log("Question fetched:", question);

    if (!question) {
      console.warn("No question found at index:", index);
      return res.status(404).json({ msg: "Question not found." });
    }
    res.json({ data: { question } });
  } catch (err) {
    console.error("Controller error in getExamQuestions:", err);
    res.status(500).json({ msg: "Server error while fetching exam question." });
  }
};

// Save student answer
exports.saveAnswer = async (req, res) => {
  console.log("\n=== saveAnswer API called ===");
  console.log("Request body:", req.body);

  const { result_id, question_id, student_answer } = req.body;

  try {
    const response = await ExamModel.saveStudentAnswer(result_id, question_id, student_answer);
    console.log("Model response:", response);

    if ("result" in response) {
      console.log("Answer saved successfully.");
      res.status(200).json({ data: response.result });
    } else {
      const msg = response.err || "Unknown error";
      console.warn("saveAnswer failed:", msg);
      res.status(msg === "question not found" ? 404 : 400).json({ msg });
    }
  } catch (err) {
    console.error("Controller error in saveAnswer:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Generate result for a student
exports.generateResultt = async (req, res) => {


  const { stud_id ,exam_id} = req.params;
  

  try {
    const response = await ExamModel.generateResult(stud_id ,exam_id);
    console.log("Model response:", response);

    if ("result" in response) {
      console.log("Result generated successfully.");
      res.status(200).json({ data: response.result });
    } else {
      const msg = response.err || "Unknown error";
      console.warn("generateResult failed:", msg);
      res.status(400).json({ msg });
    }
  } catch (err) {
    console.error("Controller error in generateResult:", err);
    res.status(500).json({ msg: "Server error while generating result." });
  }
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