import React, { useState } from "react";
import { HiCreditCard, HiCheckCircle, HiClock, HiUser, HiOfficeBuilding, HiCalendar, HiCurrencyDollar, HiDocumentText, HiSearch, HiFilter } from "react-icons/hi";

const useLanguage = () => ({ lang: 'en' }); // Mock hook for demo

const labels = {
  en: {
    title: "Payment Confirmation",
    zone: "Area/ Zone",
    collector: "Select Collector",
    amount: "Amount Paid",
    receipt: "Receipt Number",
    confirm: "Confirm Payment",
    history: "Payment Confirmation History",
    company: "Company Name",
    owner: "Company Owner Name",
    paid: "Amount",
    date: "Payment Date",
    totalConfirmed: "Total Confirmed",
    todayPayments: "Today's Payments",
    pendingConfirm: "Pending Confirmation",
    searchPlaceholder: "Search by company or owner name...",
    filterByDate: "Filter by Date",
    allDates: "All Dates",
    thisWeek: "This Week",
    thisMonth: "This Month",
    processing: "Processing...",
    success: "Payment confirmed successfully!",
  },
  si: {
    title: "ගෙවීම් තහවුරු කිරීම",
    zone: "ප්‍රදේශය / කලාපය",
    collector: "ගෙවීමේ එකතුකරු තෝරන්න",
    amount: "ගෙවූ මුදල",
    receipt: "රසීද අංකය",
    confirm: "ගෙවීම තහවුරු කරන්න",
    history: "ගෙවීම් තහවුරු කිරීමේ ඉතිහාසය",
    company: "සමාගමේ නම",
    owner: "අයිතිකරුගේ නම",
    paid: "ගෙවූ මුදල",
    date: "ගෙවූ දිනය",
  },
  ta: {
    title: "கட்டணம் உறுதிப்படுத்தல்",
    zone: "மண்டலம்/ பகுதி",
    collector: "இணைப்பு வசூலிப்பவரை தேர்ந்தெடுக்கவும்",
    amount: "கட்டண தொகை",
    receipt: "ரசீது எண்",
    confirm: "கட்டணத்தை உறுதிப்படுத்தவும்",
    history: "கட்டணம் உறுதிப்படுத்தல் வரலாறு",
    company: "நிறுவனத்தின் பெயர்",
    owner: "அமைப்பாளர் பெயர்",
    paid: "கட்டணம் செலுத்தப்பட்டது",
    date: "கட்டணம் தேதி",
  },
};

const dummyData = [
  { id: 1, company: "Railway Tourist Bungalow", owner: "M S D Priyantha", amount: "413.00", date: "12 Apr 2025", status: "confirmed", zone: "A1" },
  { id: 2, company: "Sunset Hotel", owner: "Nirosha Perera", amount: "500.00", date: "10 Apr 2025", status: "confirmed", zone: "A2" },
  { id: 3, company: "Ocean View Café", owner: "Tharindu Silva", amount: "350.00", date: "11 Apr 2025", status: "confirmed", zone: "B1" },
  { id: 4, company: "Green Leaf Spa", owner: "Harsha Bandara", amount: "600.00", date: "13 Apr 2025", status: "pending", zone: "A1" },
  { id: 5, company: "Central Bookstore", owner: "Sajith Karunaratne", amount: "290.00", date: "09 Apr 2025", status: "confirmed", zone: "C1" },
  { id: 6, company: "Golden Bakery", owner: "Menaka Gunasekara", amount: "275.00", date: "08 Apr 2025", status: "confirmed", zone: "B2" },
  { id: 7, company: "Lanka Motors", owner: "Dulaj Fernando", amount: "750.00", date: "07 Apr 2025", status: "confirmed", zone: "A3" },
  { id: 8, company: "Colombo Print House", owner: "Sachini Madushani", amount: "430.00", date: "06 Apr 2025", status: "pending", zone: "B1" },
  { id: 9, company: "Lotus Pharmacy", owner: "Sanduni Wickrama", amount: "315.00", date: "05 Apr 2025", status: "confirmed", zone: "C2" },
  { id: 10, company: "Fashion World", owner: "Dinesh Priyankara", amount: "800.00", date: "04 Apr 2025", status: "confirmed", zone: "A2" },
  { id: 11, company: "Rainbow Florist", owner: "Thisaru Weerasinghe", amount: "220.00", date: "03 Apr 2025", status: "confirmed", zone: "B3" },
  { id: 12, company: "City Tech Solutions", owner: "Gayan Dissanayake", amount: "1000.00", date: "02 Apr 2025", status: "pending", zone: "A1" },
  { id: 13, company: "Victory Electronics", owner: "Shanaka Dilshan", amount: "720.00", date: "01 Apr 2025", status: "confirmed", zone: "C1" },
];

const zones = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
const collectors = ["Mr. Prasad Perera", "Mrs. Silva Fernando", "Ms. Jayawardena", "Mr. Bandara"];

const PaymentConfirmation = () => {
  const { lang } = useLanguage();
  const t = labels[lang] || labels.en;
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    zone: "",
    collector: "",
    amount: "",
    receipt: ""
  });

  const perPage = 5;

  // Filter data based on search and date
  let filteredData = dummyData;
  
  if (searchTerm) {
    filteredData = filteredData.filter(item =>
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const paginatedData = filteredData.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const totalPages = Math.ceil(filteredData.length / perPage);

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setFormData({ zone: "", collector: "", amount: "", receipt: "" });
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate statistics
  const totalConfirmed = dummyData.filter(item => item.status === 'confirmed').length;
  const todayPayments = dummyData.filter(item => item.date === "13 Apr 2025").length;
  const pendingConfirm = dummyData.filter(item => item.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <HiCreditCard className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
                <p className="text-gray-600">Verify and confirm payment transactions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="text-sm font-medium text-gray-800">Just now</p>
              </div>
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title={t.totalConfirmed || "Total Confirmed"}
            value={totalConfirmed}
            icon={<HiCheckCircle />}
            color="emerald"
            subtitle="All time confirmations"
          />
          <StatCard
            title={t.todayPayments || "Today's Payments"}
            value={todayPayments}
            icon={<HiClock />}
            color="blue"
            subtitle="Payments received today"
          />
          <StatCard
            title={t.pendingConfirm || "Pending Confirmation"}
            value={pendingConfirm}
            icon={<HiDocumentText />}
            color="amber"
            subtitle="Awaiting confirmation"
          />
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-center space-x-4 animate-fade-in">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <HiCheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-800">{t.success || "Success!"}</h3>
              <p className="text-emerald-600 text-sm">Payment has been confirmed and recorded.</p>
            </div>
          </div>
        )}

        {/* Payment Confirmation Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
            <h2 className="text-xl font-bold text-white mb-2">Direct Customer Payment</h2>
            <p className="text-emerald-100">Enter payment details to confirm transaction</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <HiOfficeBuilding className="w-4 h-4" />
                  <span>{t.zone}</span>
                </label>
                <select 
                  value={formData.zone}
                  onChange={(e) => handleInputChange('zone', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200"
                >
                  <option value="">Select zone...</option>
                  {zones.map(zone => (
                    <option key={zone} value={zone}>Zone {zone}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <HiUser className="w-4 h-4" />
                  <span>{t.collector}</span>
                </label>
                <select 
                  value={formData.collector}
                  onChange={(e) => handleInputChange('collector', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200"
                >
                  <option value="">Select collector...</option>
                  {collectors.map(collector => (
                    <option key={collector} value={collector}>{collector}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <HiCurrencyDollar className="w-4 h-4" />
                  <span>{t.amount}</span>
                </label>
                <input 
                  type="text" 
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  placeholder="Enter amount (LKR)"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <HiDocumentText className="w-4 h-4" />
                  <span>{t.receipt}</span>
                </label>
                <input 
                  type="text" 
                  value={formData.receipt}
                  onChange={(e) => handleInputChange('receipt', e.target.value)}
                  placeholder="Receipt number"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="mt-6">
              <button 
                onClick={handleConfirmPayment}
                disabled={isProcessing || !formData.zone || !formData.collector || !formData.amount || !formData.receipt}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t.processing || "Processing..."}</span>
                  </>
                ) : (
                  <>
                    <HiCheckCircle className="w-5 h-5" />
                    <span>{t.confirm}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{t.history}</h2>
                <p className="text-gray-600">Track all confirmed payments</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative">
                  <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder || "Search..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Date Filter */}
                <div className="relative">
                  <HiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
                  >
                    <option value="all">{t.allDates || "All Dates"}</option>
                    <option value="week">{t.thisWeek || "This Week"}</option>
                    <option value="month">{t.thisMonth || "This Month"}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.company}</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.owner}</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.paid}</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.date}</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <HiOfficeBuilding className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">{item.company}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{item.owner}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">LKR {item.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{item.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden p-6 space-y-4">
            {paginatedData.map((item) => (
              <PaymentCard key={item.id} item={item} t={t} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-6 border-t border-gray-100">
              <div className="flex justify-center">
                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                        currentPage === i + 1
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg transform -translate-y-0.5"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, subtitle }) => {
  const colorClasses = {
    emerald: "from-emerald-500 to-teal-600",
    blue: "from-blue-500 to-indigo-600",
    amber: "from-amber-500 to-orange-600",
  };

  return (
    <div className="group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
           style={{background: `linear-gradient(to right, ${color === 'emerald' ? '#10b981, #0d9488' : color === 'blue' ? '#3b82f6, #4f46e5' : '#f59e0b, #ea580c'})`}}></div>
      
      <div className={`bg-gradient-to-r ${colorClasses[color]} p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-white relative`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
            <p className="text-3xl font-bold mb-1">{value}</p>
            <p className="text-white/70 text-xs">{subtitle}</p>
          </div>
          <div className="text-4xl opacity-80 transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const statusConfig = {
    confirmed: {
      bg: "bg-emerald-100",
      text: "text-emerald-800",
      icon: <HiCheckCircle className="w-4 h-4" />,
      label: "Confirmed"
    },
    pending: {
      bg: "bg-amber-100",
      text: "text-amber-800",
      icon: <HiClock className="w-4 h-4" />,
      label: "Pending"
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
};

const PaymentCard = ({ item, t }) => (
  <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-300">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <HiOfficeBuilding className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{item.company}</h3>
          <p className="text-sm text-gray-600">{item.owner}</p>
        </div>
      </div>
      <StatusBadge status={item.status} />
    </div>

    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <span className="text-gray-500">{t.paid}:</span>
        <p className="font-semibold text-gray-800">LKR {item.amount}</p>
      </div>
      <div>
        <span className="text-gray-500">{t.date}:</span>
        <p className="font-semibold text-gray-800">{item.date}</p>
      </div>
    </div>
  </div>
);

export default PaymentConfirmation;