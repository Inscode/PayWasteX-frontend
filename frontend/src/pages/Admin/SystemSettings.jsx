import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const notificationConfig = [
  {
    template: "New Bill Issued",
    subject: "New Bill Issued",
    condition: "When a new bill is generated",
  },
  {
    template: "New Bill Issued",
    subject: "New Bill Issued",
    condition: "When a new bill is generated",
  },
  {
    template: "New Bill Issued",
    subject: "New Bill Issued",
    condition: "When a new bill is generated",
  },
  {
    template: "New Bill Issued",
    subject: "New Bill Issued",
    condition: "When a new bill is generated",
  },
];

const translations = {
  en: {
    emailConfig: "E Mail Notification Configuration",
    messageTemplate: "Message Template",
    subjectLine: "Subject Line",
    triggerCondition: "Trigger Condition",
    integrationSettings: "Integration Settings",
    edit: "Edit",
    dataManagement: "Data Management",
    export: "Export Data",
    backup: "Backup Database",
    toExcel: "(To Excel / PDF)",
  },
  si: {
    emailConfig: "ඊ මේල් දැන්වීම් වින්‍යාසය",
    messageTemplate: "පණිවුඩ ආකෘතිය",
    subjectLine: "විෂය පේළිය",
    triggerCondition: "සක්‍රීය තත්ත්වය",
    integrationSettings: "ඒකාබද්ධකරණ සැකසුම්",
    edit: "සංස්කරණය",
    dataManagement: "දත්ත කළමනාකරණය",
    export: "දත්ත නිර්යාත කරන්න",
    backup: "දත්ත මෘදුපත් කරන්න",
    toExcel: "(Excel / PDF ලෙස)",
  },
  ta: {
    emailConfig: "மின்னஞ்சல் அறிவிப்பு அமைப்பு",
    messageTemplate: "செய்தி வார்ப்புரு",
    subjectLine: "தலைப்பு வரி",
    triggerCondition: "துவக்க நிபந்தனை",
    integrationSettings: "ஒருங்கிணைப்பு அமைப்புகள்",
    edit: "தொகு",
    dataManagement: "தரவு மேலாண்மை",
    export: "தரவை ஏற்றுமதி செய்க",
    backup: "தரவுத்தளத்தைக் காப்புசெய்",
    toExcel: "(Excel / PDF ஆக)",
  },
};

export default function SystemSettingsPage() {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      {/* Email Notification Table */}
      <h2 className="text-xl font-bold text-green-800 mb-4">{t.emailConfig}</h2>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-gray-50 border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700 font-semibold">
              <th className="px-4 py-2 border-b">{t.messageTemplate}</th>
              <th className="px-4 py-2 border-b">{t.subjectLine}</th>
              <th className="px-4 py-2 border-b">{t.triggerCondition}</th>
              <th className="px-4 py-2 border-b">{t.integrationSettings}</th>
            </tr>
          </thead>
          <tbody>
            {notificationConfig.map((row, index) => (
              <tr key={index} className="text-sm border-b hover:bg-gray-50">
                <td className="px-4 py-2">{row.template}</td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    defaultValue={row.subject}
                    className="border px-3 py-1 rounded text-sm w-full"
                  />
                </td>
                <td className="px-4 py-2">{row.condition}</td>
                <td className="px-4 py-2">
                  <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                    {t.edit}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 mt-4">
        {notificationConfig.map((row, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-sm text-sm"
          >
            <div className="mb-2">
              <span className="font-semibold text-gray-700">{t.messageTemplate}: </span>
              {row.template}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">{t.subjectLine}: </span>
              <input
                type="text"
                defaultValue={row.subject}
                className="border px-3 py-1 rounded w-full mt-1"
              />
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">{t.triggerCondition}: </span>
              {row.condition}
            </div>
            <div>
              <span className="font-semibold text-gray-700">{t.integrationSettings}: </span>
              <span className="text-blue-600 font-medium cursor-pointer hover:underline ml-1">
                {t.edit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Data Management Buttons */}
      <h2 className="text-xl font-bold text-green-800 mt-10 mb-4">{t.dataManagement}</h2>
      <div className="bg-gray-100 p-6 rounded flex flex-wrap gap-4">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold">
          {t.export}
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold">
          {t.backup}
        </button>
        <button className="bg-white hover:bg-gray-100 border px-6 py-2 rounded font-semibold">
          {t.integrationSettings}
        </button>
        <p className="text-sm text-gray-500 mt-2 w-full">{t.toExcel}</p>
      </div>
    </div>
  );
}
