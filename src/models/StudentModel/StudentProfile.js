const db = require("../../../db");
exports.viewstudentprofile = (stud_id) => {
    return new Promise((resolve, reject) => {
        db.query("select * from students where stud_id=?", [stud_id], (err, result) => {
            if (err) {
                reject(err.sqlMessage );
            } 
            else if (result.length === 0) 
            {
                reject("Profile not found");
            } else {
                resolve(result);
            }
        });
    }).then((result) => {
        return { result };
    }).catch((err) => {
        return { err };
    });
};
