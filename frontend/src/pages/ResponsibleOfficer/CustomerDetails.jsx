import React, { useState } from 'react';
import { HiX, HiEye, HiDownload, HiSearch, HiFilter } from 'react-icons/hi';

const CustomerDetails = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data based on your Excel sheet
  const customerData = [
    {
      id: 1,
      date: '2025.01.01',
      no: 1,
      name: 'කුමාර ක්‍රමේශ්වර',
      companyName: 'යෝධ ගෙදර කඩයේ',
      addressLine1: 'ගම්පහ ගරබැඳි ඔස්ගොඩ',
      registerNumber: 'STNWT1',
      monthlyPayment: 250,
      monthlyVat: 45,
      monthlyFullPayment: 295,
      yearlyPayment: 3000,
      yearlyVat: 540,
      yearlyFullPayment: 3540,
      billStatus: 'paid'
    },
    {
      id: 2,
      date: '2025.01.01',
      no: 2,
      name: 'සමන්ත කුමාර',
      companyName: 'ගරගේ කඩයේ',
      addressLine1: '87/24 ශ්‍රී',
      registerNumber: 'STNWT2',
      monthlyPayment: 250,
      monthlyVat: 45,
      monthlyFullPayment: 295,
      yearlyPayment: 3000,
      yearlyVat: 540,
      yearlyFullPayment: 3540,
      billStatus: 'unpaid'
    },
    {
      id: 3,
      date: '2025.01.01',
      no: 3,
      name: 'සිල් මල් සදන් සමරෝ',
      companyName: 'කොළඹ වෙළෙන්දන්ගේ',
      addressLine1: '87/24 ශ්‍රී',
      registerNumber: 'STNWT3',
      monthlyPayment: 250,
      monthlyVat: 45,
      monthlyFullPayment: 295,
      yearlyPayment: 3000,
      yearlyVat: 540,
      yearlyFullPayment: 3540,
      billStatus: 'pending'
    },
    {
      id: 4,
      date: '2025.01.01',
      no: 4,
      name: 'ප්‍රේම් වර්ණන්',
      companyName: 'ගරගේ කගමේරු',
      addressLine1: '87/24 ශ්‍රී',
      registerNumber: 'STNWT4',
      monthlyPayment: 500,
      monthlyVat: 90,
      monthlyFullPayment: 590,
      yearlyPayment: 6000,
      yearlyVat: 1080,
      yearlyFullPayment: 7080,
      billStatus: 'paid'
    },
    {
      id: 5,
      date: '2025.01.01',
      no: 5,
      name: 'නිමල් සරත්',
      companyName: 'ගම කෙන්ඩිරණි',
      addressLine1: 'ඔස්ගොඩ කුරුණේගල',
      registerNumber: 'STNWT5',
      monthlyPayment: 250,
      monthlyVat: 45,
      monthlyFullPayment: 295,
      yearlyPayment: 3000,
      yearlyVat: 540,
      yearlyFullPayment: 3540,
      billStatus: 'unpaid'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'unpaid': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid': return 'Paid';
      case 'unpaid': return 'Unpaid';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  const handleBillClick = (customer) => {
    setSelectedBill({
      billNo: `BILL-${customer.registerNumber}-${customer.id}`,
      paymentDate: customer.billStatus === 'paid' ? '2025-01-15' : null,
      paymentMethod: customer.billStatus === 'paid' ? 'Fee Collector' : 'Pending',
      amount: customer.monthlyFullPayment,
      customerName: customer.name,
      status: customer.billStatus
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBill(null);
  };

  const filteredData = customerData.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.registerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || customer.billStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Details</h1>
              <p className="text-gray-600">View and manage customer billing information</p>
            </div>
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2">
              <HiDownload className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, register number, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div className="relative">
              <HiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">No</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Company Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Register Number</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Monthly Payment</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Monthly VAT</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Monthly Full Payment</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Yearly Payment</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Yearly VAT</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Yearly Full Payment</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((customer, index) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.no}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.companyName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.addressLine1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{customer.registerNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LKR {customer.monthlyPayment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LKR {customer.monthlyVat}</td>
                    <td 
                      className={`px-6 py-4 whitespace-nowrap text-sm font-semibold cursor-pointer hover:scale-105 transition-transform ${getStatusColor(customer.billStatus)} border rounded-lg`}
                      onClick={() => handleBillClick(customer)}
                    >
                      LKR {customer.monthlyFullPayment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LKR {customer.yearlyPayment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LKR {customer.yearlyVat}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LKR {customer.yearlyFullPayment}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.billStatus)}`}>
                        {getStatusText(customer.billStatus)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No customers found</div>
              <div className="text-gray-500 text-sm">Try adjusting your search or filter criteria</div>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredData.length}</span> of <span className="font-medium">{customerData.length}</span> customers
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-3 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
              1
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Bill Details Modal */}
      {isModalOpen && selectedBill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Bill Details</h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <HiX className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Bill Number</span>
                <span className="text-sm font-mono text-gray-900">{selectedBill.billNo}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Customer Name</span>
                <span className="text-sm text-gray-900">{selectedBill.customerName}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Amount</span>
                <span className="text-sm font-bold text-emerald-600">LKR {selectedBill.amount}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Payment Method</span>
                <span className="text-sm text-gray-900">{selectedBill.paymentMethod}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Payment Date</span>
                <span className="text-sm text-gray-900">
                  {selectedBill.paymentDate || 'Not paid yet'}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Status</span>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedBill.status)}`}>
                  {getStatusText(selectedBill.status)}
                </span>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;