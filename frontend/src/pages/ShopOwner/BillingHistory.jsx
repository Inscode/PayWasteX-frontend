import React, { useState } from 'react';
import { FaDownload, FaFilter } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';

const billingData = [
  { id: 'INV1001', period: 'Mar 2025', due: 'LKR 1000.00', paid: 'Mar 15 2025', status: 'Unpaid' },
  { id: 'INV1002', period: 'Mar 2025', due: 'LKR 1000.00', paid: 'Mar 15 2025', status: 'Paid' },
  { id: 'INV1003', period: 'Feb 2025', due: 'LKR 1000.00', paid: 'Feb 15 2025', status: 'Paid' },
  { id: 'INV1004', period: 'Jan 2025', due: 'LKR 1000.00', paid: 'Jan 15 2025', status: 'Unpaid' },
  { id: 'INV1005', period: 'Feb 2025', due: 'LKR 1000.00', paid: 'Feb 15 2025', status: 'Paid' },
];

const labels = {
  en: {
    billingPeriod: 'Billing Period',
    status: 'Status',
    billId: 'Bill ID',
    amountDue: 'Amount Due',
    amountPaid: 'Amount Paid',
    paid: 'Paid',
    unpaid: 'Unpaid',
    download: 'Download',
    noResults: 'No results found.',
  },
  si: {
    billingPeriod: 'බිල්පත් කාලය',
    status: 'තත්ත්වය',
    billId: 'බිල් අංකය',
    amountDue: 'ගෙවිය යුතු මුදල',
    amountPaid: 'ගෙවූ මුදල',
    paid: 'ගෙවී ඇත',
    unpaid: 'නොගෙවී ඇත',
    download: 'බාගන්න',
    noResults: 'ප්‍රතිඵල නොමැත.',
  },
  ta: {
    billingPeriod: 'பில் காலம்',
    status: 'நிலைமை',
    billId: 'பில் ஐடி',
    amountDue: 'கடன் தொகை',
    amountPaid: 'செலுத்திய தொகை',
    paid: 'செலுத்தப்பட்டது',
    unpaid: 'செலுத்தப்படவில்லை',
    download: 'பதிவிறக்கவும்',
    noResults: 'முடிவுகள் எதுவும் இல்லை.',
  },
};

const BillingHistory = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const { lang } = useLanguage();
  const t = labels[lang] || labels.en;

  const billingPeriods = ['All', ...new Set(billingData.map((item) => item.period))];
  const statuses = ['All', 'Paid', 'Unpaid'];

  const filteredData = billingData.filter((bill) => {
    const matchPeriod = selectedPeriod === 'All' || bill.period === selectedPeriod;
    const matchStatus = selectedStatus === 'All' || bill.status === selectedStatus;
    return matchPeriod && matchStatus;
  });

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 text-gray-800">
      {/* Filters */}
      <div className="flex flex-col md:flex-row flex-wrap gap-4 w-full mb-6">
        {/* Billing Period Filter */}
        <div className="flex items-center justify-between bg-gray-200 px-4 py-2 rounded-md w-full md:w-[70%] shadow-sm">
          <div className="flex items-center gap-2 font-medium text-green-800">
            <FaFilter className="text-green-600" />
            <span>{t.billingPeriod}:</span>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-white rounded-md px-3 py-1 ml-2 border border-green-300 text-sm focus:outline-none"
          >
            {billingPeriods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center justify-between bg-gray-200 px-4 py-2 rounded-md w-full md:w-[28%] shadow-sm">
          <span className="font-medium text-green-800">{t.status}:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-white rounded-md px-3 py-1 ml-2 border border-green-300 text-sm focus:outline-none"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {t[status.toLowerCase()]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-gray-100 rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-[600px] w-full text-center text-sm">
          <thead className="bg-gray-200 text-gray-700 font-semibold">
            <tr>
              <th className="py-3">{t.billId}</th>
              <th>{t.billingPeriod}</th>
              <th>{t.amountDue}</th>
              <th>{t.amountPaid}</th>
              <th>{t.status}</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-800">
            {filteredData.map((bill, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-3">{bill.id}</td>
                <td>{bill.period}</td>
                <td>{bill.due}</td>
                <td>{bill.paid}</td>
                <td>
                  <span
                    className={`inline-block ${
                      bill.status === 'Paid'
                        ? 'bg-green-700 text-white'
                        : 'bg-white border border-gray-300 text-gray-600'
                    } text-xs font-semibold px-4 py-1 rounded-full`}
                  >
                    {t[bill.status.toLowerCase()]}
                  </span>
                </td>
                <td>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-xs px-4 py-1 rounded shadow inline-flex items-center gap-1">
                    {t.download} <FaDownload />
                  </button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="6" className="py-6 text-gray-500 text-center">
                  {t.noResults}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4">
        {filteredData.map((bill, idx) => (
          <div key={idx} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">{t.billId}:</span>
              <span className="font-semibold">{bill.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">{t.billingPeriod}:</span>
              <span>{bill.period}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">{t.amountDue}:</span>
              <span>{bill.due}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">{t.amountPaid}:</span>
              <span>{bill.paid}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">{t.status}:</span>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  bill.status === 'Paid'
                    ? 'bg-green-700 text-white'
                    : 'bg-white border border-gray-300 text-gray-600'
                }`}
              >
                {t[bill.status.toLowerCase()]}
              </span>
            </div>
            <div className="mt-3 text-right">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-xs px-4 py-1 rounded shadow inline-flex items-center gap-1">
                {t.download} <FaDownload />
              </button>
            </div>
          </div>
        ))}
        {filteredData.length === 0 && (
          <div className="text-center text-gray-500 mt-6">{t.noResults}</div>
        )}
      </div>
    </div>
  );
};

export default BillingHistory;
