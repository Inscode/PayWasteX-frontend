import React, { useState } from "react";
import { 
  HiDownload, 
  HiArrowLeft, 
  HiCalendar, 
  HiUser, 
  HiLocationMarker,
  HiCurrencyDollar,
  HiDocumentReport,
  HiTrendingUp,
  HiUsers,
  HiChartBar
} from "react-icons/hi";

const CollectionSummary = () => {
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    // Simulate download
    setTimeout(() => {
      setLoading(false);
      alert("PDF downloaded successfully!");
    }, 2000);
  };

  const handleBackToReports = () => {
    // Navigate back to reports
    window.history.back();
  };

  // Mock data - replace with actual data
  const reportData = [
    { date: "01/08/2025", totalCollected: 3250, paymentsCount: 8, topCollector: "Prasad Perera" },
    { date: "02/08/2025", totalCollected: 4100, paymentsCount: 10, topCollector: "Mahesh Kumara" },
    { date: "03/08/2025", totalCollected: 2950, paymentsCount: 7, topCollector: "A A Rasik" },
    { date: "04/08/2025", totalCollected: 5200, paymentsCount: 12, topCollector: "Prasad Perera" },
    { date: "05/08/2025", totalCollected: 3800, paymentsCount: 9, topCollector: "Mahesh Kumara" },
  ];

  const totalAmount = reportData.reduce((sum, item) => sum + item.totalCollected, 0);
  const totalPayments = reportData.reduce((sum, item) => sum + item.paymentsCount, 0);
  const avgDaily = totalAmount / reportData.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToReports}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
              >
                <HiArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <HiChartBar className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Collections Summary</h1>
                  <p className="text-sm text-gray-600">Detailed collection report analysis</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Report Generated</p>
                <p className="text-sm font-medium text-gray-800">Just now</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Report Meta Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <HiLocationMarker className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Zone</p>
                <p className="text-lg font-semibold text-gray-800">Anuradhapura 01</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <HiUser className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Collector</p>
                <p className="text-lg font-semibold text-gray-800">Mr. Prasad Perera</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <HiCalendar className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Period</p>
                <p className="text-lg font-semibold text-gray-800">01/08/2025 - 05/08/2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Total Collected</p>
                <p className="text-2xl font-bold">LKR {totalAmount.toLocaleString()}</p>
              </div>
              <HiCurrencyDollar className="text-3xl text-emerald-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Payments</p>
                <p className="text-2xl font-bold">{totalPayments}</p>
              </div>
              <HiDocumentReport className="text-3xl text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Daily Average</p>
                <p className="text-2xl font-bold">LKR {Math.round(avgDaily).toLocaleString()}</p>
              </div>
              <HiTrendingUp className="text-3xl text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium">Active Days</p>
                <p className="text-2xl font-bold">{reportData.length}</p>
              </div>
              <HiUsers className="text-3xl text-amber-200" />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Daily Collection Details</h2>
            <p className="text-sm text-gray-600">Breakdown of collections by date</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    <div className="flex items-center space-x-2">
                      <HiCalendar className="w-4 h-4" />
                      <span>Date</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    <div className="flex items-center justify-end space-x-2">
                      <HiCurrencyDollar className="w-4 h-4" />
                      <span>Amount (LKR)</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    <div className="flex items-center justify-end space-x-2">
                      <HiDocumentReport className="w-4 h-4" />
                      <span>Payments</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    <div className="flex items-center space-x-2">
                      <HiUser className="w-4 h-4" />
                      <span>Top Collector</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reportData.map((row, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                      {row.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      <span className="font-semibold text-emerald-600">
                        {row.totalCollected.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {row.paymentsCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {row.topCollector.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium">{row.topCollector}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Totals */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-gray-700">Total Summary</span>
              <div className="flex space-x-8">
                <span className="text-emerald-600">
                  LKR {totalAmount.toLocaleString()}
                </span>
                <span className="text-blue-600">
                  {totalPayments} payments
                </span>
                <span className="text-gray-600">
                  {reportData.length} days
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleDownloadPDF}
            disabled={loading}
            className="flex items-center justify-center space-x-2 px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <HiDownload className="w-5 h-5" />
                <span>Download as PDF</span>
              </>
            )}
          </button>

          <button
            onClick={handleBackToReports}
            className="flex items-center justify-center space-x-2 px-8 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900 rounded-lg hover:from-amber-500 hover:to-yellow-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
          >
            <HiArrowLeft className="w-5 h-5" />
            <span>Back to Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionSummary;