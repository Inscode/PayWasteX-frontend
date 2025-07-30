import React, { useRef, useState } from "react";
import { Download, ArrowLeft, Trophy, TrendingUp, Users, DollarSign, Target, Award, BarChart3, Calendar } from "lucide-react";

const performanceData = [
  {
    id: 1,
    name: "Prasad Perera",
    zones: ["Zone A"],
    totalCollected: 10500,
    payments: 25,
    avgPerDay: 525,
    performance: 85,
    rank: 3
  },
  {
    id: 2,
    name: "Mahesh Kumara",
    zones: ["Zone B", "Zone C"],
    totalCollected: 18000,
    payments: 42,
    avgPerDay: 720,
    performance: 95,
    rank: 1
  },
  {
    id: 3,
    name: "Samantha Silva",
    zones: ["Zone D"],
    totalCollected: 15200,
    payments: 38,
    avgPerDay: 608,
    performance: 90,
    rank: 2
  },
  {
    id: 4,
    name: "Nuwan Fernando",
    zones: ["Zone E", "Zone F"],
    totalCollected: 9800,
    payments: 22,
    avgPerDay: 392,
    performance: 75,
    rank: 4
  },
  {
    id: 5,
    name: "Chamika Rathnayake",
    zones: ["Zone G"],
    totalCollected: 8500,
    payments: 20,
    avgPerDay: 340,
    performance: 70,
    rank: 5
  }
];

const PerformanceSummary = () => {
  const reportRef = useRef(null);
  const [sortBy, setSortBy] = useState('rank');
  const [sortOrder, setSortOrder] = useState('asc');

  const totalRevenue = performanceData.reduce((sum, collector) => sum + collector.totalCollected, 0);
  const totalPayments = performanceData.reduce((sum, collector) => sum + collector.payments, 0);
  const avgPerformance = Math.round(performanceData.reduce((sum, collector) => sum + collector.performance, 0) / performanceData.length);
  const topPerformer = performanceData.find(collector => collector.rank === 1);

  const handleDownloadPDF = () => {
    // Simulated PDF download
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 transform translate-x-0 transition-transform duration-300';
    notification.textContent = 'Performance summary downloaded successfully!';
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 2000);
  };

  const handleBackToReports = () => {
    console.log("Navigating back to reports...");
  };

  const sortedData = [...performanceData].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  const getPerformanceBadge = (performance) => {
    if (performance >= 90) return { color: 'bg-green-100 text-green-800 border-green-200', label: 'Excellent' };
    if (performance >= 80) return { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Good' };
    if (performance >= 70) return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Average' };
    return { color: 'bg-red-100 text-red-800 border-red-200', label: 'Needs Improvement' };
  };

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Award className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <Target className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
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
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-800 bg-clip-text text-transparent">
                  Performance Summary
                </h1>
                <p className="text-slate-600 mt-1">Collector-wise Performance Analytics & Rankings</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              <span className="text-lg font-semibold text-slate-700">{performanceData.length} Collectors</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                <p className="text-2xl font-bold text-indigo-600">LKR {totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Payments</p>
                <p className="text-2xl font-bold text-purple-600">{totalPayments}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Performance</p>
                <p className="text-2xl font-bold text-emerald-600">{avgPerformance}%</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Target className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Top Performer</p>
                <p className="text-xl font-bold text-amber-600">{topPerformer?.name}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-xl">
                <Trophy className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Report Period Info */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-slate-100 rounded-xl">
                <Calendar className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Report Period</h3>
                <p className="text-slate-600">July 1, 2025 - July 31, 2025</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600">Generated on</p>
              <p className="font-semibold text-slate-800">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Performance Table */}
        <div ref={reportRef} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">Collector Performance Rankings</h2>
                <p className="text-slate-600 mt-1">Detailed performance metrics and zone assignments</p>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-slate-500" />
                <span className="text-sm text-slate-600">Active Collectors</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Collector Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Zone(s)</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Total Collected</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Payments</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Daily Average</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedData.map((collector, index) => {
                  const badge = getPerformanceBadge(collector.performance);
                  return (
                    <tr key={collector.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-2">
                          {getRankIcon(collector.rank)}
                          <span className="font-bold text-lg text-slate-700">#{collector.rank}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-semibold text-slate-900">{collector.name}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-1">
                          {collector.zones.map((zone, idx) => (
                            <span key={idx} className="inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-xs font-medium">
                              {zone}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="font-bold text-lg text-emerald-600">
                          LKR {collector.totalCollected.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="font-semibold text-slate-800">{collector.payments}</div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="font-semibold text-slate-800">LKR {collector.avgPerDay}</div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-full bg-slate-200 rounded-full h-2 max-w-20">
                            <div 
                              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${collector.performance}%` }}
                            ></div>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badge.color}`}>
                            {collector.performance}% • {badge.label}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
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

export default PerformanceSummary;