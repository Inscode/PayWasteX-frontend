import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';

const ShopOwnerDashboard = () => {
  const { lang } = useLanguage();

  const labels = {
    en: {
      latestBill: "Latest Bill",
      month: "February 2025",
      date: "Date",
      paidDate: "12/02/2025",
      amount: "Amount",
      paidAmount: "Rs. 1000.00",
      outstandingAmountTitle: "Outstanding Amount",
      outstandingAmount: "Rs. 3000.00",
      paymentSuccess: "Payment Success",
      paymentPending: "Payment Pending",
      warning: "Warning",
      message: "You have an outstanding payment due. Please settle it at your earliest convenience."
    },
    si: {
      latestBill: "නවතම බිල්පත",
      month: "පෙබරවාරි 2025",
      date: "දිනය",
      paidDate: "2025/02/12",
      amount: "මුදල",
      paidAmount: "රු. 1000.00",
      outstandingAmountTitle: "ඉතිරි මුදල",
      outstandingAmount: "රු. 3000.00",
      paymentSuccess: "ගෙවීම සාර්ථකයි",
      paymentPending: "ගෙවීම බලාපොරොත්තුයි",
      warning: "අවවාදයයි",
      message: "ඔබට ගෙවිය යුතු මුදලක් ඇත. කරුණාකර ඉක්මනින් ගෙවන්න."
    },
    ta: {
      latestBill: "சமீபத்திய பில்",
      month: "பிப்ரவரி 2025",
      date: "தேதி",
      paidDate: "12/02/2025",
      amount: "தொகை",
      paidAmount: "ரூ. 1000.00",
      outstandingAmountTitle: "நிலுவை தொகை",
      outstandingAmount: "ரூ. 3000.00",
      paymentSuccess: "கட்டணம் வெற்றி",
      paymentPending: "கட்டணம் நிலுவையில்",
      warning: "எச்சரிக்கை",
      message: "நீங்கள் செலுத்த வேண்டிய கட்டணம் உள்ளது. தயவுசெய்து விரைவில் செலுத்தவும்."
    }
  };

  const t = labels[lang] || labels.en;

  return (
    <div className="min-h-screen overflow-hidden bg-white p-4 md:p-8 text-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 h-full">
        {/* Left Side: Latest Bill + Outstanding Amount */}
        <div className="space-y-6 md:space-y-8">
          <div className="bg-gray-100 rounded-xl p-6 md:p-8 shadow-lg min-h-[150px]">
            <h2 className="text-lg sm:text-xl font-semibold text-green-900 mb-4">{t.latestBill}</h2>
            <p className="text-2xl sm:text-3xl font-bold text-green-900">{t.month}</p>
            <div className="mt-6 flex flex-col sm:flex-row justify-between text-base sm:text-xl gap-4">
              <div>
                <p className="text-gray-700">{t.date}</p>
                <p className="font-semibold">{t.paidDate}</p>
              </div>
              <div>
                <p className="text-gray-700">{t.amount}</p>
                <p className="font-semibold">{t.paidAmount}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 md:p-8 shadow-lg min-h-[150px] flex flex-col justify-center">
            <h2 className="text-lg sm:text-xl font-semibold text-green-900 mb-4">{t.outstandingAmountTitle}</h2>
            <p className="text-3xl sm:text-4xl font-bold text-green-900">{t.outstandingAmount}</p>
          </div>
        </div>

        {/* Right Side: Notifications */}
        <div className="space-y-6 md:space-y-8">
          <div className="bg-green-100 rounded-xl p-6 md:p-8 shadow-lg min-h-[90px]">
            <div className="flex flex-wrap items-center mb-4 text-green-800 text-base sm:text-xl font-semibold">
              <FaCheckCircle className="mr-3 text-lg sm:text-2xl" />
              {t.paymentSuccess}
            </div>
            <p className="text-sm sm:text-lg break-words">{t.message}</p>
          </div>

          <div className="bg-yellow-100 rounded-xl p-6 md:p-8 shadow-lg min-h-[90px]">
            <div className="flex flex-wrap items-center mb-4 text-yellow-800 text-base sm:text-xl font-semibold">
              <FaExclamationTriangle className="mr-3 text-lg sm:text-2xl" />
              {t.paymentPending}
            </div>
            <p className="text-sm sm:text-lg break-words">{t.message}</p>
          </div>

          <div className="bg-red-100 rounded-xl p-6 md:p-8 shadow-lg min-h-[90px]">
            <div className="flex flex-wrap items-center mb-4 text-red-800 text-base sm:text-xl font-semibold">
              <FaTimesCircle className="mr-3 text-lg sm:text-2xl" />
              {t.warning}
            </div>
            <p className="text-sm sm:text-lg break-words">{t.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopOwnerDashboard;
