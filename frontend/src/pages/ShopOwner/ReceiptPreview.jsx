import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../assets/logo.png"; // adjust path to your logo

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
    pdf.save(`${bill.id}_receipt.pdf`);
  };

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Download Receipt</h2>

      <div
        id="receipt-content"
        className="bg-white shadow-lg border p-6 w-full max-w-2xl"
      >
        <div className="grid grid-cols-5 gap-4 mb-4">
          <div className="col-span-2 flex justify-center">
            <img src={logo} alt="Gov Logo" className="h-28 object-contain" />
          </div>
          <div className="col-span-3 space-y-2 text-sm">
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

        <div className="text-sm font-medium mb-2">
          Given By: <span className="font-semibold">Anuradhapura Municipal Council</span>
        </div>

        {/* Table */}
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
              <td className="border px-2 py-1 font-semibold text-right">Rs 1000.00</td>
            </tr>
          </tbody>
        </table>

        <div className="text-sm">
          <strong>Name Of Fee Collector:</strong> ____________________________
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-6 mt-6">
        <button
          onClick={handleDownload}
          className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-semibold"
        >
          Print Receipt
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReceiptPreview;
