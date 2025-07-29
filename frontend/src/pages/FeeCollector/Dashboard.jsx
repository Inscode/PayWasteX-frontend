import React, { useState } from "react";
import { 
  MapPin, 
  Building2, 
  CreditCard, 
  User, 
  DollarSign, 
  CheckCircle2, 
  X, 
  Wallet,
  TrendingUp,
  Users,
  Clock,
  Send
} from "lucide-react";

const zones = [
  "A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4"
];

const sampleCards = Array(8).fill({
  id: "ST1NWT2",
  name: {
    en: "Mahesh Kumara",
    si: "මහේශ් කුමාර",
    ta: "மகேஷ் குமாரா",
  },
  company: {
    en: "Rajarata Oil",
    si: "රජරට තෙල්",
    ta: "ரஜரடா எண்ணெய்",
  },
  due: 2300.0,
  lastPayment: "2025-02-15",
  status: "pending"
});

const translations = {
  en: {
    name: "Name",
    company: "Company Name",
    due: "Outstanding Due",
    pay: "Collect Payment",
    total: "Total Collection Amount",
    submit: "Submit Collection",
    paidMessage: "Payment collected successfully!",
    submittedMessage: "Collection submitted successfully!",
    paidAmount: "Enter Payment Amount",
    ok: "Confirm Payment",
    dashboard: "Fee Collection Dashboard",
    zoneSelection: "Select Collection Zone",
    totalCustomers: "Total Customers",
    pendingPayments: "Pending Payments",
    todayCollection: "Today's Collection",
    lastPayment: "Last Payment"
  },
  si: {
    name: "නම",
    company: "සමාගම් නාමය",
    due: "ගෙවිය යුතු හිඟ මුදල",
    pay: "ගෙවීම එකතු කරන්න",
    total: "මුළු එකතු කරන ලද මුදල",
    submit: "එකතුව ඉදිරිපත් කරන්න",
    paidMessage: "ගෙවීම සාර්ථකව එකතු කරන ලදී!",
    submittedMessage: "එකතුව සාර්ථකව ඉදිරිපත් කරන ලදී!",
    paidAmount: "ගෙවීමේ මුදල ඇතුළත් කරන්න",
    ok: "ගෙවීම තහවුරු කරන්න",
    dashboard: "ගාස්තු එකතු කිරීමේ පුවරුව",
    zoneSelection: "එකතු කිරීමේ කලාපය තෝරන්න",
    totalCustomers: "මුළු පාරිභෝගිකයින්",
    pendingPayments: "අපේක්ෂිත ගෙවීම්",
    todayCollection: "අද එකතු කිරීම",
    lastPayment: "අවසාන ගෙවීම"
  },
  ta: {
    name: "பெயர்",
    company: "நிறுவனத்தின் பெயர்",
    due: "செலுத்த வேண்டிய தொகை",
    pay: "பணம் வசூலிக்கவும்",
    total: "மொத்த வசூல் தொகை",
    submit: "வசூலை சமர்ப்பிக்கவும்",
    paidMessage: "பணம் வெற்றிகரமாக வசூலிக்கப்பட்டது!",
    submittedMessage: "வசூல் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!",
    paidAmount: "செலுத்திய தொகையை உள்ளிடவும்",
    ok: "பணம் செலுத்துவதை உறுதிப்படுத்தவும்",
    dashboard: "கட்டண வசூல் டாஷ்போர்டு",
    zoneSelection: "வசூல் மண்டலத்தைத் தேர்ந்தெடுக்கவும்",
    totalCustomers: "மொத்த வாடிக்கையாளர்கள்",
    pendingPayments: "நிலுவையில் உள்ள பணம்",
    todayCollection: "இன்றைய வசூல்",
    lastPayment: "கடைசி பணம்"
  },
};

export default function FeeCollectorDashboard() {
  const [lang] = useState('en'); // Simplified for demo
  const t = translations[lang] || translations.en;

  const [selectedZone, setSelectedZone] = useState("A1");
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [editedAmount, setEditedAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const totalAmount = sampleCards.reduce((sum, card) => sum + card.due, 0);
  const totalCustomers = sampleCards.length;
  const pendingPayments = sampleCards.filter(card => card.status === 'pending').length;

  const handlePayClick = (amount, cardIndex) => {
    setSelectedAmount(amount);
    setSelectedCard(cardIndex);
    setEditedAmount(amount.toFixed(2));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAmount(null);
    setSelectedCard(null);
    setEditedAmount("");
    setSuccessMessage(t.paidMessage);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const handleSubmitCollection = () => {
    setSuccessMessage(t.submittedMessage);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {t.dashboard}
              </h1>
              <p className="text-slate-600 mt-1">Zone {selectedZone} - Collection Management</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span>Updated now</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">{t.totalCustomers}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{totalCustomers}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">{t.pendingPayments}</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{pendingPayments}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                <Wallet className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">{t.todayCollection}</p>
                <p className="text-2xl font-bold text-green-600 mt-1">LKR 12,500</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">{t.total}</p>
                <p className="text-2xl font-bold text-indigo-600 mt-1">LKR {totalAmount.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Zone Selection */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl mb-8">
          <div className="flex items-center mb-4">
            <MapPin className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-semibold text-slate-900">{t.zoneSelection}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {zones.map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  selectedZone === zone
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-white/80 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200"
                }`}
              >
                Zone {zone}
              </button>
            ))}
          </div>
        </div>

        {/* Customer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {sampleCards.map((card, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg">
                    <CreditCard className="w-4 h-4 text-slate-600" />
                  </div>
                  <span className="font-bold text-slate-900 text-sm">{card.id}</span>
                </div>
                <div className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                  Pending
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-medium text-slate-600">{t.name}:</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 text-right">{card.name[lang]}</span>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-medium text-slate-600">{t.company}:</span>
                  </div>
                  <span className="text-sm text-slate-700 text-right">{card.company[lang]}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-xs font-medium text-slate-600">{t.due}:</span>
                  <span className="text-lg font-bold text-red-600">LKR {card.due.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                onClick={() => handlePayClick(card.due, index)}
              >
                <Wallet className="w-4 h-4" />
                <span>{t.pay}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Collection Summary */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{t.total}</h3>
                <p className="text-3xl font-bold text-indigo-600">LKR {totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <button
              onClick={handleSubmitCollection}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>{t.submit}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-20 right-4 z-50 animate-pulse">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 transform transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">{t.paidAmount}</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-red-500 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Payment Amount (LKR)
              </label>
              <input
                type="number"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
                className="w-full text-center text-xl font-bold text-slate-900 border-2 border-slate-200 rounded-xl px-4 py-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                placeholder="0.00"
              />
            </div>

            <button
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              onClick={closeModal}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{t.ok}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
