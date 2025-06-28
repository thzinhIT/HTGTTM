import mysql from "mysql2/promise";

// Create a pool that will be reused for all connections
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "bikerental",
  // Add connection pooling configuration
  waitForConnections: true,
  connectionLimit: 20, // Maximum number of connections in pool
  queueLimit: 0, // Unlimited queue size
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000, // 10 seconds
});

export default pool;
