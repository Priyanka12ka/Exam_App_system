const db=require("../../../db.js");

exports.addSchedule=(title,date,start_time,end_time,exam_id)=>
{
    return new Promise((resolve,reject)=>
    {
        db.query("insert into schedule values('0',?,?,?,?,?)",[title,date,start_time,end_time,exam_id],(err,result)=>
        {
            if(err){
            {
               reject(err.sqlMessage || "Database error");
            }
        }
            else
            {
               if(result.affectedRows>0)
               {
                    resolve("schedule inserted");
               }
               else{
                    reject("Schedule not inserted");
               }
            }
        })
    }).then((result=>
    {
        return {"result":result}
    }
    )).catch((err)=>
    {
        return {"err":err}
    })
}