"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [formulaComponents, setFormulaComponents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [convertibleColors, setConvertibleColors] = useState([]);
  const [convertLoading, setConvertLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch("/api/search");
        const data = await response.json();
        console.log("Data from API:", data);
        setResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };
    fetchColors();

    // Add click event listener to close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setShowDropdown(true);
  };

  const handleSelect = async (option) => {
    setSelectedOption(option);
    setSearchTerm(option.FC_Name);
    setShowDropdown(false);
    setConvertibleColors([]);

    console.log("Selected Option:", option);

    setLoading(true);
    try {
      const response = await fetch(
        `/api/formula_components?FC_ID=${option.FC_ID}`
      );
      const data = await response.json();
      console.log("Data from formula_components:", data);
      setFormulaComponents(data.data || []);
    } catch (error) {
      console.error("Error fetching formula components:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConvertColor = async () => {
    if (!selectedOption) return;

    setConvertLoading(true);
    try {
      const response = await fetch(
        `/api/ChangColor/colors?color=${encodeURIComponent(
          selectedOption.FC_Name
        )}`
      );
      const data = await response.json();
      console.log("Convertible colors:", data);
      setConvertibleColors(data.matchingColors || []);
    } catch (error) {
      console.error("Error fetching convertible colors:", error);
    } finally {
      setConvertLoading(false);
    }
  };

  const handleColorSelection = (targetColor) => {
    if (selectedOption) {
      const params = new URLSearchParams({
        mainColor: selectedOption.FC_Name,
        targetColor: targetColor,
      });
      router.push(`/ChangeColor?${params.toString()}`);
    }
  };

  const filteredResults = searchTerm
    ? results.filter((result) =>
        result.FC_Name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : results;

  return (
    <main className="">
      <div className="max-w-3xl mx-auto">
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link
                href="/"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Home
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <span className="font-medium text-gray-900 dark:text-white">
                ค้นหาสูตรสี
              </span>
            </li>
          </ol>
        </nav>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
            ค้นหาสูตรสีหมึกพิมพ์
          </h1>

          <div className="relative" ref={dropdownRef}>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              placeholder="ค้นหาหรือเลือกสูตรสี..."
              value={searchTerm}
              onChange={handleChange}
              onFocus={() => setShowDropdown(true)}
            />
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {showDropdown && (
              <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredResults.map((result, index) => (
                  <li
                    key={index}
                    className="cursor-pointer py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                    onClick={() => handleSelect(result)}
                  >
                    {result.FC_Name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {selectedOption && (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              สีที่เลือก: {selectedOption.FC_Name}
            </h2>

            <button
              onClick={handleConvertColor}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg mb-6 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={convertLoading}
            >
              {convertLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  กำลังแปลงสี...
                </span>
              ) : (
                "แปลงสี"
              )}
            </button>

            {loading ? (
              <div className="flex items-center justify-center py-4">
                <svg
                  className="animate-spin h-8 w-8 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : formulaComponents.length > 0 ? (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  ส่วนประกอบ:
                </h3>
                <ul className="space-y-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  {formulaComponents.map((component, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center text-gray-700 dark:text-gray-300"
                    >
                      <span className="font-medium">{component.CC_Name}</span>
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                        {component.Ratio} kg
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300 text-center py-4">
                ไม่พบข้อมูลส่วนประกอบสำหรับสีนี้
              </p>
            )}

            {convertibleColors.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  สีที่สามารถแปลงได้:
                </h3>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {convertibleColors.map((color, index) => (
                    <li
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-center text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition duration-300 ease-in-out"
                      onClick={() => handleColorSelection(color)}
                    >
                      {color}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
