import mysql from "mysql2";

var config = {
  host: "",
  user: "",
  password: "",
  database: "",
  port: ,
};
const conn = new mysql.createConnection(config);

export default conn;