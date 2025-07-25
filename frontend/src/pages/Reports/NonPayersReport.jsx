import React, { useState } from "react";

const nonPayers = [
  {
    regNo: "STTNW1",
    name: "Senior Engineer (Northern) Railway Department",
    company: "Railway Tourist Bungalow",
    amount: "LKR 415.00",
    status: "Overdue",
  },
  {
    regNo: "STTNW2",
    name: "Mahesh Kumara",
    company: "Rajarata Oil",
    amount: "LKR 295.00",
    status: "Overdue",
  },
  {
    regNo: "STTNW3",
    name: "M S S M Hashan",
    company: "Kings’ Communication",
    amount: "LKR 295.00",
    status: "Overdue",
  },
  {
    regNo: "STTNW4",
    name: "A A Rasik",
    company: "Star Grocery",
    amount: "LKR 599.00",
    status: "Overdue",
  },
  {
    regNo: "STTNW5",
    name: "Sisira Nirmal",
    company: "Horana Wesana Bakery",
    amount: "LKR 250.00",
    status: "Overdue",
  },
  {
    regNo: "STTNW6",
    name: "User Six",
    company: "Test Company",
    amount: "LKR 300.00",
    status: "Overdue",
  },
  {
    regNo: "STTNW7",
    name: "User Seven",
    company: "Another Test",
    amount: "LKR 310.00",
    status: "Overdue",
  },
];

const NonPayersReport = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(nonPayers.length / itemsPerPage);
  const paginatedData = nonPayers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-white text-center">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6">
        List Of Non-Payers (Defaulters)
      </h1>

      {/* Report Meta Info */}
      <div className="text-gray-700 font-medium mb-6 flex flex-wrap justify-center gap-6">
        <p>
          <span className="font-semibold text-[#224A29]">Zone :</span>{" "}
          Anuradhapura 01
        </p>
        <p>
          <span className="font-semibold text-[#224A29]">Collector :</span>{" "}
          Mr. Prasad Perera
        </p>
        <p>
          <span className="font-semibold text-[#224A29]">Date :</span>{" "}
          01/07/2025 - 31/07/2025
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full max-w-5xl mx-auto border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-[#f2f2f2] text-[#224A29] text-sm">
            <tr>
              <th className="px-3 py-2 text-left">Reg No</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Company Name</th>
              <th className="px-3 py-2 text-right">Bill Amount</th>
              <th className="px-3 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((payer, index) => (
              <tr
                key={index}
                className="even:bg-white odd:bg-[#f9f9f9] text-sm text-gray-800"
              >
                <td className="px-3 py-2">{payer.regNo}</td>
                <td className="px-3 py-2">{payer.name}</td>
                <td className="px-3 py-2">{payer.company}</td>
                <td className="px-3 py-2 text-right">{payer.amount}</td>
                <td className="px-3 py-2 text-center">
                  <span className="inline-block bg-red-300 text-red-900 text-xs font-semibold px-4 py-[2px] rounded-full">
                    {payer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-green-700 text-white"
                : "bg-green-100 text-black hover:bg-green-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-3 mt-10 flex-wrap">
        <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded font-medium">
          Re-Generate Report
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium">
          Download As PDF
        </button>
        <button className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 px-6 py-2 rounded font-medium">
          Back To Report List
        </button>
      </div>
    </div>
  );
};

export default NonPayersReport;
