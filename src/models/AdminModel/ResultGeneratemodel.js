const db=require("../../../db.js");
exports.getResultByStudentId = (studId) => {
  return new Promise((resolve, reject) => {
    const query = `
      select 
        r.result_id,
        student_result_detail.Correct_Answer,
        student_result_detail.Total_Questions,
        student_result_detail.Percentage,
        s.username,
        ss.name AS subject_name,
        e.total_marks
      from 
      (
        select 
          result_id, 
          SUM(iscorrect) AS Correct_Answer,
          COUNT(result_id) AS Total_Questions,
          (SUM(iscorrect)/COUNT(result_id)*100) AS Percentage 
        from studentanswerentries 
        group by result_id
      ) student_result_detail 
      inner join results r ON student_result_detail.result_id = r.result_id 
      inner join students s ON s.stud_id = r.stud_id 
      inner join exams e ON e.exam_id = r.exam_id 
      inner join subjects ss ON ss.subject_id = e.subject_id
      where s.stud_id = ?
    `;

    db.query(query, [studId], (err, results) => {
      if (err) {
        reject(err.sqlMessage || "database error");
      } else if (results.length === 0) {
        reject("No results found for this student");
      } else {
        resolve(results);
      }
    });
  })
  .then(result => ({ result }))
  .catch(err => ({ err }));
};
