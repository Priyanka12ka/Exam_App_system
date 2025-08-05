const db = require("../../../db.js");
let jwt = require("jsonwebtoken");
exports.checkStudentExists = (email, username) => {
  return new Promise((resolve, reject) => {
    const sql = ("select * from students where email = ? or username = ?", [email, username], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.registerStudent = (name, contact, email, username, password) => {
  return new Promise((resolve, reject) => {
    db.query("insert into students values ('0',?,?,?,?,?)", [name, contact, email, username, password], (err, result) => {
      if (err) {
        console.log(err);
        if (err.code == "ER_DUP_ENTRY") {
          reject(email + " is duplicate entry");
        }
        else if (err.code == "ER_NO_SUCH_TABLE") {
          reject("table not exist");
        } else {
          reject(err.sqlMessage);
        }

      }
      else {
        if (result.affectedRows > 0) {


          resolve({ "msg": "insert data" });

        }
        else {
          reject("not registered");
        }
      }
    })
  })
    .then((result) => {

      return { "result": result }
    })
    .catch((err) => {
      console.log(err);
      return { "err": err }
    })
}

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
          let token = jwt.sign(result[0], process.env.JWT_SECRET, { expiresIn: '30d' });
         
          resolve({ "msg": result[0], "isFound": true, "token": token });
        }
        else {

          reject({ "msg": "password is wrong", "isFound": true })

        }

      }
    })
  })
    .then((result) => {
      console.log(result);
      return { "result": result }
    })
    .catch((err) => {
      console.log(err);
      return { "err": err }
    })
}
