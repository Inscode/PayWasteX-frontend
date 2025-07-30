import React, { useState } from "react";
import { Download, ArrowLeft, Filter, Calendar, MapPin, User, Building, AlertTriangle, TrendingDown, DollarSign, BarChart3, PieChart, RefreshCw, X, Search } from "lucide-react";

const outstandingData = [
  {
    id: 1,
    regNo: "STTNW001",
    name: "ABC Manufacturing Ltd",
    collector: "Prasad Perera",
    zone: "Zone A - Anuradhapura",
    category: "Large Scale",
    amount: 45000,
    daysOverdue: 45,
    lastPayment: "2025-06-15"
  },
  {
    id: 2,
    regNo: "STTNW002",
    name: "Green Valley Restaurant",
    collector: "Mahesh Kumara",
    zone: "Zone B - Kurunegala",
    category: "Small Scale",
    amount: 12500,
    daysOverdue: 30,
    lastPayment: "2025-06-30"
  },
  {
    id: 3,
    regNo: "STTNW003",
    name: "Tech Solutions Pvt Ltd",
    collector: "Samantha Silva",
    zone: "Zone C - Puttalam",
    category: "Large Scale",
    amount: 75000,
    daysOverdue: 60,
    lastPayment: "2025-05-30"
  },
  {
    id: 4,
    regNo: "STTNW004",
    name: "Local Grocery Store",
    collector: "Prasad Perera",
    zone: "Zone A - Anuradhapura",
    category: "Small Scale",
    amount: 8500,
    daysOverdue: 15,
    lastPayment: "2025-07-15"
  },
  {
    id: 5,
    regNo: "STTNW005",
    name: "Industrial Works Ltd",
    collector: "Nuwan Fernando",
    zone: "Zone D - Matale",
    category: "Large Scale",
    amount: 125000,
    daysOverdue: 90,
    lastPayment: "2025-04-30"
  },
  {
    id: 6,
    regNo: "STTNW006",
    name: "Family Bakery",
    collector: "Chamika Rathnayake",
    zone: "Zone E - Polonnaruwa",
    category: "Small Scale",
    amount: 6750,
    daysOverdue: 20,
    lastPayment: "2025-07-10"
  }
];

const collectors = ["All Collectors", "Prasad Perera", "Mahesh Kumara", "Samantha Silva", "Nuwan Fernando", "Chamika Rathnayake"];
const zones = ["All Zones", "Zone A - Anuradhapura", "Zone B - Kurunegala", "Zone C - Puttalam", "Zone D - Matale", "Zone E - Polonnaruwa"];
const categories = ["All Categories", "Small Scale", "Large Scale"];

const OutstandingBalancesReport = () => {
  const [filters, setFilters] = useState({
    dateFrom: "2025-07-01",
    dateTo: "2025-07-31",
    collector: "All Collectors",
    zone: "All Zones",
    category: "All Categories",
    search: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // table, zone, category

  // Filter data based on current filters
  const filteredData = outstandingData.filter(item => {
    const matchesCollector = filters.collector === "All Collectors" || item.collector === filters.collector;
    const matchesZone = filters.zone === "All Zones" || item.zone === filters.zone;
    const matchesCategory = filters.category === "All Categories" || item.category === filters.category;
    const matchesSearch = filters.search === "" || 
      item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.regNo.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesCollector && matchesZone && matchesCategory && matchesSearch;
  });

  // Calculate summary statistics
  const totalOutstanding = filteredData.reduce((sum, item) => sum + item.amount, 0);
  const averageOverdue = Math.round(filteredData.reduce((sum, item) => sum + item.daysOverdue, 0) / filteredData.length) || 0;
  const criticalCases = filteredData.filter(item => item.daysOverdue > 60).length;
  
  // Group by zone
  const zoneData = zones.slice(1).map(zone => {
    const zoneItems = filteredData.filter(item => item.zone === zone);
    const zoneTotal = zoneItems.reduce((sum, item) => sum + item.amount, 0);
    return {
      zone: zone.split(' - ')[1],
      amount: zoneTotal,
      count: zoneItems.length,
      items: zoneItems
    };
  }).filter(zone => zone.amount > 0);

  // Group by category
  const categoryData = categories.slice(1).map(category => {
    const categoryItems = filteredData.filter(item => item.category === category);
    const categoryTotal = categoryItems.reduce((sum, item) => sum + item.amount, 0);
    return {
      category,
      amount: categoryTotal,
      count: categoryItems.length,
      items: categoryItems
    };
  }).filter(cat => cat.amount > 0);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      dateFrom: "2025-07-01",
      dateTo: "2025-07-31",
      collector: "All Collectors",
      zone: "All Zones",
      category: "All Categories",
      search: ""
    });
  };

  const handleDownloadPDF = () => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 transform translate-x-0 transition-transform duration-300';
    notification.textContent = 'Outstanding balances report downloaded successfully!';
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 2000);
  };

  const handleBackToReports = () => {
    console.log("Navigating back to reports...");
  };

  const getOverdueStatus = (days) => {
    if (days > 60) return { color: 'bg-red-100 text-red-800 border-red-200', label: 'Critical', icon: '🚨' };
    if (days > 30) return { color: 'bg-orange-100 text-orange-800 border-orange-200', label: 'High Risk', icon: '⚠️' };
    if (days > 15) return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Moderate', icon: '⏰' };
    return { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Recent', icon: '📝' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
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
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-800 bg-clip-text text-transparent">
                  Outstanding Balances Report
                </h1>
                <p className="text-slate-600 mt-1">Overdue payments analysis by zone and category</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  showFilters 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-lg font-semibold text-slate-700">{filteredData.length} Outstanding</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-800">Filter Options</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-slate-100 rounded-md transition-colors duration-200"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Date Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                    className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                    className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              {/* Collector Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Collector</label>
                <select
                  value={filters.collector}
                  onChange={(e) => handleFilterChange('collector', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {collectors.map(collector => (
                    <option key={collector} value={collector}>{collector}</option>
                  ))}
                </select>
              </div>

              {/* Zone Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Zone</label>
                <select
                  value={filters.zone}
                  onChange={(e) => handleFilterChange('zone', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {zones.map(zone => (
                    <option key={zone} value={zone}>{zone}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Search</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by name or reg no..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Actions</label>
                <button
                  onClick={resetFilters}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors duration-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset Filters</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Outstanding</p>
                <p className="text-2xl font-bold text-red-600">LKR {totalOutstanding.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Outstanding Cases</p>
                <p className="text-2xl font-bold text-orange-600">{filteredData.length}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Days Overdue</p>
                <p className="text-2xl font-bold text-amber-600">{averageOverdue} Days</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-xl">
                <TrendingDown className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Critical Cases</p>
                <p className="text-2xl font-bold text-red-600">{criticalCases}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-1 shadow-lg">
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                viewMode === 'table' 
                  ? 'bg-red-500 text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              Detailed View
            </button>
            <button
              onClick={() => setViewMode('zone')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                viewMode === 'zone' 
                  ? 'bg-red-500 text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              By Zone
            </button>
            <button
              onClick={() => setViewMode('category')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                viewMode === 'category' 
                  ? 'bg-red-500 text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              By Category
            </button>
          </div>
        </div>

        {/* Content Based on View Mode */}
        {viewMode === 'table' && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-800">Outstanding Balance Details</h2>
              <p className="text-slate-600 mt-1">Complete list of overdue payments</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Registration</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Customer Details</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Zone</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Outstanding Amount</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Days Overdue</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.map((item, index) => {
                    const status = getOverdueStatus(item.daysOverdue);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5">
                          <div className="font-mono text-sm font-medium text-slate-900 bg-slate-100 px-3 py-1 rounded-md inline-block">
                            {item.regNo}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div>
                            <div className="font-semibold text-slate-900">{item.name}</div>
                            <div className="text-sm text-slate-600 mt-1">
                              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium mr-2">
                                {item.category}
                              </span>
                              Collector: {item.collector}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-md text-sm font-medium">
                            {item.zone.split(' - ')[1]}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="font-bold text-lg text-red-600">
                            LKR {item.amount.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <div className="font-semibold text-slate-800">{item.daysOverdue} days</div>
                          <div className="text-xs text-slate-500 mt-1">Since {item.lastPayment}</div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${status.color}`}>
                            <span className="mr-1">{status.icon}</span>
                            {status.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewMode === 'zone' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {zoneData.map((zone, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">{zone.zone}</h3>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-indigo-500" />
                      <span className="text-sm text-slate-600">{zone.count} cases</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-red-600 mt-2">LKR {zone.amount.toLocaleString()}</p>
                </div>
                <div className="p-4 max-h-60 overflow-y-auto">
                  {zone.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                      <div>
                        <div className="font-medium text-slate-800 text-sm">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.regNo}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-red-600">LKR {item.amount.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">{item.daysOverdue} days</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'category' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {categoryData.map((category, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">{category.category}</h3>
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-slate-600">{category.count} businesses</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-red-600 mt-2">LKR {category.amount.toLocaleString()}</p>
                </div>
                <div className="p-4 max-h-60 overflow-y-auto">
                  {category.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                      <div>
                        <div className="font-medium text-slate-800 text-sm">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.zone.split(' - ')[1]} • {item.collector}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-red-600">LKR {item.amount.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">{item.daysOverdue} days</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-orange-700 hover:from-red-700 hover:to-orange-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
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

export default OutstandingBalancesReport;