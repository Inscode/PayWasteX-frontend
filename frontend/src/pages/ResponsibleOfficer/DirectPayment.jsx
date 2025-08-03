import React, { useState } from "react";
import { directCustomerPayment } from "../../services/responsibleOfficer";
import {
  CreditCard,
  CheckCircle,
  Clock,
  User,
  Building,
  Calendar,
  DollarSign,
  FileText,
  Search,
  Filter,
  Hash,
  UserCheck,
  Receipt,
} from "lucide-react";

const useLanguage = () => ({ lang: "en" }); // Mock hook for demo

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
    billid: "Bill ID",
    ownername: "Customer Name",
    companyname: "Company Name",
    registerno: "Register No",
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
  {
    id: 1,
    company: "Railway Tourist Bungalow",
    owner: "M S D Priyantha",
    amount: "413.00",
    date: "12 Apr 2025",
    status: "confirmed",
    zone: "A1",
  },
  {
    id: 2,
    company: "Sunset Hotel",
    owner: "Nirosha Perera",
    amount: "500.00",
    date: "10 Apr 2025",
    status: "confirmed",
    zone: "A2",
  },
  {
    id: 3,
    company: "Ocean View Café",
    owner: "Tharindu Silva",
    amount: "350.00",
    date: "11 Apr 2025",
    status: "confirmed",
    zone: "B1",
  },
  {
    id: 4,
    company: "Green Leaf Spa",
    owner: "Harsha Bandara",
    amount: "600.00",
    date: "13 Apr 2025",
    status: "pending",
    zone: "A1",
  },
  {
    id: 5,
    company: "Central Bookstore",
    owner: "Sajith Karunaratne",
    amount: "290.00",
    date: "09 Apr 2025",
    status: "confirmed",
    zone: "C1",
  },
  {
    id: 6,
    company: "Golden Bakery",
    owner: "Menaka Gunasekara",
    amount: "275.00",
    date: "08 Apr 2025",
    status: "confirmed",
    zone: "B2",
  },
  {
    id: 7,
    company: "Lanka Motors",
    owner: "Dulaj Fernando",
    amount: "750.00",
    date: "07 Apr 2025",
    status: "confirmed",
    zone: "A3",
  },
  {
    id: 8,
    company: "Colombo Print House",
    owner: "Sachini Madushani",
    amount: "430.00",
    date: "06 Apr 2025",
    status: "pending",
    zone: "B1",
  },
  {
    id: 9,
    company: "Lotus Pharmacy",
    owner: "Sanduni Wickrama",
    amount: "315.00",
    date: "05 Apr 2025",
    status: "confirmed",
    zone: "C2",
  },
  {
    id: 10,
    company: "Fashion World",
    owner: "Dinesh Priyankara",
    amount: "800.00",
    date: "04 Apr 2025",
    status: "confirmed",
    zone: "A2",
  },
  {
    id: 11,
    company: "Rainbow Florist",
    owner: "Thisaru Weerasinghe",
    amount: "220.00",
    date: "03 Apr 2025",
    status: "confirmed",
    zone: "B3",
  },
  {
    id: 12,
    company: "City Tech Solutions",
    owner: "Gayan Dissanayake",
    amount: "1000.00",
    date: "02 Apr 2025",
    status: "pending",
    zone: "A1",
  },
  {
    id: 13,
    company: "Victory Electronics",
    owner: "Shanaka Dilshan",
    amount: "720.00",
    date: "01 Apr 2025",
    status: "confirmed",
    zone: "C1",
  },
];

// Registration database for auto-fill
const registrationDatabase = {
  REG001: { company: "Railway Tourist Bungalow", owner: "M S D Priyantha" },
  REG002: { company: "Sunset Hotel", owner: "Nirosha Perera" },
  REG003: { company: "Ocean View Café", owner: "Tharindu Silva" },
  REG004: { company: "Green Leaf Spa", owner: "Harsha Bandara" },
  REG005: { company: "Central Bookstore", owner: "Sajith Karunaratne" },
  REG006: { company: "Golden Bakery", owner: "Menaka Gunasekara" },
  REG007: { company: "Lanka Motors", owner: "Dulaj Fernando" },
  REG008: { company: "Colombo Print House", owner: "Sachini Madushani" },
  REG009: { company: "Lotus Pharmacy", owner: "Sanduni Wickrama" },
  REG010: { company: "Fashion World", owner: "Dinesh Priyankara" },
};

const zones = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
const collectors = [
  "Mr. Prasad Perera",
  "Mrs. Silva Fernando",
  "Ms. Jayawardena",
  "Mr. Bandara",
];

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
    receipt: "",
    registerno: "",
    billid: "",
    ownername: "",
    companyname: "",
  });

  const perPage = 5;

  // Filter data based on search and date
  let filteredData = dummyData;

  if (searchTerm) {
    filteredData = filteredData.filter(
      (item) =>
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
    // Validate required fields
    if (!formData.zone || !formData.amount || !formData.receipt) {
      console.error("Missing required fields");
      return;
    }

    // Log form data before processing
    console.log("Confirming payment with data:", formData);
    console.log("Form validation status:", {
      hasZone: !!formData.zone,
      hasAmount: !!formData.amount,
      hasReceipt: !!formData.receipt,
      isValid: !!(formData.zone && formData.amount && formData.receipt),
    });

    setIsProcessing(true);

    try {
      // Prepare payment data for API
      const paymentData = {
        zone: formData.zone,
        collector: formData.collector,
        amount: parseFloat(formData.amount),
        receiptNumber: formData.receipt,
        registrationNumber: formData.registerno,
        billId: formData.billid,
        customerName: formData.ownername,
        companyName: formData.companyname,
      };

      console.log("Sending payment data to API:", paymentData);

      // Call the API service
      const response = await directCustomerPayment(paymentData);

      console.log("Payment confirmation response:", response);
      console.log("Payment confirmation completed successfully");

      setIsProcessing(false);
      setShowSuccess(true);

      // Log before clearing form
      console.log("Clearing form data...");
      setFormData({
        zone: "",
        collector: "",
        amount: "",
        receipt: "",
        registerno: "",
        billid: "",
        ownername: "",
        companyname: "",
      });

      setTimeout(() => {
        setShowSuccess(false);
        console.log("Success message hidden");
      }, 3000);
    } catch (error) {
      console.error("Payment confirmation failed:", error);
      setIsProcessing(false);

      // Handle specific error cases
      if (error.response) {
        console.error("API Error Response:", error.response.data);
      } else if (error.request) {
        console.error("Network Error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleInputChange = (field, value) => {
    // Log the input change
    console.log(`Input changed - Field: ${field}, Value: ${value}`);

    setFormData((prev) => {
      const newFormData = { ...prev, [field]: value };
      console.log("Updated form data:", newFormData);
      return newFormData;
    });

    // Auto-fill when registration number is entered
    if (field === "registerno") {
      const registrationData = registrationDatabase[value.toUpperCase()];
      if (registrationData) {
        console.log("Registration found:", registrationData);
        setFormData((prev) => {
          const autoFilledData = {
            ...prev,
            [field]: value,
            companyname: registrationData.company,
            ownername: registrationData.owner,
          };
          console.log("Auto-filled form data:", autoFilledData);
          return autoFilledData;
        });
      } else {
        console.log("Registration not found for:", value.toUpperCase());
        // Clear auto-filled fields if registration not found
        setFormData((prev) => {
          const clearedData = {
            ...prev,
            [field]: value,
            companyname: "",
            ownername: "",
          };
          console.log("Cleared auto-fill data:", clearedData);
          return clearedData;
        });
      }
    }
  };

  // Calculate statistics
  const totalConfirmed = dummyData.filter(
    (item) => item.status === "confirmed"
  ).length;
  const todayPayments = dummyData.filter(
    (item) => item.date === "13 Apr 2025"
  ).length;
  const pendingConfirm = dummyData.filter(
    (item) => item.status === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <CreditCard className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
                <p className="text-gray-600">
                  Verify and confirm payment transactions
                </p>
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
            icon={<CheckCircle />}
            color="emerald"
            subtitle="All time confirmations"
          />
          <StatCard
            title={t.todayPayments || "Today's Payments"}
            value={todayPayments}
            icon={<Clock />}
            color="blue"
            subtitle="Payments received today"
          />
          <StatCard
            title={t.pendingConfirm || "Pending Confirmation"}
            value={pendingConfirm}
            icon={<FileText />}
            color="amber"
            subtitle="Awaiting confirmation"
          />
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-center space-x-4 animate-fade-in">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-800">
                {t.success || "Success!"}
              </h3>
              <p className="text-emerald-600 text-sm">
                Payment has been confirmed and recorded.
              </p>
            </div>
          </div>
        )}

        {/* Payment Confirmation Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
            <h2 className="text-xl font-bold text-white mb-2">
              Direct Customer Payment
            </h2>
            <p className="text-emerald-100">
              Enter payment details to confirm transaction
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>{t.zone}</span>
                </label>
                <select
                  value={formData.zone}
                  onChange={(e) => handleInputChange("zone", e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200"
                >
                  <option value="">Select zone...</option>
                  {zones.map((zone) => (
                    <option key={zone} value={zone}>
                      Zone {zone}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Hash className="w-4 h-4" />
                  <span>{t.registerno}</span>
                </label>
                <input
                  type="text"
                  value={formData.registerno}
                  onChange={(e) =>
                    handleInputChange("registerno", e.target.value)
                  }
                  placeholder="Enter Register No (e.g., REG001)"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>{t.billid}</span>
                </label>
                <input
                  type="text"
                  value={formData.billid}
                  onChange={(e) => handleInputChange("billid", e.target.value)}
                  placeholder="Enter bill ID"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <UserCheck className="w-4 h-4" />
                  <span>{t.ownername}</span>
                </label>
                <input
                  type="text"
                  value={formData.ownername}
                  onChange={(e) =>
                    handleInputChange("ownername", e.target.value)
                  }
                  placeholder="Customer Name (Auto-filled)"
                  readOnly={
                    !!formData.ownername &&
                    registrationDatabase[formData.registerno?.toUpperCase()]
                  }
                  className={`w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 ${
                    !!formData.ownername &&
                    registrationDatabase[formData.registerno?.toUpperCase()]
                      ? "bg-gray-50 cursor-not-allowed"
                      : ""
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>{t.companyname}</span>
                </label>
                <input
                  type="text"
                  value={formData.companyname}
                  onChange={(e) =>
                    handleInputChange("companyname", e.target.value)
                  }
                  placeholder="Company Name (Auto-filled)"
                  readOnly={
                    !!formData.companyname &&
                    registrationDatabase[formData.registerno?.toUpperCase()]
                  }
                  className={`w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 ${
                    !!formData.companyname &&
                    registrationDatabase[formData.registerno?.toUpperCase()]
                      ? "bg-gray-50 cursor-not-allowed"
                      : ""
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{t.amount}</span>
                </label>
                <input
                  type="text"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  placeholder="Enter amount (LKR)"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Receipt className="w-4 h-4" />
                  <span>{t.receipt}</span>
                </label>
                <input
                  type="text"
                  value={formData.receipt}
                  onChange={(e) => handleInputChange("receipt", e.target.value)}
                  placeholder="Receipt number"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleConfirmPayment}
                disabled={
                  isProcessing ||
                  !formData.zone ||
                  !formData.amount ||
                  !formData.receipt
                }
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t.processing || "Processing..."}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>{t.confirm}</span>
                  </>
                )}
              </button>
            </div>
          </div>
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
      <div
        className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
        style={{
          background: `linear-gradient(to right, ${
            color === "emerald"
              ? "#10b981, #0d9488"
              : color === "blue"
              ? "#3b82f6, #4f46e5"
              : "#f59e0b, #ea580c"
          })`,
        }}
      ></div>

      <div
        className={`bg-gradient-to-r ${colorClasses[color]} p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-white relative`}
      >
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
      icon: <CheckCircle className="w-4 h-4" />,
      label: "Confirmed",
    },
    pending: {
      bg: "bg-amber-100",
      text: "text-amber-800",
      icon: <Clock className="w-4 h-4" />,
      label: "Pending",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
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
          <Building className="w-5 h-5 text-white" />
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
