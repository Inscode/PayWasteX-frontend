import React, { useState } from "react";
import { HiSearch, HiFilter, HiDocumentText, HiEye, HiPencil, HiClock, HiCheckCircle, HiExclamation } from "react-icons/hi";

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
];

const zones = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4"];

const BillManagement = () => {
  const { lang } = useLanguage();
  const t = labels[lang] || labels.en;

  const [bills, setBills] = useState(initialData);
  const [selectedZone, setSelectedZone] = useState("A1");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const perPage = 6;
  
  // Enhanced filtering
  let filteredData = bills.filter((d) => d.zone === selectedZone);
  
  if (searchTerm) {
    filteredData = filteredData.filter((bill) =>
      bill.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  if (statusFilter !== "all") {
    filteredData = filteredData.filter((bill) => bill.status === statusFilter);
  }

  const totalPages = Math.ceil(filteredData.length / perPage);
  const paginatedData = filteredData.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleSave = (updatedBill) => {
    setBills((prevBills) =>
      prevBills.map((bill) =>
        bill.invoiceNo === updatedBill.invoiceNo ? updatedBill : bill
      )
    );
    setIsModalOpen(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <HiCheckCircle className="w-4 h-4" />;
      case 'pending':
        return <HiClock className="w-4 h-4" />;
      case 'overdue':
        return <HiExclamation className="w-4 h-4" />;
      default:
        return <HiClock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <HiDocumentText className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Bill Management</h1>
                <p className="text-gray-600">Manage and track all billing operations</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
              {t.issue}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <SummaryCard
            title={t.total}
            value={bills.length}
            icon={<HiDocumentText />}
            color="blue"
            subtitle="All invoices"
          />
          <SummaryCard
            title={t.pending}
            value={bills.filter(d => d.status === "pending").length}
            icon={<HiClock />}
            color="amber"
            subtitle="Awaiting payment"
          />
          <SummaryCard
            title={t.overdue}
            value={bills.filter(d => d.status === "overdue").length}
            icon={<HiExclamation />}
            color="red"
            subtitle="Past due date"
          />
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by invoice, name, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <HiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white min-w-[150px]"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>

          {/* Zone Filters */}
          <div className="flex flex-wrap gap-2">
            {zones.map((zone) => (
              <button
                key={zone}
                onClick={() => {
                  setSelectedZone(zone);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:-translate-y-0.5 ${
                  selectedZone === zone
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                }`}
              >
                Zone {zone}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            Showing {paginatedData.length} of {filteredData.length} bills in Zone {selectedZone}
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.amount}</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.action}</th>
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
                      <StatusBadge status={item.status} t={t} />
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
                          <HiEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBill(item);
                            setIsModalOpen(true);
                          }}
                          className="bg-emerald-100 text-emerald-700 p-2 rounded-lg hover:bg-emerald-200 transition-colors duration-200"
                          title="Edit Bill"
                        >
                          <HiPencil className="w-4 h-4" />
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
            <BillCard
              key={idx}
              item={item}
              t={t}
              onEdit={() => {
                setSelectedBill(item);
                setIsModalOpen(true);
              }}
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
            <HiDocumentText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No bills found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Mock Modals (replace with your actual modals) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Bill - {selectedBill?.invoiceNo}</h3>
            <p className="text-gray-600 mb-4">Edit bill modal would go here</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">View Bill - {selectedBill?.invoiceNo}</h3>
            <p className="text-gray-600 mb-4">View bill modal would go here</p>
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
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

  return (
    <div className="group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
           style={{background: `linear-gradient(to right, ${color === 'blue' ? '#3b82f6, #4f46e5' : color === 'amber' ? '#f59e0b, #ea580c' : '#ef4444, #f43f5e'})`}}></div>
      
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

const StatusBadge = ({ status, t }) => {
  const statusConfig = {
    paid: {
      bg: "bg-green-100",
      text: "text-green-800",
      icon: <HiCheckCircle className="w-4 h-4" />,
      label: t.paid
    },
    pending: {
      bg: "bg-amber-100",
      text: "text-amber-800",
      icon: <HiClock className="w-4 h-4" />,
      label: t.pendingStatus
    },
    overdue: {
      bg: "bg-red-100",
      text: "text-red-800",
      icon: <HiExclamation className="w-4 h-4" />,
      label: t.overdueStatus
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

const BillCard = ({ item, t, onEdit, onView }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <HiDocumentText className="text-white w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{item.invoiceNo}</h3>
          <p className="text-sm text-gray-600">{item.regNo}</p>
        </div>
      </div>
      <StatusBadge status={item.status} t={t} />
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
        <HiEye className="w-4 h-4" />
        <span>{t.view}</span>
      </button>
      <button
        onClick={onEdit}
        className="flex-1 bg-emerald-50 text-emerald-700 py-2 px-4 rounded-lg font-medium hover:bg-emerald-100 transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <HiPencil className="w-4 h-4" />
        <span>{t.edit}</span>
      </button>
    </div>
  </div>
);

export default BillManagement;