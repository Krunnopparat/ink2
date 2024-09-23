// /pages/api/colors.js
import { connectToDatabase } from "@/lib/db";

export async function GET(req) {
    try {
        // เชื่อมต่อกับฐานข้อมูล
        const connection = await connectToDatabase();

        // รันคำสั่ง SQL เพื่อดึงข้อมูลจากตาราง colors
        const [rows] = await connection.query('SELECT * FROM Formula');

        
        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching data from database:', error);
        return new Response(JSON.stringify({ message: 'Error fetching data from database' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
