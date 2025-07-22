import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../assets/logo.png"; // update path if needed

const ReceiptPreview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bill = state?.bill;

  const handleDownload = async () => {
    const confirmed = window.confirm("Do you want to download the receipt?");
    if (!confirmed) return;

    const input = document.getElementById("receipt-content");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10);
    pdf.save(`${bill?.id}_receipt.pdf`);
  };

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center overflow-auto pb-28">
      <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-6 text-center">
        Download Receipt
      </h2>

      <div
        id="receipt-content"
        className="bg-white shadow-lg border p-4 md:p-6 w-full max-w-lg"
      >
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div className="flex justify-center md:col-span-2">
            <img src={logo} alt="Gov Logo" className="h-24 md:h-28 object-contain" />
          </div>
          <div className="space-y-2 md:col-span-3 text-sm w-full">
            <div className="flex justify-between border-b pb-1">
              <strong>Invoice No:</strong>
              <span>{bill?.id}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <strong>Bill Issue Date:</strong>
              <span>{bill?.paid}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <strong>VAT No:</strong>
              <span>--</span>
            </div>
            <div className="flex justify-between">
              <strong>Received By:</strong>
              <span>--</span>
            </div>
          </div>
        </div>

        {/* Given By */}
        <div className="text-sm font-medium mb-2">
          Given By:{" "}
          <span className="font-semibold">Anuradhapura Municipal Council</span>
        </div>

        {/* Description Table */}
        <table className="w-full border text-sm text-left mt-2 mb-4">
          <thead className="bg-gray-100 text-gray-800 font-semibold">
            <tr>
              <th className="border px-2 py-1 w-2/3">Description</th>
              <th className="border px-2 py-1 text-center">Amount Due</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-2">
                Amount due per month <br /> + VAT 18%
              </td>
              <td className="border px-2 py-2">
                <div className="flex justify-between">
                  <span>Rs</span>
                  <span>1000.00</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border px-2 py-1 font-semibold">Total</td>
              <td className="border px-2 py-1 font-semibold text-right">
                Rs 1000.00
              </td>
            </tr>
          </tbody>
        </table>

        {/* Footer Row */}
        <div className="text-sm mt-2">
          <strong>Name Of Fee Collector:</strong>{" "}
          <span className="inline-block border-b w-40 ml-2" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mt-6 w-full max-w-lg justify-center">
        <button
          onClick={handleDownload}
          className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-semibold w-full md:w-auto"
        >
          Print Receipt
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded font-semibold w-full md:w-auto"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReceiptPreview;
