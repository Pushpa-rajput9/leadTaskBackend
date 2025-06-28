import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
let pool;
try {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
  });
  console.log("connected to database");
} catch (error) {
  console.log(error + "Not connected to database");
}

export default pool;
