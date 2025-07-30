import React, { useState } from "react";
import { Search, Filter, FileText, Eye, Edit3, Clock, CheckCircle, AlertTriangle, Calendar, User, MapPin, X, Check } from "lucide-react";

const useLanguage = () => ({ lang: 'en' }); // Mock hook for demo

const labels = {
  en: {
    total: "Total Bills",
    pending: "Pending Payment",
    overdue: "Overdue Bills",
    filtered: "Filtered By: Invoice No, Amount",
    issue: "Issue New Bill",
    invoiceNo: "Invoice No",
    regNo: "Reg No",
    name: "Name",
    company: "Company Name",
    time: "Time Period",
    amount: "Amount",
    action: "Action",
    edit: "Edit",
    view: "View",
    paid: "Paid",
    pendingStatus: "Pending",
    overdueStatus: "Overdue",
    dateRange: "Date Range",
    startDate: "Start Date",
    endDate: "End Date",
    collector: "Collector",
    zone: "Zone/Category",
    clearFilters: "Clear All Filters",
    billmanagement: "Bill Management",
    confirmPayment: "Confirm Payment",
    paymentConfirmed: "Payment Confirmed",
    confirmationRequired: "Payment confirmation required from responsible officer",
  },
};

const initialData = [
  {
    invoiceNo: "INV1001",
    regNo: "ST1NWT1",
    name: "M S D Priyantha",
    company: "Railway Tourist Bungalow",
    time: "12/04/2025 - 20/04/2025",
    status: "pending",
    zone: "A1",
    amount: "LKR 295.00",
    billDate: "2025-04-12",
    dueDate: "2025-04-20",
    collector: "Mr. Prasad Perera",
  },
  {
    invoiceNo: "INV1002",
    regNo: "ST1NWT2",
    name: "John Doe",
    company: "Beachside Hotel",
    time: "15/04/2025 - 25/04/2025",
    status: "paid",
    zone: "A1",
    amount: "LKR 450.00",
    billDate: "2025-04-15",
    dueDate: "2025-04-25",
    collector: "Mrs. Silva",
  },
  {
    invoiceNo: "INV1003",
    regNo: "ST1NWT3",
    name: "Sarah Johnson",
    company: "Mountain View Resort",
    time: "18/04/2025 - 28/04/2025",
    status: "overdue",
    zone: "A2",
    amount: "LKR 720.00",
    billDate: "2025-04-18",
    dueDate: "2025-04-28",
    collector: "Mr. Fernando",
  },
  {
    invoiceNo: "INV1004",
    regNo: "ST1NWT4",
    name: "David Smith",
    company: "City Center Hotel",
    time: "20/04/2025 - 30/04/2025",
    status: "pending",
    zone: "B1",
    amount: "LKR 380.00",
    billDate: "2025-04-20",
    dueDate: "2025-04-30",
    collector: "Ms. Jayawardena",
  },
  {
    invoiceNo: "INV1005",
    regNo: "ST1NWT5",
    name: "Emma Wilson",
    company: "Seaside Resort",
    time: "22/04/2025 - 02/05/2025",
    status: "pending",
    zone: "A3",
    amount: "LKR 650.00",
    billDate: "2025-04-22",
    dueDate: "2025-05-02",
    collector: "Mr. Kumara",
  },
  {
    invoiceNo: "INV1006",
    regNo: "ST1NWT6",
    name: "Michael Brown",
    company: "Garden Hotel",
    time: "25/04/2025 - 05/05/2025",
    status: "overdue",
    zone: "B2",
    amount: "LKR 520.00",
    billDate: "2025-04-25",
    dueDate: "2025-05-05",
    collector: "Mrs. Wickramasinghe",
  },
  {
    invoiceNo: "INV1007",
    regNo: "ST1NWT7",
    name: "Lisa Davis",
    company: "Ocean View Resort",
    time: "28/04/2025 - 08/05/2025",
    status: "paid",
    zone: "A4",
    amount: "LKR 890.00",
    billDate: "2025-04-28",
    dueDate: "2025-05-08",
    collector: "Mr. Rajapaksa",
  },
];

const zones = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4"];

const collectors = [
  "Mr. Prasad Perera",
  "Mrs. Silva", 
  "Mr. Fernando",
  "Ms. Jayawardena",
  "Mr. Kumara",
  "Mrs. Wickramasinghe",
  "Mr. Rajapaksa",
  "Ms. Dissanayake"
];

const BillManagement = () => {
  const { lang } = useLanguage();
  const t = labels[lang] || labels.en;

  const [bills, setBills] = useState(initialData);
  const [selectedZone, setSelectedZone] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmedPayments, setConfirmedPayments] = useState(new Set());
  
  // New filter states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCollector, setSelectedCollector] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const perPage = 6;
  
  // Filter to show only pending payments
  let filteredData = bills.filter(bill => bill.status === "pending");
  
  // Zone filter
  if (selectedZone) {
    filteredData = filteredData.filter((d) => d.zone === selectedZone);
  }
  
  // Search filter
  if (searchTerm) {
    filteredData = filteredData.filter((bill) =>
      bill.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Date range filter
  if (startDate && endDate) {
    filteredData = filteredData.filter((bill) => {
      const billDate = new Date(bill.billDate);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return billDate >= start && billDate <= end;
    });
  }
  
  // Collector filter
  if (selectedCollector) {
    filteredData = filteredData.filter((bill) => bill.collector === selectedCollector);
  }
  
  // Category filter (using zone as category)
  if (selectedCategory) {
    filteredData = filteredData.filter((bill) => bill.zone === selectedCategory);
  }
  
  // Check if any filters are active
  const hasActiveFilters = selectedZone || searchTerm || 
                          startDate || endDate || selectedCollector || selectedCategory;
  
  // Clear all filters function
  const clearAllFilters = () => {
    setSelectedZone("");
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setSelectedCollector("");
    setSelectedCategory("");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / perPage);
  const paginatedData = filteredData.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleConfirmPayment = (invoiceNo) => {
    const newConfirmedPayments = new Set(confirmedPayments);
    newConfirmedPayments.add(invoiceNo);
    setConfirmedPayments(newConfirmedPayments);
    
    // Update bill status to paid
    setBills(prevBills =>
      prevBills.map(bill =>
        bill.invoiceNo === invoiceNo
          ? { ...bill, status: "paid" }
          : bill
      )
    );
  };

  const handleSave = (updatedBill) => {
    setBills((prevBills) =>
      prevBills.map((bill) =>
        bill.invoiceNo === updatedBill.invoiceNo ? updatedBill : bill
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Clock className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{t.billmanagement}</h1>
                <p className="text-gray-600">{t.confirmationRequired}</p>
              </div>
            </div>
            {/* <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
              {t.issue}
            </button> */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <SummaryCard
            title={t.total}
            value={bills.length}
            icon={<FileText />}
            color="blue"
            subtitle="All invoices"
          />
          <SummaryCard
            title={t.pending}
            value={bills.filter(d => d.status === "pending").length}
            icon={<Clock />}
            color="amber"
            subtitle="Awaiting confirmation"
          />
          <SummaryCard
            title={t.overdue}
            value={bills.filter(d => d.status === "overdue").length}
            icon={<AlertTriangle />}
            color="red"
            subtitle="Past due date"
          />
        </div>

        {/* Advanced Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Filter className="mr-2 text-blue-600" />
              Filter Options
            </h2>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="mr-2 w-4 h-4" />
                {t.clearFilters}
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            {/* Date Range Filter */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Calendar className="mr-2 text-blue-600 w-4 h-4" />
                {t.dateRange}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={t.startDate}
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={t.endDate}
                />
              </div>
            </div>

            {/* Collector Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                <User className="mr-2 text-purple-600 w-4 h-4" />
                {t.collector}
              </label>
              <select
                value={selectedCollector}
                onChange={(e) => setSelectedCollector(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              >
                <option value="">All Collectors</option>
                {collectors.map((collector, i) => (
                  <option key={i} value={collector}>
                    {collector}
                  </option>
                ))}
              </select>
            </div>

            {/* Zone/Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                <MapPin className="mr-2 text-green-600 w-4 h-4" />
                {t.zone}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              >
                <option value="">All Zones</option>
                {zones.map((zone, i) => (
                  <option key={i} value={zone}>
                    Zone {zone}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Row */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by Invoice No, Name, or Company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>Showing {paginatedData.length} of {filteredData.length} pending payments</span>
            {hasActiveFilters && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                <Filter className="w-3 h-3 mr-1" />
                Filtered
              </span>
            )}
          </div>
          <div>
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.invoiceNo}</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.regNo}</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.name}</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.company}</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.time}</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.amount}</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.invoiceNo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{item.regNo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{item.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{item.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{item.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedBill(item);
                            setIsViewModalOpen(true);
                          }}
                          className="bg-blue-100 text-blue-700 p-2 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                          title="View Bill"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleConfirmPayment(item.invoiceNo)}
                          className="bg-green-100 text-green-700 p-2 rounded-lg hover:bg-green-200 transition-colors duration-200 flex items-center space-x-1"
                          title="Confirm Payment"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile/Tablet Cards */}
        <div className="lg:hidden grid gap-4">
          {paginatedData.map((item, idx) => (
            <PendingBillCard
              key={idx}
              item={item}
              t={t}
              onConfirmPayment={() => handleConfirmPayment(item.invoiceNo)}
              onView={() => {
                setSelectedBill(item);
                setIsViewModalOpen(true);
              }}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                    currentPage === i + 1
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform -translate-y-0.5"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {paginatedData.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No pending payments found</h3>
            <p className="text-gray-500">All payments have been confirmed or try adjusting your filter criteria</p>
          </div>
        )}
      </div>

      {/* View Modal */}
      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Bill Details - {selectedBill?.invoiceNo}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Reg No:</span>
                <span className="font-medium">{selectedBill?.regNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{selectedBill?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Company:</span>
                <span className="font-medium">{selectedBill?.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Period:</span>
                <span className="font-medium">{selectedBill?.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold text-lg">{selectedBill?.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Collector:</span>
                <span className="font-medium">{selectedBill?.collector}</span>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleConfirmPayment(selectedBill.invoiceNo);
                  setIsViewModalOpen(false);
                }}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Payment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SummaryCard = ({ title, value, icon, color, subtitle }) => {
  const colorClasses = {
    blue: "from-blue-500 to-indigo-600",
    amber: "from-amber-500 to-orange-600",
    red: "from-red-500 to-rose-600",
  };

  const backgroundColors = {
    blue: '#3b82f6, #4f46e5',
    amber: '#f59e0b, #ea580c',
    red: '#ef4444, #f43f5e'
  };

  return (
    <div className="group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
           style={{background: `linear-gradient(to right, ${backgroundColors[color]})`}}></div>
      
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

const PendingBillCard = ({ item, t, onConfirmPayment, onView }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
          <Clock className="text-white w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{item.invoiceNo}</h3>
          <p className="text-sm text-gray-600">{item.regNo}</p>
        </div>
      </div>
      <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
        <Clock className="w-4 h-4" />
        <span>Pending</span>
      </span>
    </div>

    <div className="space-y-3 mb-4">
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">{t.name}:</span>
        <span className="text-sm font-medium text-gray-800">{item.name}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">{t.company}:</span>
        <span className="text-sm font-medium text-gray-800">{item.company}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">{t.time}:</span>
        <span className="text-sm font-medium text-gray-800">{item.time}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">{t.amount}:</span>
        <span className="text-sm font-bold text-gray-900">{item.amount}</span>
      </div>
    </div>

    <div className="flex space-x-3 pt-4 border-t border-gray-100">
      <button
        onClick={onView}
        className="flex-1 bg-blue-50 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <Eye className="w-4 h-4" />
        <span>{t.view}</span>
      </button>
      <button
        onClick={onConfirmPayment}
        className="flex-1 bg-green-50 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-100 transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <Check className="w-4 h-4" />
        <span>Confirm</span>
      </button>
    </div>
  </div>
);

export default BillManagement;