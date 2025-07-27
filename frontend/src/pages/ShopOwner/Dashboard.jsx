import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const billingData = [
  { id: 'INV1001', period: 'Mar 2025', due: 'LKR 1000.00', paid: '500' },
  { id: 'INV1002', period: 'Feb 2025', due: 'LKR 1000.00', paid: '500' },
  { id: 'INV1003', period: 'Jan 2025', due: 'LKR 1000.00', paid: '500' },
  { id: 'INV1004', period: 'Dec 2024', due: 'LKR 1000.00', paid: '500' },
  { id: 'INV1005', period: 'Nov 2024', due: 'LKR 1000.00', paid: '500' },
];

const ShopOwnerDashboard = () => {
  const { lang } = useLanguage();

  const labels = {
    en: {
      latestBill: "Latest Bill",
      recentBillingPayment: "Recent Billing Payment",
      month: "February 2025",
      date: "Date",
      paidDate: "12/02/2025",
      amount: "Amount",
      paidAmount: "Rs. 1000.00",
      outstandingAmountTitle: "Outstanding Amount",
      outstandingAmount: "Rs. 3000.00",
      billId: "Bill ID",
      billingPeriod: "Billing Period",
      amountDue: "Amount Due",
      amountPaid: "Amount Paid"
    },
    si: {
      latestBill: "නවතම බිල්පත",
      recentBillingPayment: "නවතම බිල්පත් ගෙවීම්",
      month: "පෙබරවාරි 2025",
      date: "දිනය",
      paidDate: "2025/02/12",
      amount: "මුදල",
      paidAmount: "රු. 1000.00",
      outstandingAmountTitle: "ඉතිරි මුදල",
      outstandingAmount: "රු. 3000.00",
      billId: "බිල් අංකය",
      billingPeriod: "බිල්පත් කාලය",
      amountDue: "ගෙවිය යුතු මුදල",
      amountPaid: "ගෙවූ මුදල"
    },
    ta: {
      latestBill: "சமீபத்திய பில்",
      recentBillingPayment: "சமீபத்திய கட்டண விவரங்கள்",
      month: "பிப்ரவரி 2025",
      date: "தேதி",
      paidDate: "12/02/2025",
      amount: "தொகை",
      paidAmount: "ரூ. 1000.00",
      outstandingAmountTitle: "நிலுவை தொகை",
      outstandingAmount: "ரூ. 3000.00",
      billId: "பில் ஐடி",
      billingPeriod: "பில் காலம்",
      amountDue: "கடன் தொகை",
      amountPaid: "செலுத்திய தொகை"
    }
  };

  const t = labels[lang] || labels.en;

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 md:p-8 overflow-auto pb-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left Column */}
        <div className="space-y-6">
          {/* Latest Bill */}
          <div className="bg-gray-100 rounded-xl shadow p-6">
            <h2 className="text-green-900 font-semibold text-lg mb-2">{t.latestBill}</h2>
            <p className="text-2xl font-bold text-green-900">{t.month}</p>
            <hr className="my-4 border-gray-300" />
            <div className="flex justify-between text-sm md:text-base">
              <div>
                <p className="text-gray-600">{t.date}</p>
                <p className="font-semibold">{t.paidDate}</p>
              </div>
              <div>
                <p className="text-gray-600">{t.amount}</p>
                <p className="font-semibold">{t.paidAmount}</p>
              </div>
            </div>
          </div>

          {/* Outstanding Amount */}
          <div className="bg-gray-100 rounded-xl shadow p-6">
            <h2 className="text-green-900 font-semibold text-lg mb-2">{t.outstandingAmountTitle}</h2>
            <p className="text-3xl font-bold text-green-900">{t.outstandingAmount}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-gray-100 rounded-xl shadow p-6">
          <h2 className="text-green-900 font-semibold text-lg mb-4">{t.recentBillingPayment}</h2>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm border-separate border-spacing-y-2">
              <thead>
                <tr className="text-gray-700 font-semibold">
                  <th>{t.billId}</th>
                  <th>{t.billingPeriod}</th>
                  <th>{t.amountDue}</th>
                  <th>{t.amountPaid}</th>
                </tr>
              </thead>
              <tbody>
                {billingData.map((bill, index) => (
                  <tr key={index} className="bg-white rounded-lg shadow">
                    <td className="py-2 px-3">{bill.id}</td>
                    <td>{bill.period}</td>
                    <td>{bill.due}</td>
                    <td>{bill.paid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="block md:hidden space-y-4 mt-4">
            {billingData.map((bill, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4 text-sm">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-600">{t.billId}:</span>
                  <span className="font-semibold">{bill.id}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-600">{t.billingPeriod}:</span>
                  <span>{bill.period}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-600">{t.amountDue}:</span>
                  <span>{bill.due}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">{t.amountPaid}:</span>
                  <span>{bill.paid}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShopOwnerDashboard;
