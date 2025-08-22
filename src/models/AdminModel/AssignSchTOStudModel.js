const db = require("../../../db.js");

// CREATE
exports.assignSchedule = (stud_id, schedule_id) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO student_schedule (stud_id, schedule_id) VALUES (?, ?)";
        db.query(query, [stud_id, schedule_id], (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") reject("Already assigned");
                else reject(err.sqlMessage || "database error");
            } else resolve("Assigned successfully");
        });
    }).then(result => ({ result }))
      .catch(err => ({ err }));
};

// READ all
exports.getAllAssignments = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT ss.id, st.stud_id, st.username, s.schedule_id, e.title as exam_title,
                   DATE_FORMAT(s.date,'%Y-%m-%d') as date, s.start_time, s.end_time
            FROM student_schedule ss
            JOIN students st ON ss.stud_id = st.stud_id
            JOIN schedule s ON ss.schedule_id = s.schedule_id
            JOIN exams e ON s.exam_id = e.exam_id
            ORDER BY st.username, s.date
        `;
        db.query(query, (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else resolve(result);
        });
    }).then(result => ({ result }))
      .catch(err => ({ err }));
};

// READ by ID
exports.getAssignmentById = (id) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM student_schedule WHERE id=?", [id], (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else if (result.length === 0) reject("Not found");
            else resolve(result[0]);
        });
    }).then(result => ({ result }))
      .catch(err => ({ err }));
};

// UPDATE (reassign)
exports.updateAssignment = (id, stud_id, schedule_id) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE student_schedule SET stud_id=?, schedule_id=? WHERE id=?";
        db.query(query, [stud_id, schedule_id, id], (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else if (result.affectedRows === 0) reject("Not found");
            else resolve("Assignment updated");
        });
    }).then(result => ({ result }))
      .catch(err => ({ err }));
};

// DELETE
exports.deleteAssignment = (id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM student_schedule WHERE id=?", [id], (err, result) => {
            if (err) reject(err.sqlMessage || "database error");
            else if (result.affectedRows === 0) reject("Not found");
            else resolve("Assignment deleted");
        });
    }).then(result => ({ result }))
      .catch(err => ({ err }));
};
