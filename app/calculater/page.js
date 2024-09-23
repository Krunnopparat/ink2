"use client";
import DimentionCal from "@/components/DimentionCal";
import FilmWidthCal from "@/components/FilmWidthCal";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = ( option ) => {
    setSelectedOption(option);
  }

  return (
    <>
      <main className="mx-4 md:mx-10 mt-8">
        <nav className="flex mb-7" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  href="/"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Calculater
                </Link>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col justify-center items-center">
          <h1 className="mb-2 text-2xl md:text-4xl text-gray-900 dark:text-white">
            คำนวณปริมาณหมึกพิมพ์
          </h1>
          <ul className="w-full flex flex-row justify-center mx-auto">
            
            <li className="px-1 md:px-3 w-full">
              <input
                type="checkbox"
                id="dimention-option"
                value="Label Dimention"
                className="hidden peer"
                onChange={() => handleOptionChange('Label Dimention')}
                checked={selectedOption === 'Label Dimention'}
              />
              <label
                htmlFor="dimention-option"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 hover:border-blue-600 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="block">
                  <div className="w-full text-lg">Label  Dimention</div>
                </div>
              </label>
            </li>
            <li className="px-1 md:px-3 w-full">
              <input
                type="checkbox"
                id="film-option"
                value="Film Width"
                className="hidden peer"
                onChange={() => handleOptionChange('Film Width')}
                checked={selectedOption === 'Film Width'}
              />
              <label
                htmlFor="film-option"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 hover:text-gray-950 bg-white border-2 border-gray-200 hover:border-blue-600 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="block">
                  <div className="w-full text-lg">Film Width</div>
                </div>
              </label>
            </li>
          </ul>
        </div>
        <div className="mt-5 w-full">
          {selectedOption === 'Film Width' && (
            <FilmWidthCal/>
          )}
          {selectedOption === 'Label Dimention' && (
            <DimentionCal/>
          )}
        </div>
      </main>
    </>
  );
}
