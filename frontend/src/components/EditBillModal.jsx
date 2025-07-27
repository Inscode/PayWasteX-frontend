import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const EditBillModal = ({ isOpen, onClose, billData, onSave }) => {
  const [formData, setFormData] = useState({
    invoiceNo: "",
    billDate: "",
    dueDate: "",
    owner: "",
    company: "",
    amount: "",
    collector: "",
    status: "pending",
  });

  useEffect(() => {
    if (billData) {
      setFormData({
        invoiceNo: billData.invoiceNo || "",
        billDate: billData.billDate || "",
        dueDate: billData.dueDate || "",
        owner: billData.name || "",
        company: billData.company || "",
        amount: billData.amount || "",
        collector: billData.collector || "",
        status: billData.status || "pending",
      });
    }
  }, [billData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...billData,
      invoiceNo: formData.invoiceNo,
      billDate: formData.billDate,
      dueDate: formData.dueDate,
      name: formData.owner,
      company: formData.company,
      amount: formData.amount,
      collector: formData.collector,
      status: formData.status,
    };
    onSave(updated);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative w-full max-w-md rounded-md bg-white p-6 shadow-lg">
          {/* Close Button Absolute */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>

          {/* Title */}
         <Dialog.Title className="text-lg font-bold text-center text-[#224A29] mb-4">
  Edit Payment Details
</Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-3">
            {[
              ["Invoice No", "invoiceNo"],
              ["Bill Date", "billDate", "date"],
              ["Due Date", "dueDate", "date"],
              ["Company Owner", "owner"],
              ["Premises", "company"],
              ["Amount", "amount"],
              ["Fee Collector", "collector"],
            ].map(([label, name, type = "text"]) => (
              <div key={name} className="flex flex-col">
                <label className="text-sm font-semibold text-[#224A29] mb-1">
{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100"
                  required
                />
              </div>
            ))}

            {/* Status */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-800 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100 ${
                  formData.status === "overdue" ? "text-red-600 font-semibold" : ""
                }`}
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            {/* Save Button Centered */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded hover:bg-green-700"
              >
                Save Bill
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditBillModal;
