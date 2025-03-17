const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Internet@2020',
    database: process.env.DB_NAME || 'dev',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;