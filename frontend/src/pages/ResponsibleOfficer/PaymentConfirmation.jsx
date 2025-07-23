// src/pages/PaymentConfirmation.jsx
import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

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
    company: "Railway Tourist Bungalow",
    owner: "M S D Priyantha",
    amount: "LKR 413.00",
    date: "12 Apr 2025",
  },
  {
    company: "Railway Tourist Bungalow",
    owner: "M S D Priyantha",
    amount: "LKR 413.00",
    date: "12 Apr 2025",
  },
  {
    company: "Railway Tourist Bungalow",
    owner: "M S D Priyantha",
    amount: "LKR 413.00",
    date: "12 Apr 2025",
  },
  {
    company: "Railway Tourist Bungalow",
    owner: "M S D Priyantha",
    amount: "LKR 413.00",
    date: "12 Apr 2025",
  },
];

const PaymentConfirmation = () => {
  const { lang } = useLanguage();
  const t = labels[lang] || labels.en;

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-white text-gray-800">
      <h2 className="text-xl sm:text-2xl font-semibold text-green-800 mb-4">{t.title}</h2>

      {/* Form Section */}
      <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <select className="p-2 border rounded">
            <option>{t.zone}</option>
            <option>Zone A</option>
            <option>Zone B</option>
          </select>
          <select className="p-2 border rounded">
            <option>{t.collector}</option>
            <option>Collector 1</option>
            <option>Collector 2</option>
          </select>
          <input type="text" placeholder={t.amount} className="p-2 border rounded" />
          <input type="text" placeholder={t.receipt} className="p-2 border rounded" />
        </div>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded shadow">
          {t.confirm}
        </button>
      </div>

      {/* History */}
      <h3 className="text-lg font-semibold text-green-800 mb-4">{t.history}</h3>

      {/* Desktop Table */}
      <div className="hidden sm:block">
        <table className="w-full bg-white rounded shadow overflow-hidden text-sm">
          <thead className="bg-green-50 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-2 text-left">{t.company}</th>
              <th className="px-4 py-2 text-left">{t.owner}</th>
              <th className="px-4 py-2 text-left">{t.paid}</th>
              <th className="px-4 py-2 text-left">{t.date}</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{item.company}</td>
                <td className="px-4 py-2">{item.owner}</td>
                <td className="px-4 py-2">{item.amount}</td>
                <td className="px-4 py-2">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-4">
        {dummyData.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded shadow">
            <p><strong>{t.company}:</strong> {item.company}</p>
            <p><strong>{t.owner}:</strong> {item.owner}</p>
            <p><strong>{t.paid}:</strong> {item.amount}</p>
            <p><strong>{t.date}:</strong> {item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentConfirmation;
