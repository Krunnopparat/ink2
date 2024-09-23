"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ChangeColorForm() {
  const searchParams = useSearchParams();
  const [mainColor, setMainColor] = useState('');
  const [targetColor, setTargetColor] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [conversionResult, setConversionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const main = searchParams.get('mainColor');
    const target = searchParams.get('targetColor');
    if (main && target) {
      setMainColor(main);
      setTargetColor(target);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/ChangColor/colors/convertColor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentColor: mainColor,
          currentAmount: parseFloat(currentAmount),
          newColor: targetColor,
        }),
      });
      if (!response.ok) {
        throw new Error('การแปลงสีล้มเหลว');
      }
      const data = await response.json();
      setConversionResult(data);
    } catch (err) {
      setError('ไม่สามารถแปลงสีได้ กรุณาลองใหม่อีกครั้ง');
      console.error('ข้อผิดพลาดในการแปลงสี:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="">
      <div className="max-w-3xl mx-auto">
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                หน้าหลัก
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <span className="font-medium text-gray-900 dark:text-white">แปลงสี</span>
            </li>
          </ol>
        </nav>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">แปลงสี</h1>
          
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                กำลังแปลงสีจาก <span className="font-semibold">{mainColor}</span> เป็น <span className="font-semibold">{targetColor}</span>
              </p>
            </div>
            <div className="mb-4">
              <label htmlFor="currentAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ปริมาณสีปัจจุบัน (กรัม)
              </label>
              <input
                type="number"
                id="currentAmount"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? 'กำลังแปลงสี...' : 'แปลงสี'}
            </button>
          </form>

          {loading && (
            <div className="flex justify-center items-center py-4">
              <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">ข้อผิดพลาด!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {conversionResult && (
            <div className="bg-green-100 dark:bg-green-800 rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">ผลการแปลงสี</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">ปริมาณที่ต้องเพิ่ม:</h3>
                  <ul className="space-y-2">
                    {Object.entries(conversionResult.additions).map(([component, amount]) => (
                      <li key={component} className="flex justify-between items-center bg-white dark:bg-gray-700 p-2 rounded-md">
                        <span className="text-gray-700 dark:text-gray-300">{component}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{amount.toFixed(2)} กรัม</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">ปริมาณสุดท้าย:</h3>
                  <ul className="space-y-2">
                    {Object.entries(conversionResult.finalAmounts).map(([component, amount]) => (
                      <li key={component} className="flex justify-between items-center bg-white dark:bg-gray-700 p-2 rounded-md">
                        <span className="text-gray-700 dark:text-gray-300">{component}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{amount.toFixed(2)} กรัม</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
                    ปริมาณรวมทั้งหมด: {conversionResult.totalFinalAmount.toFixed(2)} กรัม
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}