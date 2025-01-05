import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2';

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'FormDB',
    port: process.env.DB_PORT || 3306,
});

export default pool.promise();

