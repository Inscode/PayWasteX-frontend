import React from 'react';
import { FaDownload, FaChevronDown, FaFilter } from 'react-icons/fa';

const billingData = [
  { id: 'INV1001', period: 'Mar 2025', due: 'LKR 1000.00', paid: 'Mar 15 2025', status: 'Unpaid' },
  { id: 'INV1002', period: 'Mar 2025', due: 'LKR 1000.00', paid: 'Mar 15 2025', status: 'Paid' },
  { id: 'INV1003', period: 'Mar 2025', due: 'LKR 1000.00', paid: 'Mar 15 2025', status: 'Paid' },
  { id: 'INV1004', period: 'Mar 2025', due: 'LKR 1000.00', paid: 'Mar 15 2025', status: 'Unpaid' },
  { id: 'INV1005', period: 'Mar 2025', due: 'LKR 1000.00', paid: 'Mar 15 2025', status: 'Paid' },
];

const BillingHistory = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-white p-6 text-gray-800">
      {/* Filters aligned full-width */}
      <div className="flex flex-wrap gap-4 w-full mb-6">
        {/* Billing Period Filter */}
        <div className="flex items-center justify-between bg-gray-200 text-green-700 px-4 py-2 rounded-md w-full md:w-[70%] shadow-sm">
          <div className="flex items-center gap-2 font-medium">
            <FaFilter className="text-green-600" />
            <span>Filtered By :</span>
            <span className="text-green-800 font-semibold">Billing Period</span>
          </div>
          <FaChevronDown className="text-green-600" />
        </div>

        {/* Status Filter */}
        <div className="flex items-center justify-between bg-gray-200 text-green-700 px-4 py-2 rounded-md w-full md:w-[28%] shadow-sm">
          <span className="font-medium">Status</span>
          <FaChevronDown className="text-green-600" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-center">
          <thead className="bg-gray-200 text-gray-700 text-sm font-semibold">
            <tr>
              <th className="py-3">Bill ID</th>
              <th>Billing Period</th>
              <th>Amount Due</th>
              <th>Amount Paid</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm bg-white">
            {billingData.map((bill, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-3">{bill.id}</td>
                <td>{bill.period}</td>
                <td>{bill.due}</td>
                <td>{bill.paid}</td>
                <td>
                  {bill.status === 'Paid' ? (
                    <span className="inline-block bg-green-700 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      Paid
                    </span>
                  ) : (
                    <span className="inline-block bg-white border border-gray-300 text-xs text-gray-600 font-semibold px-4 py-1 rounded-full">
                      Unpaid
                    </span>
                  )}
                </td>
                <td>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-xs px-4 py-1 rounded shadow inline-flex items-center gap-1">
                    Download <FaDownload />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-2">
        <button className="bg-green-700 text-white w-8 h-8 rounded">1</button>
        <button className="bg-green-200 text-green-900 w-8 h-8 rounded">2</button>
        <button className="bg-green-200 text-green-900 w-8 h-8 rounded">3</button>
        <button className="bg-green-200 text-green-900 w-8 h-8 rounded">4</button>
        <button className="bg-green-200 text-green-900 w-8 h-8 rounded">&gt;</button>
      </div>
    </div>
  );
};

export default BillingHistory;
