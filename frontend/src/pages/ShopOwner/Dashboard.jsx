import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

const ShopOwnerDashboard = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-white p-4 md:p-8 text-gray-800">
      {/* Main two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 h-full">
        {/* Left Side: Latest Bill + Outstanding Amount */}
        <div className="space-y-6 md:space-y-8">
          {/* Latest Bill */}
          <div className="bg-gray-100 rounded-xl p-6 md:p-8 shadow-lg min-h-[150px]">
            <h2 className="text-lg sm:text-xl font-semibold text-green-900 mb-4">Latest Bill</h2>
            <p className="text-2xl sm:text-3xl font-bold text-green-900">February 2025</p>
            <div className="mt-6 flex flex-col sm:flex-row justify-between text-base sm:text-xl gap-4">
              <div>
                <p className="text-gray-700">Date</p>
                <p className="font-semibold">12/02/2025</p>
              </div>
              <div>
                <p className="text-gray-700">Amount</p>
                <p className="font-semibold">Rs. 1000.00</p>
              </div>
            </div>
          </div>

          {/* Outstanding Amount */}
          <div className="bg-gray-100 rounded-xl p-6 md:p-8 shadow-lg min-h-[150px] flex flex-col justify-center">
            <h2 className="text-lg sm:text-xl font-semibold text-green-900 mb-4">Outstanding Amount</h2>
            <p className="text-3xl sm:text-4xl font-bold text-green-900">Rs. 3000.00</p>
          </div>
        </div>

        {/* Right Side: Notifications */}
        <div className="space-y-6 md:space-y-8">
          {/* Payment Success */}
          <div className="bg-green-100 rounded-xl p-6 md:p-8 shadow-lg min-h-[90px]">
            <div className="flex flex-wrap items-center mb-4 text-green-800 text-base sm:text-xl font-semibold">
              <FaCheckCircle className="mr-3 text-lg sm:text-2xl" />
              Payment Success
            </div>
            <p className="text-sm sm:text-lg break-words">
              You have an outstanding payment due. Please settle it at your earliest convenience
            </p>
          </div>

          {/* Payment Pending */}
          <div className="bg-yellow-100 rounded-xl p-6 md:p-8 shadow-lg min-h-[90px]">
            <div className="flex flex-wrap items-center mb-4 text-yellow-800 text-base sm:text-xl font-semibold">
              <FaExclamationTriangle className="mr-3 text-lg sm:text-2xl" />
              Payment Pending
            </div>
            <p className="text-sm sm:text-lg break-words">
              You have an outstanding payment due. Please settle it at your earliest convenience
            </p>
          </div>

          {/* Warning */}
          <div className="bg-red-100 rounded-xl p-6 md:p-8 shadow-lg min-h-[90px]">
            <div className="flex flex-wrap items-center mb-4 text-red-800 text-base sm:text-xl font-semibold">
              <FaTimesCircle className="mr-3 text-lg sm:text-2xl" />
              Warning
            </div>
            <p className="text-sm sm:text-lg break-words">
              You have an outstanding payment due. Please settle it at your earliest convenience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopOwnerDashboard;
