// /lib/db.js
import mysql from 'mysql2/promise';

export async function connectToDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectTimeout: 10000, // ตั้งเวลา timeout เป็น 10 วินาที
    });

    return connection;
}
