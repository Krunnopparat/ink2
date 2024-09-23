// app/api/ChangColor/colors/convertColor/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export async function POST(request) {
  let connection;
  try {
    const { currentColor, currentAmount, newColor } = await request.json();

    if (!currentColor || !currentAmount || !newColor) {
      return NextResponse.json({ error: 'ข้อมูลไม่ครบถ้วน' }, { status: 400 });
    }

    connection = await connectToDatabase();

    // ฟังก์ชันสำหรับดึงข้อมูลสีจากฐานข้อมูล
    async function getColorData(colorName) {
      const [rows] = await connection.execute(`
        SELECT formula_components.CC_Name, formula_components.Ratio
        FROM Formula
        JOIN formula_components ON Formula.FC_ID = formula_components.FC_ID
        WHERE Formula.FC_Name = ?
      `, [colorName]);

      return rows.reduce((acc, { CC_Name, Ratio }) => {
        acc[CC_Name] = parseFloat(Ratio);
        return acc;
      }, {});
    }

    // ฟังก์ชันคำนวณการแปลงสี
    function calculateConversion(currentColorData, newColorData, currentAmount) {
      const currentTotal = Object.values(currentColorData).reduce((sum, ratio) => sum + ratio, 0);
      const currentScale = currentAmount / currentTotal;

      const currentAmounts = Object.fromEntries(
        Object.entries(currentColorData).map(([component, ratio]) => [component, ratio * currentScale])
      );

      const newTotal = Object.values(newColorData).reduce((sum, ratio) => sum + ratio, 0);
      const targetTotal = Math.max(...Object.values(currentAmounts)) * (newTotal / 100);

      const additions = {};
      const finalAmounts = {};
      let totalAddition = 0;

      for (const [component, ratio] of Object.entries(newColorData)) {
        const targetAmount = targetTotal * (ratio / 100);
        const currentAmount = currentAmounts[component] || 0;
        const addition = Math.max(0, targetAmount - currentAmount);

        additions[component] = addition;
        finalAmounts[component] = currentAmount + addition;
        totalAddition += addition;
      }

      const totalFinalAmount = Object.values(finalAmounts).reduce((sum, amount) => sum + amount, 0);

      return { additions, finalAmounts, totalFinalAmount, totalAddition };
    }

    // ดึงข้อมูลสีและคำนวณ
    const currentColorData = await getColorData(currentColor);
    const newColorData = await getColorData(newColor);
    const result = calculateConversion(currentColorData, newColorData, currentAmount);

    return NextResponse.json({
      currentColor,
      newColor,
      currentAmount,
      ...result
    });

  } catch (error) {
    console.error('ข้อผิดพลาดในการแปลงสี:', error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}