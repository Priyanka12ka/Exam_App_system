const db = require("../../../db.js");

exports.checkEmailExists = (email, password) => {
    return new Promise((resolve, reject) => {
        db.query(("select * from admins where  email=? "), [email], (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    reject({ "msg": "Duplicate email" });
                }
                
                else {
                    reject(err.sqlMessage);
                }
            }
            else {
                if (result.length==0) {
                     reject({"msg":"user not found" ,"isfound":false});
                }
                else if(result[0].password == password )
                {
                    resolve({ "msg": "admin exists", "isfound": true });
                     
                }
                else {
                    reject({ "msg": "You are entering Wrong Password", "isfound": true });
                }

            }

        })
    }).then((result) => {
        return { "result": result };
    }).catch((err) => {
        return { "err": err };
    })

};
