import mysql from "mysql2";

var config = {
  host: "db4free.net",
  user: "rooty4",
  password: "admin123#",
  database: "ayd1_p2",
  port: 3306
};
const conn = new mysql.createConnection(config);

export default conn;