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
exports.updatestudentprofile=(stud_id, username, email, contact, password)=>
 {
    return new Promise((resolve,reject)=>
    {
        db.query("update students set username=?, email=? ,contact=?, password=? where stud_id=?",[ username, email, contact, password, stud_id],(err,result)=>{
         if(err)
         {
            reject(err.sqlMessage || "database error");

         }
         else if(result.affectedRows===0)
         {
            reject({err:"user not found"});
         }
         else{
            resolve({result:"student detail updated successfully!!!"});
         }
        })
    }).then((result)=>
    {
        return{result};
    }).catch((err)=>
    {
        return{err};
    })
 }