// app/api/ChangColor/colors/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export async function GET(request) {
  let connection;
  try {
    connection = await connectToDatabase();

    // ดึงข้อมูลสีทั้งหมดจากฐานข้อมูล
    const [results] = await connection.execute(`
      SELECT DISTINCT Formula.FC_Name
      FROM Formula
    `);

    const colors = results.map(row => row.FC_Name);

    return NextResponse.json(colors);
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function POST(request) {
  let connection;
  try {
    const { color } = await request.json();

    if (!color) {
      return NextResponse.json({ error: 'Color parameter is required' }, { status: 400 });
    }

    connection = await connectToDatabase();

    // Query เพื่อดึงข้อมูลสีและส่วนประกอบ
    const [results] = await connection.execute(`
      SELECT Formula.FC_Name, formula_components.CC_Name, formula_components.Ratio
      FROM Formula
      JOIN formula_components ON Formula.FC_ID = formula_components.FC_ID
      WHERE Formula.FC_Name = ?
    `, [color]);

    // แปลงผลลัพธ์เป็นรูปแบบที่ต้องการ
    const colorData = results.reduce((acc, { FC_Name, CC_Name, Ratio }) => {
      if (!acc[FC_Name]) {
        acc[FC_Name] = {};
      }
      acc[FC_Name][CC_Name] = parseFloat(Ratio);
      return acc;
    }, {});

    return NextResponse.json(colorData);
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}