import React, { useState } from "react";
import { Edit3, Plus, Check, X, Building, Store, Hotel, Package } from "lucide-react";

export default function FeeStructurePage() {
  const [successMessage, setSuccessMessage] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [lang] = useState("en"); // Default to English

  const translations = {
    en: {
      title: "Fee Structure",
      premises: "Premises Type",
      category: "Business Category",
      amount: "Fee Amount",
      status: "Status",
      edit: "Edit",
      newTitle: "New Fee Structure",
      selectCategory: "Select Business Category",
      smallScale: "Small Scale",
      largeScale: "Large Scale",
      billingFrequency: "Select Billing Frequency",
      monthly: "Monthly",
      quarterly: "Quarterly",
      addButton: "Add New Fee Structure",
      success: "Successfully updated fee structure!",
      close: "Close",
      update: "Update Fee",
      cancel: "Cancel",
    },
    si: {
      title: "ගාස්තු ව්‍යුහය",
      premises: "පරිශ්‍ර වර්ගය",
      category: "ව්‍යාපාර වර්ගය",
      amount: "ගාස්තු මුදල",
      status: "තත්ත්වය",
      edit: "සංස්කරණය",
      newTitle: "නව ගාස්තු ව්‍යුහය",
      selectCategory: "ව්‍යාපාර වර්ගය තෝරන්න",
      smallScale: "කුඩා පරිමාණය",
      largeScale: "විශාල පරිමාණය",
      billingFrequency: "බිල්පත් නිකුත් කිරීමේ අවධිය තෝරන්න",
      monthly: "මාසිකව",
      quarterly: "තරමක් මාසිකව",
      addButton: "නව ගාස්තු ව්‍යුහය එක් කරන්න",
      success: "ගාස්තු ව්‍යුහය සාර්ථකව යාවත්කාලීන කරන ලදි!",
      close: "වසන්න",
      update: "යාවත්කාලීන කිරීම",
      cancel: "අවලංගු කරන්න",
    },
    ta: {
      title: "கட்டண அமைப்பு",
      premises: "வாடகை வகை",
      category: "வணிக வகை",
      amount: "கட்டண தொகை",
      status: "நிலை",
      edit: "தொகு",
      newTitle: "புதிய கட்டண அமைப்பு",
      selectCategory: "வணிக வகையைத் தேர்ந்தெடுக்கவும்",
      smallScale: "சிறிய அளவு",
      largeScale: "பெரிய அளவு",
      billingFrequency: "பில்லிங் அதிர்வெணையைத் தேர்ந்தெடுக்கவும்",
      monthly: "மாதந்தோறும்",
      quarterly: "மூன்றுமாதத்திற்கு ஒருமுறை",
      addButton: "புதிய கட்டண அமைப்பைச் சேர்க்கவும்",
      success: "கட்டண அமைப்பு வெற்றிகரமாக புதுப்பிக்கப்பட்டது!",
      close: "மூடு",
      update: "கட்டணத்தை புதுப்பிக்கவும்",
      cancel: "ரத்துசெய்",
    },
  };

  const t = translations[lang];

  const [tableData, setTableData] = useState([
    { premises: "Company", category: "Small Scale", amount: 300.0 },
    { premises: "Grocery", category: "Small Scale", amount: 300.0 },
    { premises: "Shop", category: "Large Scale", amount: 413.0 },
    { premises: "Hotel", category: "Large Scale", amount: 413.0 },
  ]);

  const [newFeeData, setNewFeeData] = useState({
    premises: "",
    category: "",
    amount: "",
    billingFrequency: "",
    effectiveDate: ""
  });

  const getIcon = (premises) => {
    const icons = {
      Company: Building,
      Grocery: Store,
      Shop: Package,
      Hotel: Hotel
    };
    const IconComponent = icons[premises] || Building;
    return <IconComponent className="w-5 h-5" />;
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditData(tableData[index]);
  };

  const handleUpdate = () => {
    const updated = [...tableData];
    updated[editIndex] = editData;
    setTableData(updated);
    setSuccessMessage(t.success);
    setEditIndex(null);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  const handleNewFeeStructure = () => {
    if (newFeeData.premises && newFeeData.category && newFeeData.amount) {
      const newFee = {
        premises: newFeeData.premises,
        category: newFeeData.category,
        amount: parseFloat(newFeeData.amount)
      };
      setTableData([...tableData, newFee]);
      setNewFeeData({
        premises: "",
        category: "",
        amount: "",
        billingFrequency: "",
        effectiveDate: ""
      });
    }
    setSuccessMessage(t.success);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6 py-8">
      {/* Header with gradient and shadow */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          {t.title}
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
      </div>

      {/* Desktop Table View with glassmorphism */}
      <div className="hidden md:block mb-8">
        <div className="backdrop-blur-md bg-white/70 border border-white/20 rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm">
                <th className="px-6 py-4 text-left font-semibold text-slate-700 border-b border-white/20">
                  {t.premises}
                </th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 border-b border-white/20">
                  {t.category}
                </th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 border-b border-white/20">
                  {t.amount}
                </th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 border-b border-white/20">
                  {t.status}
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr 
                  key={index} 
                  className="group hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300 border-b border-white/10 last:border-b-0"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600">
                        {getIcon(row.premises)}
                      </div>
                      <span className="font-medium text-slate-700">{row.premises}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      row.category === "Small Scale" 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {t[row.category.toLowerCase().replace(" ", "")] || row.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-lg text-slate-800">
                      LKR {row.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditClick(index)}
                      className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span className="font-medium">{t.edit}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View with modern cards */}
      <div className="md:hidden space-y-4 mb-8">
        {tableData.map((row, index) => (
          <div
            key={index}
            className="group backdrop-blur-md bg-white/70 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600">
                  {getIcon(row.premises)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{row.premises}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    row.category === "Small Scale" 
                      ? "bg-emerald-100 text-emerald-700" 
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {t[row.category.toLowerCase().replace(" ", "")] || row.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleEditClick(index)}
                className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            <div className="pt-4 border-t border-white/20">
              <span className="text-2xl font-bold text-slate-800">
                LKR {row.amount.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* New Fee Structure Form with glassmorphism */}
      <div className="backdrop-blur-md bg-white/70 border border-white/20 rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600">
            <Plus className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {t.newTitle}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{t.premises}</label>
            <input
              type="text"
              value={newFeeData.premises}
              onChange={(e) => setNewFeeData({...newFeeData, premises: e.target.value})}
              placeholder={t.premises}
              className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300 placeholder-slate-400"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{t.category}</label>
            <select 
              value={newFeeData.category}
              onChange={(e) => setNewFeeData({...newFeeData, category: e.target.value})}
              className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300"
            >
              <option value="">{t.selectCategory}</option>
              <option value="Small Scale">{t.smallScale}</option>
              <option value="Large Scale">{t.largeScale}</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{t.amount}</label>
            <input
              type="number"
              value={newFeeData.amount}
              onChange={(e) => setNewFeeData({...newFeeData, amount: e.target.value})}
              placeholder={t.amount}
              className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300 placeholder-slate-400"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{t.billingFrequency}</label>
            <select 
              value={newFeeData.billingFrequency}
              onChange={(e) => setNewFeeData({...newFeeData, billingFrequency: e.target.value})}
              className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300"
            >
              <option value="">{t.billingFrequency}</option>
              <option value="Monthly">{t.monthly}</option>
              <option value="Quarterly">{t.quarterly}</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Effective Date</label>
            <input
              type="date"
              value={newFeeData.effectiveDate}
              onChange={(e) => setNewFeeData({...newFeeData, effectiveDate: e.target.value})}
              className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleNewFeeStructure}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            {t.addButton}
          </button>
        </div>
      </div>

      {/* Edit Modal with modern design */}
      {editIndex !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-md bg-white/90 border border-white/20 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600">
                  <Edit3 className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {t.edit} {t.title}
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{t.premises}</label>
                  <input
                    type="text"
                    value={editData.premises}
                    readOnly
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-600"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{t.category}</label>
                  <input
                    type="text"
                    value={editData.category}
                    readOnly
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-600"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{t.amount}</label>
                  <input
                    type="number"
                    value={editData.amount}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        amount: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Effective Date</label>
                  <input
                    type="date"
                    value={editData.effectiveDate || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, effectiveDate: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleUpdate}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Check className="w-4 h-4" />
                  {t.update}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <X className="w-4 h-4" />
                  {t.cancel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Message with modern styling */}
      {successMessage && (
        <div className="fixed top-8 right-8 z-50 animate-pulse">
          <div className="backdrop-blur-md bg-emerald-500/90 border border-emerald-400/20 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <div className="p-1 bg-white/20 rounded-full">
              <Check className="w-4 h-4" />
            </div>
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
}