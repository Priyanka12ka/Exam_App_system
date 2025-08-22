const db = require("../../../db"); 

exports.getStudentSchedule = (stud_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                s.schedule_id, 
                e.exam_id, 
                e.title AS exam_title,
                sub.name AS subject_name, 
                DATE_FORMAT(s.date, '%d/%m/%Y') AS exam_date, 
                s.start_time,
                s.end_time,
                e.total_marks 
            FROM student_schedule ss 
            JOIN schedule s ON ss.schedule_id = s.schedule_id 
            JOIN exams e ON s.exam_id = e.exam_id 
            JOIN subjects sub ON e.subject_id = sub.subject_id 
            WHERE ss.stud_id = ? 
            ORDER BY s.date, s.start_time;
        `;

        db.query(query, [stud_id], (err, result) => {
            if (err) {
                console.log("DB ERROR:", err.sqlMessage);
                reject(err.sqlMessage || "database error");
            } else if (result.length === 0) {
                reject("No schedules found for this student");
            } else {
                resolve(result);
            }
        });
    });
};
