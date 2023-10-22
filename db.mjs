import mysql from "mysql2";

//connect to database
 const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mohamed@1998",
    database: "portfolio",
  });

  export default connection