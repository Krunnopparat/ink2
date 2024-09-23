// /pages/api/formula_components.js
import { connectToDatabase } from "@/lib/db";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const fcId = searchParams.get('FC_ID');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10; // จำนวนข้อมูลต่อหน้า
    const offset = (page - 1) * limit;

    if (!fcId) {
        return new Response(JSON.stringify({ message: 'FC_ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const connection = await connectToDatabase();

        const [rows] = await connection.query(
            'SELECT * FROM formula_components WHERE FC_ID = ? LIMIT ? OFFSET ?',
            [fcId, limit, offset]
        );

        const [countResult] = await connection.query(
            'SELECT COUNT(*) as total FROM formula_components WHERE FC_ID = ?',
            [fcId]
        );
        const total = countResult[0].total;

        return new Response(JSON.stringify({
            data: rows,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching data from database:', error);
        return new Response(JSON.stringify({ message: 'Error fetching data from database' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}