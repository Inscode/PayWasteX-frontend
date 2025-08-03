import React, { useState } from 'react';
import { CreditCard, TrendingUp, Calendar, DollarSign, Receipt, Clock, CheckCircle, AlertCircle, ArrowLeft, Search, Filter, Download, Eye } from 'lucide-react';

const ShopOwnerDashboard = () => {
  const [lang] = useState('en');
  const [showAllBilling, setShowAllBilling] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Extended billing data for complete history
  const allBillingData = [
    { id: 'INV1001', period: 'Mar 2025', due: 'LKR 1000.00', paid: '500', status: 'partial', dueDate: '15/03/2025', paidDate: '10/03/2025' },
    { id: 'INV1002', period: 'Feb 2025', due: 'LKR 1000.00', paid: '1000', status: 'paid', dueDate: '15/02/2025', paidDate: '12/02/2025' },
    { id: 'INV1003', period: 'Jan 2025', due: 'LKR 1000.00', paid: '500', status: 'partial', dueDate: '15/01/2025', paidDate: '20/01/2025' },
    { id: 'INV1004', period: 'Dec 2024', due: 'LKR 1000.00', paid: '1000', status: 'paid', dueDate: '15/12/2024', paidDate: '14/12/2024' },
    { id: 'INV1005', period: 'Nov 2024', due: 'LKR 1000.00', paid: '500', status: 'partial', dueDate: '15/11/2024', paidDate: '18/11/2024' },
    { id: 'INV1006', period: 'Oct 2024', due: 'LKR 1000.00', paid: '1000', status: 'paid', dueDate: '15/10/2024', paidDate: '13/10/2024' },
    { id: 'INV1007', period: 'Sep 2024', due: 'LKR 1000.00', paid: '750', status: 'partial', dueDate: '15/09/2024', paidDate: '16/09/2024' },
    { id: 'INV1008', period: 'Aug 2024', due: 'LKR 1000.00', paid: '1000', status: 'paid', dueDate: '15/08/2024', paidDate: '14/08/2024' },
    { id: 'INV1009', period: 'Jul 2024', due: 'LKR 1000.00', paid: '600', status: 'partial', dueDate: '15/07/2024', paidDate: '18/07/2024' },
    { id: 'INV1010', period: 'Jun 2024', due: 'LKR 1000.00', paid: '1000', status: 'paid', dueDate: '15/06/2024', paidDate: '12/06/2024' },
    { id: 'INV1011', period: 'May 2024', due: 'LKR 1000.00', paid: '800', status: 'partial', dueDate: '15/05/2024', paidDate: '20/05/2024' },
    { id: 'INV1012', period: 'Apr 2024', due: 'LKR 1000.00', paid: '1000', status: 'paid', dueDate: '15/04/2024', paidDate: '13/04/2024' }
  ];

  const recentBillingData = allBillingData.slice(0, 5);

  const labels = {
    en: {
      latestBill: "Latest Bill",
      recentBillingPayment: "Recent Billing History",
      month: "March 2025",
      date: "Due Date",
      paidDate: "15/03/2025",
      amount: "Amount",
      paidAmount: "Rs. 500.00",
      outstandingAmountTitle: "Outstanding Balance",
      outstandingAmount: "Rs. 3,000.00",
      billId: "Invoice ID",
      billingPeriod: "Period",
      amountDue: "Amount Due",
      amountPaid: "Paid",
      totalRevenue: "Total Revenue",
      monthlyGrowth: "Monthly Growth",
      paymentStatus: "Payment Status"
    }
  };

  const t = labels[lang] || labels.en;

  const getStatusIcon = (status) => {
    if (status === 'paid') {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <AlertCircle className="w-4 h-4 text-amber-500" />;
  };

  const getStatusBadge = (status) => {
    if (status === 'paid') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Paid
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
        Partial
      </span>
    );
  };

  const filteredBillingData = allBillingData.filter(bill => {
    const matchesSearch = bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.period.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bill.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Complete Billing History View
  if (showAllBilling) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button 
                  onClick={() => setShowAllBilling(false)}
                  className="mr-4 p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-md"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Complete Billing History
                  </h1>
                  <p className="text-slate-600 mt-1">View all your billing records and payment history</p>
                </div>
              </div>
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Bills</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{allBillingData.length}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Paid Bills</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {allBillingData.filter(b => b.status === 'paid').length}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Partial Payments</p>
                  <p className="text-2xl font-bold text-amber-600 mt-1">
                    {allBillingData.filter(b => b.status === 'partial').length}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Paid</p>
                  <p className="text-2xl font-bold text-indigo-600 mt-1">
                    Rs. {allBillingData.reduce((sum, bill) => sum + parseInt(bill.paid), 0).toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by Invoice ID or Period..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="partial">Partial</option>
                </select>
                
                <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Complete Billing Table */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">All Billing Records</h2>
                <div className="text-sm text-slate-500">
                  {filteredBillingData.length} of {allBillingData.length} records
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Invoice ID</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Period</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Due Date</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Amount Due</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Amount Paid</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Paid Date</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Status</th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBillingData.map((bill, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors duration-150">
                      <td className="py-4 px-6">
                        <span className="font-medium text-slate-900">{bill.id}</span>
                      </td>
                      <td className="py-4 px-6 text-slate-600 font-medium">{bill.period}</td>
                      <td className="py-4 px-6 text-slate-600">{bill.dueDate}</td>
                      <td className="py-4 px-6 font-medium text-slate-900">{bill.due}</td>
                      <td className="py-4 px-6 text-green-600 font-medium">Rs. {bill.paid}</td>
                      <td className="py-4 px-6 text-slate-600">{bill.paidDate}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(bill.status)}
                          {getStatusBadge(bill.status)}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex justify-center gap-2">
                          <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredBillingData.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Records Found</h3>
                  <p className="text-gray-600">No billing records match your search criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-slate-600 mt-1">Manage your billing and payments</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span>Last updated: 2 mins ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">{t.totalRevenue}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">Rs. 8,500</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-green-600 font-medium">+12.5%</span>
              <span className="text-slate-600 ml-1">from last month</span>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">{t.outstandingAmountTitle}</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{t.outstandingAmount}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm text-slate-600">
              <span>3 pending payments</span>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">{t.latestBill}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{t.month}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-slate-600">Due: {t.paidDate}</span>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Last Payment</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{t.paidAmount}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm text-slate-600">
              <span>Paid on Feb 12, 2025</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Latest Bill Details */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg mr-3">
                  <Receipt className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">{t.latestBill}</h2>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-indigo-900 mb-2">{t.month}</h3>
                  <p className="text-indigo-600">Invoice #INV1001</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-600">{t.date}</span>
                  <span className="font-semibold text-slate-900">{t.paidDate}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-600">{t.amount}</span>
                  <span className="font-semibold text-slate-900">{t.paidAmount}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-slate-600">Status</span>
                  {getStatusBadge('partial')}
                </div>
              </div>

              <button className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-3 px-4 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                View Details
              </button>
            </div>
          </div>

          {/* Recent Billing History */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mr-3">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900">{t.recentBillingPayment}</h2>
                </div>
                <button 
                  onClick={() => setShowAllBilling(true)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl"
                >
                  View All
                </button>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-4 px-2 text-sm font-semibold text-slate-600">{t.billId}</th>
                        <th className="text-left py-4 px-2 text-sm font-semibold text-slate-600">{t.billingPeriod}</th>
                        <th className="text-left py-4 px-2 text-sm font-semibold text-slate-600">{t.amountDue}</th>
                        <th className="text-left py-4 px-2 text-sm font-semibold text-slate-600">{t.amountPaid}</th>
                        <th className="text-left py-4 px-2 text-sm font-semibold text-slate-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recentBillingData.map((bill, index) => (
                        <tr key={index} className="hover:bg-slate-50/50 transition-colors duration-150">
                          <td className="py-4 px-2">
                            <span className="font-medium text-slate-900">{bill.id}</span>
                          </td>
                          <td className="py-4 px-2 text-slate-600">{bill.period}</td>
                          <td className="py-4 px-2 font-medium text-slate-900">{bill.due}</td>
                          <td className="py-4 px-2 text-green-600 font-medium">Rs. {bill.paid}</td>
                          <td className="py-4 px-2">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(bill.status)}
                              {getStatusBadge(bill.status)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="block md:hidden space-y-4">
                {recentBillingData.map((bill, index) => (
                  <div key={index} className="bg-gradient-to-r from-white to-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="font-semibold text-slate-900">{bill.id}</span>
                        <p className="text-sm text-slate-600 mt-1">{bill.period}</p>
                      </div>
                      {getStatusBadge(bill.status)}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Due:</span>
                        <p className="font-medium text-slate-900">{bill.due}</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Paid:</span>
                        <p className="font-medium text-green-600">Rs. {bill.paid}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopOwnerDashboard;