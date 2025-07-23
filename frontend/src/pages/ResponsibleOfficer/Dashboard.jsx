import React, { useEffect, useRef } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const payers = [
  { regNo: "ST1NWT1", name: "Senior Engineer (Northern) Railway Department", company: "Railway Tourist Bungalow", amount: "LKR 413.00" },
  { regNo: "ST1NWT2", name: "Mahesh Kumara", company: "Rajarata Oil", amount: "LKR 295.00" },
  { regNo: "ST1NWT3", name: "M S S M Hashan", company: "Kings’ Communication", amount: "LKR 295.00" },
  { regNo: "ST1NWT4", name: "A A Rasik", company: "Star Grocery", amount: "LKR 590.00" },
  { regNo: "ST1NWT5", name: "Sisira Nirmal", company: "Horana Wasana Bakery", amount: "LKR 250.00" },
];

const labels = {
  en: {
    total: "Total Collection",
    pending: "Pending Dues",
    defaulters: "Defaulters",
    perMonth: "Per Month",
    recentPayers: "Recent Payers",
    regNo: "Reg No",
    name: "Name",
    company: "Company Name",
    amount: "Monthly Full Payment",
    currency: "LKR",
  },
  si: {
    total: "මුළු එකතුව",
    pending: "බකියාව",
    defaulters: "නොගෙවූ අය",
    perMonth: "මාසිකව",
    recentPayers: "නවතම ගෙවීම්",
    regNo: "ලියාපදිංචි අංකය",
    name: "නම",
    company: "සමාගම",
    amount: "මාසික ගෙවීම්",
    currency: "රු.",
  },
  ta: {
    total: "மொத்த வசூல்",
    pending: "நிலுவை",
    defaulters: "செலுத்தாதவர்கள்",
    perMonth: "மாதத்துக்கு",
    recentPayers: "சமீபத்தில் செலுத்தியவர்கள்",
    regNo: "பதிவு எண்",
    name: "பெயர்",
    company: "நிறுவனம்",
    amount: "மாதாந்திர தொகை",
    currency: "ரூ.",
  },
};

const Dashboard = () => {
  const { lang } = useLanguage();
  const t = labels[lang] || labels.en;

  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const scrollAmount = el.scrollWidth - el.clientWidth;

    if (scrollAmount > 0) {
      el.scrollTo({ left: 0, behavior: "auto" });
      setTimeout(() => {
        el.scrollTo({ left: scrollAmount, behavior: "smooth" });
        setTimeout(() => {
          el.scrollTo({ left: 0, behavior: "smooth" });
        }, 1000);
      }, 200);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 text-gray-800">
      {/* Summary Cards with animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
  <div className="bg-blue-500 text-white rounded-lg p-4 shadow-md animate-slideInLeft">
    <p className="font-semibold text-lg">{t.total}</p>
    <p className="text-sm">{t.perMonth}</p>
    <p className="text-right text-xl font-bold">{t.currency} 209000.00</p>
  </div>
  <div className="bg-yellow-300 text-yellow-900 rounded-lg p-4 shadow-md animate-slideInLeft delay-[100ms]">
    <p className="font-semibold text-lg">{t.pending}</p>
    <p className="text-sm">{t.perMonth}</p>
    <p className="text-right text-xl font-bold">{t.currency} 20000.00</p>
  </div>
  <div className="bg-red-400 text-white rounded-lg p-4 shadow-md animate-slideInLeft delay-[200ms]">
    <p className="font-semibold text-lg">{t.defaulters}</p>
    <p className="text-sm">{t.perMonth}</p>
    <p className="text-right text-xl font-bold">{t.currency} 178000.00</p>
  </div>
</div>


      {/* Recent Payers Header */}
      <h2 className="text-green-900 text-lg font-bold mb-4">{t.recentPayers}</h2>

      {/* Desktop Table */}
      <div className="hidden md:block bg-gray-100 rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-200 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3">{t.regNo}</th>
              <th className="px-4 py-3">{t.name}</th>
              <th className="px-4 py-3">{t.company}</th>
              <th className="px-4 py-3">{t.amount}</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {payers.map((payer, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-3">{payer.regNo}</td>
                <td className="px-4 py-3">{payer.name}</td>
                <td className="px-4 py-3">{payer.company}</td>
                <td className="px-4 py-3">{payer.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {payers.map((payer, index) => (
          <div key={index} className="bg-gray-100 rounded-lg shadow p-4 text-sm">
            <p className="mb-1"><strong>{t.regNo}:</strong> {payer.regNo}</p>
            <p className="mb-1"><strong>{t.name}:</strong> {payer.name}</p>
            <p className="mb-1"><strong>{t.company}:</strong> {payer.company}</p>
            <p><strong>{t.amount}:</strong> {payer.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
