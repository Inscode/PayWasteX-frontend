import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function FeeStructurePage() {
  const [successMessage, setSuccessMessage] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const { lang } = useLanguage();
  const navigate = useNavigate();

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
    setSuccessMessage(t.success);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <h1 className="text-2xl font-bold text-green-800 mb-6">{t.title}</h1>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-gray-50 border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700 font-semibold">
              <th className="px-4 py-2 border-b">{t.premises}</th>
              <th className="px-4 py-2 border-b">{t.category}</th>
              <th className="px-4 py-2 border-b">{t.amount}</th>
              <th className="px-4 py-2 border-b">{t.status}</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2">{row.premises}</td>
                <td className="px-4 py-2">
                  {t[row.category.toLowerCase().replace(" ", "")] || row.category}
                </td>
                <td className="px-4 py-2">LKR {row.amount.toFixed(2)}</td>
                <td
                  className="px-4 py-2 text-blue-600 font-medium cursor-pointer hover:underline"
                  onClick={() => handleEditClick(index)}
                >
                  {t.edit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {tableData.map((row, index) => (
          <div
            key={index}
            className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-sm"
          >
            <div className="mb-2">
              <span className="font-semibold text-gray-700">{t.premises}: </span>
              {row.premises}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">{t.category}: </span>
              {t[row.category.toLowerCase().replace(" ", "")] || row.category}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">{t.amount}: </span>
              LKR {row.amount.toFixed(2)}
            </div>
            <div>
              <span className="font-semibold text-gray-700">{t.status}: </span>
              <span
                className="text-blue-600 font-medium cursor-pointer hover:underline"
                onClick={() => handleEditClick(index)}
              >
                {t.edit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* New Fee Structure Form */}
      <h2 className="text-xl font-bold text-green-800 mt-10 mb-4">{t.newTitle}</h2>
      <div className="bg-gray-100 rounded p-4 space-y-4">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder={t.premises}
            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded"
          />
          <select className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded">
            <option value="">{t.selectCategory}</option>
            <option value="Small Scale">{t.smallScale}</option>
            <option value="Large Scale">{t.largeScale}</option>
          </select>
          <input
            type="number"
            placeholder={t.amount}
            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <select className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded">
            <option value="">{t.billingFrequency}</option>
            <option value="Monthly">{t.monthly}</option>
            <option value="Quarterly">{t.quarterly}</option>
          </select>
          <input
            type="date"
            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleNewFeeStructure}
            className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold px-6 py-2 rounded"
          >
            {t.addButton}
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editIndex !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl w-96">
            <h2 className="text-xl font-bold text-center text-green-800 mb-4">
              {t.edit} {t.title}
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                value={editData.premises}
                readOnly
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                value={editData.category}
                readOnly
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="number"
                value={editData.amount}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    amount: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="date"
                value={editData.effectiveDate || ""}
                onChange={(e) =>
                  setEditData({ ...editData, effectiveDate: e.target.value })
                }
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="flex justify-between mt-6 gap-4">
        <button
        onClick={handleUpdate}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded h-10"
        >
        {t.update}
        </button>
        <button
        onClick={handleCancel}
        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
        {t.cancel}
        </button>
        </div>

            
          </div>
        </div>
      )}

      {/* Toast Message */}
      {successMessage && (
        <div className="fixed top-15 right-4 z-50">
          <div className=" text-yellow-800 px-4  font-medium">
            {successMessage}
          </div>
        </div>
      )}
    </div>
  );
}
