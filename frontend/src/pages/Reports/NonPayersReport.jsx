import React, { useState } from "react";
import { Download, ArrowLeft, AlertTriangle, Calendar, MapPin, User, FileText } from "lucide-react";

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
    company: "Kings' Communication",
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

  const totalAmount = nonPayers.reduce((sum, payer) => {
    const amount = parseFloat(payer.amount.replace('LKR ', '').replace(',', ''));
    return sum + amount;
  }, 0);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleDownloadReport = async () => {
    try {
      const response = await fetch(
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      );

      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "non-payers-report.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Success notification (in a real app, you'd use a toast library)
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 transform translate-x-0 transition-transform duration-300';
      notification.textContent = 'Report downloaded successfully!';
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => document.body.removeChild(notification), 300);
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Failed to download the report.");
    }
  };

  const handleBackToReports = () => {
    // In a real app with routing: navigate("/responsibleOfficer/reports")
    console.log("Navigating back to reports...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToReports}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200 group"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:text-slate-800" />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                  Non-Payers Report
                </h1>
                <p className="text-slate-600 mt-1">Defaulters Overview & Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span className="text-lg font-semibold text-slate-700">{nonPayers.length} Defaulters</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Outstanding</p>
                <p className="text-2xl font-bold text-red-600">LKR {totalAmount.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Zone</p>
                <p className="text-xl font-semibold text-slate-800">Anuradhapura 01</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Collector</p>
                <p className="text-xl font-semibold text-slate-800">Mr. Prasad Perera</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <User className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Period</p>
                <p className="text-xl font-semibold text-slate-800">July 2025</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Modern Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">Defaulter Details</h2>
            <p className="text-slate-600 mt-1">Complete list of non-paying customers</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Registration</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Customer Details</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Amount Due</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedData.map((payer, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors duration-150">
                    <td className="px-6 py-5">
                      <div className="font-mono text-sm font-medium text-slate-900 bg-slate-100 px-3 py-1 rounded-md inline-block">
                        {payer.regNo}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div>
                        <div className="font-semibold text-slate-900">{payer.name}</div>
                        <div className="text-sm text-slate-600 mt-1">{payer.company}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="font-bold text-lg text-red-600">{payer.amount}</div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                        {payer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modern Pagination */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, nonPayers.length)} of {nonPayers.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex space-x-1">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleDownloadReport}
            className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Download className="w-5 h-5" />
            <span>Download PDF Report</span>
          </button>
          
          <button 
            onClick={handleBackToReports}
            className="flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 hover:border-slate-300 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NonPayersReport;