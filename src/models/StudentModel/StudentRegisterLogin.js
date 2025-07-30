const db = require("../../../db.js");

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
        else if(err.code=="ER_NO_SUCH_TABLE")
          {
            reject("table not exist");
          }else {
          reject(err.sqlMessage);
        }

      }
      else {
        if (result.affectedRows > 0) {
          resolve("inseredd data");
        }
        else {
          reject("not registered");
        }
      }
    })
  })
  .then((result)=>{
    console.log(result);
    return {"result":result}
  })
  .catch((err)=>
  {
    console.log(err);
    return {"err":err}
  })
}

exports.loginStudent = (username, password) => {
  return new Promise((resolve, reject) => {
     db.query("select * from students where username=? ", [username] ,(err, result) => {
      if (err) {
        console.log(err);
          reject({"msg":"User Not Found" ,"isfound":false});
    
      }
      else {
       if(result[0].password==password)
       {
       resolve({"msg" : result[0], "isFound" :  true})
       }
       else{
        reject({"msg":"password is wrong" ,"isFound":true})
        
       }

      }
    })
  })
  .then((result)=>{
    console.log(result);
    return {"result":result}
  })
  .catch((err)=>
  {
    console.log(err);
    return {"err":err}
  })
}