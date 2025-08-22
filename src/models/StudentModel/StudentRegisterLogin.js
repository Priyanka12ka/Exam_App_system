const db = require("../../../db.js");
const jwt = require("jsonwebtoken");


exports.checkStudentExists = (email, username) => {
  return new Promise((resolve, reject) => {
    const sql = "select * from students where email = ? or username = ?";
    db.query(sql, [email, username], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.registerStudent = (username, contact, email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "insert into students (stud_id, username, email, contact, password) values (0, ?, ?, ?, ?)";
    db.query(sql, [username, email, contact, password], (err, result) => {
      if (err) {
     
        if (err.code === "ER_DUP_ENTRY") {
          reject("You Are Already Registered");
        } else {
          reject(err.sqlMessage);
        }
      } else {
        if (result.affectedRows > 0) {
          resolve("Student Register Successfulyy!!!!");
        } else {
          reject("not registered");
        }
      }
    });
  })
    .then((msg) => {
      return { result: msg };
    })
    .catch((err) => {
      console.log(err);
      return { err: err };
    });
};


exports.loginStudent = (username, password) => {
  return new Promise((resolve, reject) => {
    db.query("select * from students where username=? ", [username], (err, result) => {
      if (err) {

        reject({ "msg": "User Not Found", "isfound": false });

      }
      else {
        if (result.length == 0) {
          reject({ "msg": "user not present", "isFound": false });
        }
        else if (result[0].password == password) {
          const payload = {
            stud_id: result[0].stud_id,  
            username: result[0].username,
            email: result[0].email,
            role: "student"
          };

          let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
          resolve({ msg: result[0], isFound: true, token: token });
        }


        else {

          reject({ "msg": "password is wrong", "isFound": true })

        }

      }
    })
  })
    .then((result) => {

      return { "result": result }
    })
    .catch((err) => {

      return { "err": err }
    })
} 