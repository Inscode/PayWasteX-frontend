import React from "react";

const CollectionSummery = () => {
  return (
    <div className="min-h-screen px-4 py-8 bg-white">
      <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">
        Collections Summary
      </h1>

      {/* Filters */}
      {/* <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <select className="border px-3 py-2 rounded">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
        <input type="date" className="border px-3 py-2 rounded" /> */}
      {/* <input type="date" className="border px-3 py-2 rounded" /> */}
      {/* <select className="border px-3 py-2 rounded">
          <option value="">Select Collector</option>
          <option>Mahesh Kumara</option>
          <option>Prasad Perera</option>
        </select>
        <select className="border px-3 py-2 rounded">
          <option value="">Select Zone</option>
          <option>Zone A</option>
          <option>Zone B</option>
        </select>
      </div> */}

      {/* Report Meta Info */}
      <div className="text-gray-700 font-medium mb-6 flex flex-wrap justify-center gap-6">
        <p>
          <span className="font-semibold text-[#224A29]">Zone :</span>{" "}
          Anuradhapura 01
        </p>
        <p>
          <span className="font-semibold text-[#224A29]">Collector :</span> Mr.
          Prasad Perera
        </p>
        <p>
          <span className="font-semibold text-[#224A29]">Date :</span>{" "}
          01/07/2025 - 31/07/2025
        </p>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-green-800">
            <tr>
              <th className="px-3 py-2 text-left">Period</th>
              <th className="px-3 py-2 text-right">Total Collected (LKR)</th>
              <th className="px-3 py-2 text-right">No of Payments</th>
              <th className="px-3 py-2 text-left">Top Collector</th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-white odd:bg-gray-50">
              <td className="px-3 py-2">01/07/2025</td>
              <td className="px-3 py-2 text-right">3,250</td>
              <td className="px-3 py-2 text-right">8</td>
              <td className="px-3 py-2">Prasad Perera</td>
            </tr>
            <tr className="even:bg-white odd:bg-gray-50">
              <td className="px-3 py-2">02/07/2025</td>
              <td className="px-3 py-2 text-right">4,100</td>
              <td className="px-3 py-2 text-right">10</td>
              <td className="px-3 py-2">Mahesh Kumara</td>
            </tr>
            <tr className="even:bg-white odd:bg-gray-50">
              <td className="px-3 py-2">01/07/2025</td>
              <td className="px-3 py-2 text-right">3,250</td>
              <td className="px-3 py-2 text-right">8</td>
              <td className="px-3 py-2">Prasad Perera</td>
            </tr>
            <tr className="even:bg-white odd:bg-gray-50">
              <td className="px-3 py-2">01/07/2025</td>
              <td className="px-3 py-2 text-right">3,250</td>
              <td className="px-3 py-2 text-right">8</td>
              <td className="px-3 py-2">Prasad Perera</td>
            </tr>
            {/* Repeat rows dynamically */}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4 mt-8">
        {/* <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">
          Generate Report
        </button> */}
        <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
          Download As PDF
        </button>
        <button className="bg-yellow-400 text-yellow-900 px-6 py-2 rounded hover:bg-yellow-500">
          Back To Report List
        </button>
      </div>
    </div>
  );
};

export default CollectionSummery;
