import React, { useState } from "react";
import { Download, ArrowLeft, CheckCircle, Calendar, MapPin, User, TrendingUp, Building, CreditCard } from "lucide-react";

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
    company: "Kings' Communication",
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
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(payers.length / itemsPerPage);
  const paginatedData = payers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalRevenue = payers.reduce((sum, payer) => sum + payer.amount, 0);
  const smallScaleCount = payers.filter(p => p.category === "Small Scale").length;
  const largeScaleCount = payers.filter(p => p.category === "Large Scale").length;
  const averagePayment = Math.round(totalRevenue / payers.length);

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
      link.download = "payers-report.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Success notification
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

  const getCategoryBadge = (category) => {
    const isLarge = category === "Large Scale";
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        isLarge 
          ? "bg-purple-100 text-purple-800 border border-purple-200" 
          : "bg-blue-100 text-blue-800 border border-blue-200"
      }`}>
        <Building className={`w-3 h-3 mr-1 ${isLarge ? "text-purple-600" : "text-blue-600"}`} />
        {category}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
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
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-800 bg-clip-text text-transparent">
                  Payers Report
                </h1>
                <p className="text-slate-600 mt-1">Successful Payment Overview & Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="text-lg font-semibold text-slate-700">{payers.length} Active Payers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                <p className="text-2xl font-bold text-emerald-600">LKR {totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Average Payment</p>
                <p className="text-2xl font-bold text-blue-600">LKR {averagePayment}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Small Scale</p>
                <p className="text-2xl font-bold text-indigo-600">{smallScaleCount} Businesses</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-xl">
                <Building className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Large Scale</p>
                <p className="text-2xl font-bold text-purple-600">{largeScaleCount} Enterprises</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Report Meta Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-teal-100 rounded-xl">
                <MapPin className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Zone</p>
                <p className="text-xl font-semibold text-slate-800">Anuradhapura 01</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Collector</p>
                <p className="text-xl font-semibold text-slate-800">Mr. Prasad Perera</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Period</p>
                <p className="text-xl font-semibold text-slate-800">July 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">Payment Details</h2>
            <p className="text-slate-600 mt-1">Complete list of successful payments</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Registration</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Customer Details</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Amount Paid</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Category</th>
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
                      <div className="font-bold text-lg text-emerald-600">
                        LKR {payer.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      {getCategoryBadge(payer.category)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modern Pagination */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, payers.length)} of {payers.length} results
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
                        ? "bg-emerald-600 text-white shadow-md"
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
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
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

export default PayersReport;