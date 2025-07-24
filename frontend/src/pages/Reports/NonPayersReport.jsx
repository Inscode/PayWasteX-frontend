// src/pages/reports/NonPayersReport.jsx
import React from "react";

const NonPayersReport = () => {
  return (
    <div className="min-h-screen px-4 py-8 bg-white text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6">
        List Of Non-Payers (Defaulters)
      </h1>

      <div className="text-gray-700 font-medium mb-4 flex flex-wrap justify-center gap-6">
        <p><span className="font-semibold text-[#224A29]">Zone:</span> Anuradhapura 01</p>
        <p><span className="font-semibold text-[#224A29]">Collector:</span> Mr. Prasad Perera</p>
        <p><span className="font-semibold text-[#224A29]">Date:</span> 01/07/2025 - 31/07/2025</p>
      </div>

      <div className="flex justify-center gap-4 mt-12 flex-wrap">
        <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded font-semibold">
          Re-Generate Report
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold">
          Download As PDF
        </button>
        <button className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 px-6 py-2 rounded font-semibold">
          Back To Report List
        </button>
      </div>
    </div>
  );
};

export default NonPayersReport;
