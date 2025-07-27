import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const payers = [
  {
    regNo: "ST1NWT1",
    name: "Senior Engineer (Northern) Railway Department",
    company: "Railway Tourist Bungalow",
    amount: 413,
    category: "Small Scale",
  },
  {
    regNo: "ST1NWT2",
    name: "Mahesh Kumara",
    company: "Rajarata Oil",
    amount: 295,
    category: "Small Scale",
  },
  {
    regNo: "ST1NWT3",
    name: "M S S M Hashan",
    company: "Kings’ Communication",
    amount: 295,
    category: "Large Scale",
  },
  {
    regNo: "ST1NWT4",
    name: "A A Rasik",
    company: "Star Grocery",
    amount: 590,
    category: "Small Scale",
  },
  {
    regNo: "ST1NWT5",
    name: "Sisira Nirmal",
    company: "Horana Wasana Bakery",
    amount: 250,
    category: "Large Scale",
  },
  {
    regNo: "ST1NWT6",
    name: "User Six",
    company: "Example Co.",
    amount: 300,
    category: "Small Scale",
  },
];

const PayersReport = () => {
  const navigate = useNavigate();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(payers.length / itemsPerPage);
  const paginatedData = payers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleDownloadReport = async () => {
    try {
      // For now using a dummy PDF link for demo
      const response = await fetch(
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      );

      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "payers-report.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      alert("Report downloaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to download the report.");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-white text-center">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6">
        List Of Payers
      </h1>

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
        <table className="w-full max-w-5xl mx-auto border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-[#f2f2f2] text-[#224A29] text-sm">
            <tr>
              <th className="px-3 py-2 text-left">Reg No</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Company Name</th>
              <th className="px-3 py-2 text-right">Bill Paid (LKR)</th>
              <th className="px-3 py-2 text-left">Category</th>
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
                <td className="px-3 py-2">{payer.category}</td>
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
        {/* <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded font-medium">
          Re-Generate Report
        </button> */}
        <button
          onClick={handleDownloadReport}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium"
        >
          Download As PDF
        </button>

        <button
          onClick={() => navigate("/responsibleOfficer/reports")}
          className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 px-6 py-2 rounded font-medium"
        >
          Back To Report List
        </button>
      </div>
    </div>
  );
};

export default PayersReport;
