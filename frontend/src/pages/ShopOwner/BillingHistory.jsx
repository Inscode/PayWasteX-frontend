import React, { useState } from 'react';
import { Download, Filter, Search, Calendar, CheckCircle, AlertCircle, CreditCard, FileText, Eye, TrendingUp } from 'lucide-react';

const billingData = [
  { id: 'INV1001', period: 'Mar 2025', due: 'LKR 1000.00', paid: 'Mar 15 2025', status: 'Unpaid' },
  { id: 'INV1002', period: 'Mar 2025', due: 'LKR 1000.00', paid: 'Mar 15 2025', status: 'Paid' },
  { id: 'INV1003', period: 'Feb 2025', due: 'LKR 1000.00', paid: 'Feb 15 2025', status: 'Paid' },
  { id: 'INV1004', period: 'Jan 2025', due: 'LKR 1000.00', paid: 'Jan 15 2025', status: 'Unpaid' },
  { id: 'INV1005', period: 'Feb 2025', due: 'LKR 1000.00', paid: 'Feb 15 2025', status: 'Paid' },
];

const labels = {
  en: {
    billingHistory: 'Billing History',
    billingPeriod: 'Billing Period',
    status: 'Status',
    billId: 'Bill ID',
    amountDue: 'Amount Due',
    amountPaid: 'Amount Paid',
    paid: 'Paid',
    unpaid: 'Unpaid',
    download: 'Download',
    noResults: 'No results found.',
    searchPlaceholder: 'Search invoices...',
    totalBills: 'Total Bills',
    paidBills: 'Paid Bills',
    unpaidBills: 'Unpaid Bills',
    totalAmount: 'Total Amount',
    filters: 'Filters',
    allPeriods: 'All Periods',
    allStatus: 'All Status',
    viewDetails: 'View Details'
  },
  si: {
    billingHistory: 'බිල්පත් ඉතිහාසය',
    billingPeriod: 'බිල්පත් කාලය',
    status: 'තත්ත්වය',
    billId: 'බිල් අංකය',
    amountDue: 'ගෙවිය යුතු මුදල',
    amountPaid: 'ගෙවූ මුදල',
    paid: 'ගෙවී ඇත',
    unpaid: 'නොගෙවී ඇත',
    download: 'බාගන්න',
    noResults: 'ප්‍රතිඵල නොමැත.',
    searchPlaceholder: 'ප්‍රතිඵල සොයන්න...',
    totalBills: 'මුළු බිල්පත්',
    paidBills: 'ගෙවූ බිල්පත්',
    unpaidBills: 'නොගෙවූ බිල්පත්',
    totalAmount: 'මුළු මුදල',
    filters: 'පෙරහන්',
    allPeriods: 'සියලුම කාල',
    allStatus: 'සියලුම තත්ත්වය',
    viewDetails: 'විස්තර බලන්න'
  },
  ta: {
    billingHistory: 'பில் வரலாறு',
    billingPeriod: 'பில் காலம்',
    status: 'நிலைமை',
    billId: 'பில் ஐடி',
    amountDue: 'கடன் தொகை',
    amountPaid: 'செலுத்திய தொகை',
    paid: 'செலுத்தப்பட்டது',
    unpaid: 'செலுத்தப்படவில்லை',
    download: 'பதிவிறக்கவும்',
    noResults: 'முடிவுகள் எதுவும் இல்லை.',
    searchPlaceholder: 'விலைப்பட்டியல் தேடு...',
    totalBills: 'மொத்த பில்கள்',
    paidBills: 'செலுத்திய பில்கள்',
    unpaidBills: 'செலுத்தாத பில்கள்',
    totalAmount: 'மொத்த தொகை',
    filters: 'வடிகட்டிகள்',
    allPeriods: 'எல்லா காலங்கள்',
    allStatus: 'எல்லா நிலை',
    viewDetails: 'விவரங்களைப் பார்க்கவும்'
  },
};

const BillingHistory = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [lang] = useState('en'); // Default to English
  const t = labels[lang] || labels.en;

  const billingPeriods = ['All', ...new Set(billingData.map((item) => item.period))];
  const statuses = ['All', 'Paid', 'Unpaid'];

  const filteredData = billingData.filter((bill) => {
    const matchPeriod = selectedPeriod === 'All' || bill.period === selectedPeriod;
    const matchStatus = selectedStatus === 'All' || bill.status === selectedStatus;
    const matchSearch = bill.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       bill.period.toLowerCase().includes(searchTerm.toLowerCase());
    return matchPeriod && matchStatus && matchSearch;
  });

  const totalBills = billingData.length;
  const paidBills = billingData.filter(bill => bill.status === 'Paid').length;
  const unpaidBills = billingData.filter(bill => bill.status === 'Unpaid').length;
  const totalAmount = billingData.reduce((sum, bill) => sum + parseFloat(bill.due.replace('LKR ', '').replace(',', '')), 0);

  const handleDownload = (bill) => {
    console.log('Downloading bill:', bill);
  };

  const handleViewDetails = (bill) => {
    console.log('Viewing details for:', bill);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                <FileText className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {t.billingHistory}
                </h1>
                <p className="text-gray-600 mt-1">Manage and track your billing information</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-gray-600 text-sm font-medium">{t.totalBills}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalBills}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl">
                <CreditCard className="text-white text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-gray-600 text-sm font-medium">{t.paidBills}</p>
                <p className="text-3xl font-bold text-emerald-600 mt-1">{paidBills}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl">
                <CheckCircle className="text-white text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-gray-600 text-sm font-medium">{t.unpaidBills}</p>
                <p className="text-3xl font-bold text-red-500 mt-1">{unpaidBills}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl">
                <AlertCircle className="text-white text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-gray-600 text-sm font-medium">{t.totalAmount}</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">LKR {totalAmount.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl">
                <TrendingUp className="text-white text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-xl border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300"
              />
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-medium hover:shadow-lg transition-all duration-300"
            >
              <Filter />
              {t.filters}
            </button>

            <div className="hidden lg:flex gap-4">
              <div className="relative">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="appearance-none bg-white/50 backdrop-blur-xl border border-white/30 rounded-2xl px-6 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300 cursor-pointer"
                >
                  {billingPeriods.map((period) => (
                    <option key={period} value={period}>
                      {period === 'All' ? t.allPeriods : period}
                    </option>
                  ))}
                </select>
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none bg-white/50 backdrop-blur-xl border border-white/30 rounded-2xl px-6 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300 cursor-pointer"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === 'All' ? t.allStatus : t[status.toLowerCase()]}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {isFilterOpen && (
            <div className="lg:hidden mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full appearance-none bg-white/50 backdrop-blur-xl border border-white/30 rounded-2xl px-6 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300"
                >
                  {billingPeriods.map((period) => (
                    <option key={period} value={period}>
                      {period === 'All' ? t.allPeriods : period}
                    </option>
                  ))}
                </select>
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full appearance-none bg-white/50 backdrop-blur-xl border border-white/30 rounded-2xl px-6 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === 'All' ? t.allStatus : t[status.toLowerCase()]}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 border-b border-gray-200/50">
                  <th className="text-left py-6 px-8 font-semibold text-gray-700">{t.billId}</th>
                  <th className="text-left py-6 px-8 font-semibold text-gray-700">{t.billingPeriod}</th>
                  <th className="text-left py-6 px-8 font-semibold text-gray-700">{t.amountDue}</th>
                  <th className="text-left py-6 px-8 font-semibold text-gray-700">{t.amountPaid}</th>
                  <th className="text-left py-6 px-8 font-semibold text-gray-700">{t.status}</th>
                  <th className="text-center py-6 px-8 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((bill, idx) => (
                  <tr key={idx} className="border-b border-gray-100/50 hover:bg-white/50 transition-colors duration-200">
                    <td className="py-6 px-8">
                      <span className="font-mono text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
                        {bill.id}
                      </span>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-gray-400 text-sm" />
                        <span className="text-gray-700 font-medium">{bill.period}</span>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <span className="font-bold text-gray-900">{bill.due}</span>
                    </td>
                    <td className="py-6 px-8">
                      <span className="text-gray-700">{bill.paid}</span>
                    </td>
                    <td className="py-6 px-8">
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${
                          bill.status === 'Paid'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        {bill.status === 'Paid' ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <AlertCircle className="w-4 h-4" />
                        )}
                        {bill.status === 'Paid' ? t.paid : t.unpaid}
                      </span>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleViewDetails(bill)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                          <Eye className="w-4 h-4" />
                          {t.viewDetails}
                        </button>
                        <button
                          onClick={() => handleDownload(bill)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                          <Download className="w-4 h-4" />
                          {t.download}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredData.length === 0 && (
            <div className="py-16 text-center">
              <div className="text-gray-400 text-6xl mb-4">📄</div>
              <p className="text-gray-500 text-lg font-medium">{t.noResults}</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filteredData.map((bill, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full -translate-y-12 translate-x-12"></div>
              
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div>
                  <h3 className="font-mono text-lg font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg inline-block">
                    {bill.id}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="text-gray-400 text-sm" />
                    <span className="text-gray-600 font-medium">{bill.period}</span>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${
                    bill.status === 'Paid'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}
                >
                  {bill.status === 'Paid' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  {bill.status === 'Paid' ? t.paid : t.unpaid}
                </span>
              </div>

              <div className="space-y-3 mb-6 relative z-10">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">{t.amountDue}:</span>
                  <span className="font-bold text-gray-900">{bill.due}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 font-medium">{t.amountPaid}:</span>
                  <span className="text-gray-700">{bill.paid}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 relative z-10">
                <button
                  onClick={() => handleViewDetails(bill)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  <Eye className="w-4 h-4" />
                  {t.viewDetails}
                </button>
                <button
                  onClick={() => handleDownload(bill)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  {t.download}
                </button>
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <div className="py-16 text-center">
              <div className="text-gray-400 text-6xl mb-4">📄</div>
              <p className="text-gray-500 text-lg font-medium">{t.noResults}</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingHistory;