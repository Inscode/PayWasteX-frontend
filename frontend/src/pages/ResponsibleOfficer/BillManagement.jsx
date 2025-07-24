import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const labels = {
  en: {
    total: "Total Bill",
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
  si: {
    total: "මුළු බිල්පත්",
    pending: "ගෙවිය යුතු බිල්පත්",
    overdue: "කල් ගිය බිල්පත්",
    filtered: "පෙරහන් කිරීම: ඉන්වොයිස් අංකය, මුදල",
    issue: "නව බිල්පතක් නිකුත් කරන්න",
    invoiceNo: "ඉන්වොයිස් අංකය",
    regNo: "ලියාපදිංචි අංකය",
    name: "නම",
    company: "සමාගම",
    time: "කාල පරිදිය",
    amount: "මුදල",
    action: "ක්‍රියාව",
    edit: "සංස්කරණය",
    view: "බලන්න",
    paid: "ගෙවා ඇත",
    pendingStatus: "ගෙවිය යුතුය",
    overdueStatus: "කල් ගිය",
  },
  ta: {
    total: "மொத்த விலைப்பட்டியல்",
    pending: "நிலுவை கட்டணம்",
    overdue: "கடந்த கால பில்ல்கள்",
    filtered: "வடிகட்டப்பட்டுள்ளது: விலை எண், தொகை",
    issue: "புதிய விலை பட்டியலை வெளியிடவும்",
    invoiceNo: "விலைப்பட்டியல் எண்",
    regNo: "பதிவு எண்",
    name: "பெயர்",
    company: "நிறுவனம்",
    time: "நேர அளவு",
    amount: "தொகை",
    action: "செயல்",
    edit: "திருத்து",
    view: "காண்க",
    paid: "செலுத்தப்பட்டது",
    pendingStatus: "நிலுவையில்",
    overdueStatus: "கடந்த காலம்",
  },
};

const dummyData = [
  {
    invoiceNo: "INV1001",
    regNo: "ST1NWT1",
    name: "M S D Priyantha",
    company: "Railway Tourist Bungalow",
    time: "12/04/2025 - 20/04/2025",
    status: "pending",
    zone: "A1",
  },
  {
    invoiceNo: "INV1001",
    regNo: "ST1NWT1",
    name: "M S D Priyantha",
    company: "Railway Tourist Bungalow",
    time: "12/04/2025 - 20/04/2025",
    status: "pending",
    zone: "A1",
  },
  {
    invoiceNo: "INV1001",
    regNo: "ST1NWT1",
    name: "M S D Priyantha",
    company: "Railway Tourist Bungalow",
    time: "12/04/2025 - 20/04/2025",
    status: "pending",
    zone: "A1",
  },
  {
    invoiceNo: "INV1001",
    regNo: "ST1NWT1",
    name: "M S D Priyantha",
    company: "Railway Tourist Bungalow",
    time: "12/04/2025 - 20/04/2025",
    status: "pending",
    zone: "A1",
  },
  {
    invoiceNo: "INV1002",
    regNo: "ST1NWT1",
    name: "Mahesh Kumara",
    company: "Rajarata Oil",
    time: "12/04/2025 - 20/04/2025",
    status: "paid",
    zone: "A1",
  },
  {
    invoiceNo: "INV1003",
    regNo: "ST1NWT1",
    name: "M S S M Hashan",
    company: "Kings’ Communication",
    time: "12/04/2025 - 20/04/2025",
    status: "overdue",
    zone: "A2",
  },
  {
    invoiceNo: "INV1004",
    regNo: "ST1NWT1",
    name: "A A Rasik",
    company: "Star Grocery",
    time: "12/04/2025 - 20/04/2025",
    status: "pending",
    zone: "A2",
  },
  {
    invoiceNo: "INV1005",
    regNo: "ST1NWT1",
    name: "Sisira Nirmal",
    company: "Horana Wasana Bakery",
    time: "12/04/2025 - 20/04/2025",
    status: "paid",
    zone: "B1",
  },
  {
    invoiceNo: "INV1006",
    regNo: "ST1NWT1",
    name: "Tharindu Silva",
    company: "Ocean View",
    time: "10/04/2025 - 17/04/2025",
    status: "pending",
    zone: "B1",
  },
  {
    invoiceNo: "INV1007",
    regNo: "ST1NWT1",
    name: "Dinesh Perera",
    company: "Digital Tech",
    time: "08/04/2025 - 15/04/2025",
    status: "overdue",
    zone: "B2",
  },
   {
    invoiceNo: "INV1007",
    regNo: "ST1NWT1",
    name: "Dinesh Perera",
    company: "Digital Tech",
    time: "08/04/2025 - 15/04/2025",
    status: "overdue",
    zone: "B2",
  },
   {
    invoiceNo: "INV1007",
    regNo: "ST1NWT1",
    name: "Dinesh Perera",
    company: "Digital Tech",
    time: "08/04/2025 - 15/04/2025",
    status: "overdue",
    zone: "B2",
  },
   {
    invoiceNo: "INV1007",
    regNo: "ST1NWT1",
    name: "Dinesh Perera",
    company: "Digital Tech",
    time: "08/04/2025 - 15/04/2025",
    status: "overdue",
    zone: "B2",
  },
   {
    invoiceNo: "INV1007",
    regNo: "ST1NWT1",
    name: "Dinesh Perera",
    company: "Digital Tech",
    time: "08/04/2025 - 15/04/2025",
    status: "overdue",
    zone: "B2",
  },
   {
    invoiceNo: "INV1007",
    regNo: "ST1NWT1",
    name: "Dinesh Perera",
    company: "Digital Tech",
    time: "08/04/2025 - 15/04/2025",
    status: "overdue",
    zone: "B2",
  },
   {
    invoiceNo: "INV1007",
    regNo: "ST1NWT1",
    name: "Dinesh Perera",
    company: "Digital Tech",
    time: "08/04/2025 - 15/04/2025",
    status: "overdue",
    zone: "B2",
  },
   {
    invoiceNo: "INV1007",
    regNo: "ST1NWT1",
    name: "Dinesh Perera",
    company: "Digital Tech",
    time: "08/04/2025 - 15/04/2025",
    status: "overdue",
    zone: "B2",
  },
   {
    invoiceNo: "INV1007",
    regNo: "ST1NWT1",
    name: "Dinesh Perera",
    company: "Digital Tech",
    time: "08/04/2025 - 15/04/2025",
    status: "overdue",
    zone: "B2",
  },
   {
    invoiceNo: "INV1007",
    regNo: "ST1NWT1",
    name: "Dinesh Perera",
    company: "Digital Tech",
    time: "08/04/2025 - 15/04/2025",
    status: "overdue",
    zone: "B2",
  },
  
];

const zones = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4"];

const BillManagement = () => {
  const { lang } = useLanguage();
  const t = labels[lang] || labels.en;

  const [selectedZone, setSelectedZone] = useState("A1");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;

  const filteredData = dummyData.filter((d) => d.zone === selectedZone);
  const totalPages = Math.ceil(filteredData.length / perPage);
  const paginatedData = filteredData.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-white text-gray-800">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-600 text-white rounded-lg p-4 text-center shadow">
          <p className="text-2xl font-bold">{dummyData.length}</p>
          <p>{t.total}</p>
        </div>
        <div className="bg-yellow-400 text-yellow-900 rounded-lg p-4 text-center shadow">
          <p className="text-2xl font-bold">{dummyData.filter(d => d.status === "pending").length}</p>
          <p>{t.pending}</p>
        </div>
        <div className="bg-red-500 text-white rounded-lg p-4 text-center shadow">
          <p className="text-2xl font-bold">{dummyData.filter(d => d.status === "overdue").length}</p>
          <p>{t.overdue}</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {zones.map((zone) => (
          <button
            key={zone}
            onClick={() => {
              setSelectedZone(zone);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded text-sm font-medium shadow-sm border
              ${selectedZone === zone
                ? "bg-green-700 text-white"
                : "bg-green-100 text-green-800"
              }`}
          >
            {zone}
          </button>
        ))}
      </div>

      {/* Table for Desktop */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow bg-gray-100">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-200 text-gray-700 font-semibold">
            <tr>
              <th className="px-3 py-2">{t.invoiceNo}</th>
              <th className="px-3 py-2">{t.regNo}</th>
              <th className="px-3 py-2">{t.name}</th>
              <th className="px-3 py-2">{t.company}</th>
              <th className="px-3 py-2">{t.time}</th>
              <th className="px-3 py-2">{t.amount}</th>
              <th className="px-3 py-2">{t.action}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, idx) => (
              <tr key={idx} className="border-t bg-white">
                <td className="px-3 py-2">{item.invoiceNo}</td>
                <td className="px-3 py-2">{item.regNo}</td>
                <td className="px-3 py-2">{item.name}</td>
                <td className="px-3 py-2">{item.company}</td>
                <td className="px-3 py-2">{item.time}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${item.status === "paid" && "bg-green-200 text-green-900"}
                    ${item.status === "pending" && "bg-yellow-200 text-yellow-900"}
                    ${item.status === "overdue" && "bg-red-300 text-red-900"}`}>
                    {item.status === "paid" ? t.paid : item.status === "pending" ? t.pendingStatus : t.overdueStatus}
                  </span>
                </td>
                <td className="px-3 py-2 space-x-2">
                  <button className="text-blue-600 hover:underline">{t.edit}</button>
                  <button className="text-green-700 hover:underline">{t.view}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {paginatedData.map((item, idx) => (
          <div key={idx} className="bg-gray-100 rounded-lg p-4 shadow space-y-2 text-sm">
            <p><strong>{t.invoiceNo}:</strong> {item.invoiceNo}</p>
            <p><strong>{t.regNo}:</strong> {item.regNo}</p>
            <p><strong>{t.name}:</strong> {item.name}</p>
            <p><strong>{t.company}:</strong> {item.company}</p>
            <p><strong>{t.time}:</strong> {item.time}</p>
            <p>
              <strong>{t.amount}:</strong>{" "}
              <span className={`px-2 py-1 rounded-full text-xs font-medium
                ${item.status === "paid" && "bg-green-200 text-green-900"}
                ${item.status === "pending" && "bg-yellow-200 text-yellow-900"}
                ${item.status === "overdue" && "bg-red-300 text-red-900"}`}>
                {item.status === "paid" ? t.paid : item.status === "pending" ? t.pendingStatus : t.overdueStatus}
              </span>
            </p>
            <div className="flex gap-4 pt-2">
              <button className="text-blue-600 hover:underline">{t.edit}</button>
              <button className="text-green-700 hover:underline">{t.view}</button>
            </div>
          </div>
        ))}
      </div>

     {/* Pagination */}
{totalPages > 1 && (
  <div className="flex justify-center mt-6 gap-2">
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`w-10 h-10 rounded-md font-semibold transition
          ${currentPage === i + 1
            ? "bg-green-700 text-white"
            : "bg-green-100 text-green-900 hover:bg-green-200"}`}
      >
        {i + 1}
      </button>
    ))}

    {/* Next Arrow Button */}
    {currentPage < totalPages && (
      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="w-10 h-10 rounded-md font-semibold bg-green-100 text-green-900 hover:bg-green-200"
      >
        &gt;
      </button>
    )}
  </div>
)}

    </div>
  );
};

export default BillManagement;
