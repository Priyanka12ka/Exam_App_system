require("dotenv").config();
let mysql=require("mysql2");

let conn=mysql.createConnection({
    host:process.env.db_host,
    user:process.env.db_username,
    password:process.env.db_password,
    database:process.env.db_dbname

});

conn.connect((err)=>
{
    if(err)
    {
        console.log("Error occcure to connect with database!!!" + err);
    }
    else{
        console.log("Database connected successfully");
        
    }

})
module.exports = conn;