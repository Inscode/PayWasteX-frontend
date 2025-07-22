import React, { useState } from "react";

const zones = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4"];

const sampleCards = Array(8).fill({
  id: "ST1NWT2",
  name: "Mahesh Kumara",
  company: "Rajarata Oil",
  due: 2300.0,
});

export default function FeeCollectorDashboard() {
  const [selectedZone, setSelectedZone] = useState("A1");
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [editedAmount, setEditedAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const totalAmount = sampleCards.reduce((sum, card) => sum + card.due, 0);

  const handlePayClick = (amount) => {
    setSelectedAmount(amount);
    setEditedAmount(amount.toFixed(2));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAmount(null);
    setEditedAmount("");
    setSuccessMessage("Paid amount successfully added");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleSubmitCollection = () => {
  setSuccessMessage("Successfully added the collection");
  setTimeout(() => setSuccessMessage(""), 3000);
};


  return (
    <div className="min-h-screen bg-white px-4 md:px-8 py-6 relative">
      {/* Zone Filter */}
      <div className="flex flex-wrap justify-start gap-1 mb-6">
        {zones.map((zone) => (
          <button
            key={zone}
            onClick={() => setSelectedZone(zone)}
            className={`px-3 py-1 text-sm font-semibold rounded ${
              selectedZone === zone
                ? "bg-green-700 text-white"
                : "bg-green-100 text-green-800"
            }`}
          >
            {zone}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sampleCards.map((card, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg shadow-sm p-4 border border-gray-300 flex flex-col gap-2"
          >
            <h2 className="text-sm font-bold text-gray-800 text-center">{card.id}</h2>
            <div className="text-sm text-gray-800 space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold">Name</span>
                <span>{card.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Company Name</span>
                <span>{card.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Outstanding Due</span>
                <span>LKR {card.due.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="mt-2 bg-green-700 hover:bg-green-800 text-white px-6 py-1 rounded text-sm font-semibold w-3/4 self-center"
              onClick={() => handlePayClick(card.due)}
            >
              Pay
            </button>
          </div>
        ))}
      </div>

      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="text-xl font-semibold text-gray-700 text-center md:text-left">
          Total Amount Collected
        </div>
        <div className="bg-white border border-gray-300 rounded px-4 py-2 text-center font-semibold text-green-800">
          LKR {totalAmount.toFixed(2)}
        </div>
        <div className="text-center md:text-right">
          <button
            onClick={handleSubmitCollection}
            className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded w-4/4"
          >
          Submit Collection
          </button>
        </div>
      </div>

      
      {/* {successMessage && (
        <div className="mt-6 text-center text-yellow-700 font-semibold">
          {successMessage}
        </div>
      )} */}

      {successMessage && (
      <div className="fixed top-15 right-4 z-50">
      <div className=" text-yellow-600 px-4 py-2  font-semibold">
      {successMessage}
      </div>
    </div>
    )}


      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="relative bg-white rounded shadow-lg p-6 w-80 text-center">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800">Paid Amount</h2>
            <input
              type="number"
              value={editedAmount}
              onChange={(e) => setEditedAmount(e.target.value)}
              className="text-center text-lg text-gray-700 border border-gray-300 rounded px-4 py-2 mb-6 w-full"
            />
            <button
              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded"
              onClick={closeModal}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
