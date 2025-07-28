import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";

const PerformanceSummery = () => {
  const navigate = useNavigate();
  const reportRef = useRef(null);

  const handleDownloadPDF = () => {
    const element = reportRef.current;
    const options = {
      filename: "performance-summary.pdf",
      margin: 0.5,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-white text-gray-800">
      <div ref={reportRef}>
        <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Collector-wise Performance Summary
        </h1>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg text-sm">
            <thead className="bg-gray-100 text-green-800">
              <tr>
                <th className="px-4 py-2 text-left">Collector Name</th>
                <th className="px-4 py-2 text-left">Zone(s)</th>
                <th className="px-4 py-2 text-right">Total Collected (LKR)</th>
                <th className="px-4 py-2 text-right">No of Payments</th>
                <th className="px-4 py-2 text-right">Avg per Day</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white even:bg-gray-50">
                <td className="px-4 py-2">Prasad Perera</td>
                <td className="px-4 py-2">Zone A</td>
                <td className="px-4 py-2 text-right">10,500</td>
                <td className="px-4 py-2 text-right">25</td>
                <td className="px-4 py-2 text-right">525</td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-50">
                <td className="px-4 py-2">Mahesh Kumara</td>
                <td className="px-4 py-2">Zone B, Zone C</td>
                <td className="px-4 py-2 text-right">18,000</td>
                <td className="px-4 py-2 text-right">42</td>
                <td className="px-4 py-2 text-right">720</td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-50">
                <td className="px-4 py-2">Prasad Perera</td>
                <td className="px-4 py-2">Zone A</td>
                <td className="px-4 py-2 text-right">10,500</td>
                <td className="px-4 py-2 text-right">25</td>
                <td className="px-4 py-2 text-right">525</td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-50">
                <td className="px-4 py-2">Prasad Perera</td>
                <td className="px-4 py-2">Zone A</td>
                <td className="px-4 py-2 text-right">10,500</td>
                <td className="px-4 py-2 text-right">25</td>
                <td className="px-4 py-2 text-right">525</td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-50">
                <td className="px-4 py-2">Prasad Perera</td>
                <td className="px-4 py-2">Zone A</td>
                <td className="px-4 py-2 text-right">10,500</td>
                <td className="px-4 py-2 text-right">25</td>
                <td className="px-4 py-2 text-right">525</td>
              </tr>
              {/* More rows as needed */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handleDownloadPDF}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Download As PDF
        </button>
        <button
          onClick={() => navigate("/responsibleOfficer/reports")}
          className="bg-yellow-400 text-yellow-900 px-6 py-2 rounded hover:bg-yellow-500"
        >
          Back To Report List
        </button>
      </div>
    </div>
  );
};

export default PerformanceSummery;
