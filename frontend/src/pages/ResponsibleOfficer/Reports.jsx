import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const labels = {
  en: {
    reports: "Reports",
    dateRange: "Date Range",
    collector: "Collector",
    zone: "Zone/ Category",
    generate: "Download Report",
    export: "Export As PDF",
    titles: [
      "Daily/Weekly/Monthly Collections Summary",
      "List of Payers",
      "List of Non-Payers (Defaulters)",
      "Collector-wise Performance Summary",
      "Outstanding Balances by Zone or Category",
    ],
  },
  si: {
    reports: "වාර්තා",
    dateRange: "දිනයේ පරාසය",
    collector: "ගාස්තු විශේෂඥයා",
    zone: "කලාපය/ප්‍රවර්ගය",
    generate: "වාර්තාව බාගන්න",
    export: "PDF ලෙස අපනයනය කරන්න",
    titles: [
      "දෛනික/සතිපතා/මාසික එකතු කිරීමේ සාරාංශය",
      "ගෙවූ අයගේ ලැයිස්තුව",
      "නොගෙවූ අයගේ ලැයිස්තුව",
      "ගාස්තු විශේෂඥයන්ගේ කාර්ය සාධන සාරාංශය",
      "කලාපය හෝ ප්‍රවර්ගය අනුව Outstanding බකියාවන්",
    ],
  },
  ta: {
    reports: "அறிக்கைகள்",
    dateRange: "தேதிகள் வரம்பு",
    collector: "வசூல்பவர்",
    zone: "மண்டலம் / வகை",
    generate: "அறிக்கையைப் பதிவிறக்கு",
    export: "PDF ஆக ஏற்றுமதி செய்",
    titles: [
      "தினசரி/வாராந்திர/மாதாந்திர வசூல் சுருக்கம்",
      "செலுத்தியவர்களின் பட்டியல்",
      "செலுத்தாதவர்களின் பட்டியல்",
      "வசூல்பவர் செயல்திறன் சுருக்கம்",
      "மண்டலம் அல்லது வகை வாரியான நிலுவைகள்",
    ],
  },
};

const dummyCollectors = ["Mahesh Kumara", "M S S M Hashan", "A A Rasik"];
const dummyZones = ["Zone A", "Zone B", "Zone C"];

const Reports = () => {
  const { lang } = useLanguage();
  const t = labels[lang] || labels.en;
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [collector, setCollector] = useState("");
  const [zone, setZone] = useState("");

  const handleGenerateClick = (index) => {
    switch (index) {
      case 0:
        navigate("/report/collection-summery");
        break;
      case 1:
        navigate("/report/payers");
        break;
      case 2:
        navigate("/report/non-payers");
        break;
      case 3:
        navigate("/report/performance-summery");
        break;
      case 4:
        navigate("/report/outstanding-balance");
        break;
      default:
        alert("This report is not yet implemented.");
    }
  };

  const handleDownloadClick = async (index) => {
  const reportTypes = [
    "collection-summary",
    "payers",
    "non-payers",
    "performance-summary",
    "outstanding-balance",
  ];

  const selectedType = reportTypes[index];

  try {
    const response = await fetch(`/api/report/download?type=${selectedType}`, {
      method: "GET",
    });

    if (!response.ok) throw new Error("Failed to download");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedType}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    alert("Report downloaded successfully!");
  } catch (error) {
    alert("Failed to download report.");
    console.error(error);
  }
};


  return (
    <div className="min-h-screen p-4 sm:p-6 bg-white text-gray-800">
      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="block text-sm mb-1">{t.dateRange}</label>
          <div className="flex items-center gap-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <span className="mx-1">-</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">{t.collector}</label>
          <select
            value={collector}
            onChange={(e) => setCollector(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">--</option>
            {dummyCollectors.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">{t.zone}</label>
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">--</option>
            {dummyZones.map((z, i) => (
              <option key={i} value={z}>
                {z}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Report List */}
      <h2 className="text-xl font-bold text-green-800 mb-4">{t.reports}</h2>
      <div className="space-y-4">
        {t.titles.map((title, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-gray-100 px-4 py-3 rounded-md shadow"
          >
            {/* ✅ Make the title a clickable button */}
            <button
              onClick={() => handleGenerateClick(idx)}
              className="text-left text-base sm:text-lg text-gray-700 flex-1 hover:underline hover:text-green-800"
            >
              {title}
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => handleDownloadClick(idx)}
                className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 text-sm"
              >
                {t.generate}
              </button>
              {/* <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm">
                {t.export}
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
