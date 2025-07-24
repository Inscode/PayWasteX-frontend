import React from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ViewBillModal = ({ isOpen, onClose, billData }) => {
  if (!billData) return null;

  const {
    invoiceNo,
    billDate,
    dueDate,
    name,
    company,
    amount,
    collector,
    status,
  } = billData;

  const getStatusStyle = () => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg relative">
          {/* Red Circular Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="border-b pb-2 mb-4">
            <Dialog.Title className="text-lg font-semibold text-[#224A29] text-center w-full">
              View Payment Details
            </Dialog.Title>
          </div>

          {/* Details */}
          <div className="space-y-3 text-sm">
            {[
              ["Invoice No", invoiceNo],
              ["Bill Date", billDate],
              ["Due Date", dueDate],
              ["Company Owner", name],
              ["Premises", company],
              ["Amount", amount],
              ["Fee Collector", collector],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between border-b pb-1">
                <span className="font-medium text-[#224A29]">{label}</span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}

            {/* Status */}
            <div className="flex justify-between items-center border-b pb-1">
              <span className="font-medium text-[#224A29]">Status</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle()}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-6 flex flex-col gap-2">
            <div className="flex justify-between gap-2">
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                Update Bill
              </button>
              <button className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 text-sm">
                Re-Issue Bill
              </button>
            </div>
            <button className="w-full px-4 py-2 bg-yellow-300 text-yellow-900 rounded font-semibold text-sm hover:bg-yellow-400">
              Print Receipt / Invoice
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ViewBillModal;
