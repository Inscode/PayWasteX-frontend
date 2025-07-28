import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiDownload, HiEye, HiCalendar, HiUser, HiLocationMarker, HiX, HiDocumentReport, HiUserGroup, HiExclamation, HiTrendingUp, HiCurrencyDollar } from "react-icons/hi";

const labels = {
  en: {
    reports: "Reports Dashboard",
    dateRange: "Date Range",
    collector: "Collector",
    zone: "Zone / Category",
    generate: "Download Report",
    export: "Export As PDF",
    filterSection: "Filter Options",
    startDate: "Start Date",
    endDate: "End Date",
    selectAll: "Select All",
    clearFilters: "Clear Filters",
    availableReports: "Available Reports",
    quickActions: "Quick Actions",
    recentReports: "Recent Downloads",
    titles: [
      "Daily/Weekly/Monthly Collections Summary",
      "List of Payers",
      "List of Non-Payers (Defaulters)",
      "Collector-wise Performance Summary",
      "Outstanding Balances by Zone or Category",
    ],
    descriptions: [
      "Comprehensive overview of collections across different time periods",
      "Complete list of customers who have made payments",
      "Track customers with outstanding payments and overdue amounts",
      "Analyze individual collector performance metrics and trends",
      "View outstanding balances organized by zones and categories",
    ],
  },
  si: {
    reports: "වාර්තා උපකරණ පුවරුව",
    dateRange: "දිනයේ පරාසය",
    collector: "ගාස්තු විශේෂඥයා",
    zone: "කලාපය/ප්‍රවර්ගය",
    generate: "වාර්තාව බාගන්න",
    export: "PDF ලෙස අපනයනය කරන්න",
    filterSection: "පෙරහන් විකල්ප",
    startDate: "ආරම්භක දිනය",
    endDate: "අවසාන දිනය",
    selectAll: "සියල්ල තෝරන්න",
    clearFilters: "පෙරහන් ඉවත් කරන්න",
    availableReports: "පවතින වාර්තා",
    quickActions: "ඉක්මන් ක්‍රියාමාර්ග",
    recentReports: "මෑත බාගැනීම්",
    titles: [
      "දෛනික/සතිපතා/මාසික එකතු කිරීමේ සාරාංශය",
      "ගෙවූ අයගේ ලැයිස්තුව",
      "නොගෙවූ අයගේ ලැයිස්තුව",
      "ගාස්තු විශේෂඥයන්ගේ කාර්ය සාධන සාරාංශය",
      "කලාපය හෝ ප්‍රවර්ගය අනුව Outstanding බකියාවන්",
    ],
    descriptions: [
      "විවිධ කාල කණ්ඩායම් හරහා එකතු කිරීම් සමාලෝචනය",
      "ගෙවීම් සිදු කළ පාරිභෝගිකයන්ගේ සම්පූර්ණ ලැයිස්තුව",
      "නොගෙවූ ගෙවීම් ඇති පාරිභෝගිකයන් සොයා ගන්න",
      "තනි එකතුකරුවන්ගේ කාර්ය සාධන මිනුම් විශ්ලේෂණය",
      "කලාප අනුව සංවිධානය කළ නොගෙවූ ශේෂ බලන්න",
    ],
  },
  ta: {
    reports: "அறிக்கைகள் டாஷ்போர்டு",
    dateRange: "தேதிகள் வரம்பு",
    collector: "வசூல்பவர்",
    zone: "மண்டலம் / வகை",
    generate: "அறிக்கையைப் பதிவிறக்கு",
    export: "PDF ஆக ஏற்றுமதி செய்",
    filterSection: "வடிகட்டல் விருப்பங்கள்",
    startDate: "தொடக்க தேதி",
    endDate: "முடிவு தேதி",
    selectAll: "அனைத்தையும் தேர்ந்தெடு",
    clearFilters: "வடிகட்டல்களை அழி",
    availableReports: "கிடைக்கும் அறிக்கைகள்",
    quickActions: "விரைவு செயல்கள்",
    recentReports: "சமீபத்திய பதிவிறக்கங்கள்",
    titles: [
      "தினசரி/வாராந்திர/மாதாந்திர வசூல் சுருக்கம்",
      "செலுத்தியவர்களின் பட்டியல்",
      "செலுத்தாதவர்களின் பட்டியல்",
      "வசூல்பவர் செயல்திறன் சுருக்கம்",
      "மண்டலம் அல்லது வகை வாரியான நிலுவைகள்",
    ],
    descriptions: [
      "வெவ்வேறு கால கட்டங்களில் வசூலிப்பு மேலோட்டம்",
      "பணம் செலுத்திய வாடிக்கையாளர்களின் முழு பட்டியல்",
      "நிலுவை பணம் உள்ள வாடிக்கையாளர்களைக் கண்காணி",
      "தனிப்பட்ட வசூல்பவர் செயல்திறன் அளவீடுகளை பகுப்பாய்வு",
      "மண்டலங்களால் ஒழுங்கமைக்கப்பட்ட நிலுவை இருப்புகளைப் பார்",
    ],
  },
};

const dummyCollectors = ["Mahesh Kumara", "M S S M Hashan", "A A Rasik"];
const dummyZones = ["Zone A", "Zone B", "Zone C"];

// Report icons and colors
const reportConfig = [
  { icon: HiDocumentReport, color: "emerald", bgColor: "from-emerald-500 to-teal-600" },
  { icon: HiUserGroup, color: "blue", bgColor: "from-blue-500 to-indigo-600" },
  { icon: HiExclamation, color: "red", bgColor: "from-red-500 to-pink-600" },
  { icon: HiTrendingUp, color: "purple", bgColor: "from-purple-500 to-violet-600" },
  { icon: HiCurrencyDollar, color: "amber", bgColor: "from-amber-500 to-orange-600" },
];

const recentDownloads = [
  { name: "Monthly Collections", date: "2 hours ago", size: "2.3 MB" },
  { name: "Defaulters Report", date: "Yesterday", size: "1.8 MB" },
  { name: "Zone Analysis", date: "3 days ago", size: "3.1 MB" },
];

const Reports = () => {
  const { lang } = useLanguage();
  const t = labels[lang] || labels.en;
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [collector, setCollector] = useState("");
  const [zone, setZone] = useState("");
  const [loading, setLoading] = useState(null);

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
    setLoading(index);

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
    } finally {
      setLoading(null);
    }
  };

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setCollector("");
    setZone("");
  };

  const hasFilters = startDate || endDate || collector || zone;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <HiDocumentReport className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{t.reports}</h1>
                <p className="text-sm text-gray-600">Generate and download comprehensive reports</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="text-sm font-medium text-gray-800">Just now</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Filter Section */}
        <Section title="🔍 Filter Options" subtitle="Customize your reports">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Date Range */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <HiCalendar className="mr-2 text-blue-600" />
                  {t.dateRange}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText={t.startDate}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText={t.endDate}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Collector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <HiUser className="mr-2 text-purple-600" />
                  {t.collector}
                </label>
                <select
                  value={collector}
                  onChange={(e) => setCollector(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="">All Collectors</option>
                  {dummyCollectors.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Zone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <HiLocationMarker className="mr-2 text-green-600" />
                  {t.zone}
                </label>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="">All Zones</option>
                  {dummyZones.map((z, i) => (
                    <option key={i} value={z}>
                      {z}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {hasFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <HiX className="mr-2" />
                  {t.clearFilters}
                </button>
              </div>
            )}
          </div>
        </Section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Reports Section */}
          <div className="xl:col-span-2 space-y-8">
            <Section title="📊 Available Reports" subtitle="Generate and download reports">
              <div className="space-y-6">
                {t.titles.map((title, idx) => (
                  <ReportCard
                    key={idx}
                    title={title}
                    description={t.descriptions[idx]}
                    icon={reportConfig[idx].icon}
                    color={reportConfig[idx].color}
                    bgGradient={reportConfig[idx].bgColor}
                    onView={() => handleGenerateClick(idx)}
                    onDownload={() => handleDownloadClick(idx)}
                    loading={loading === idx}
                  />
                ))}
              </div>
            </Section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Section title="⚡ Quick Actions" subtitle="Common tasks">
              <div className="space-y-3">
                <ActionButton icon={<HiDocumentReport />} text="Generate All Reports" color="emerald" />
                <ActionButton icon={<HiDownload />} text="Bulk Download" color="blue" />
                <ActionButton icon={<HiEye />} text="Report Preview" color="purple" />
              </div>
            </Section>

            {/* Recent Downloads */}
            <Section title="📁 Recent Downloads" subtitle="Recently generated reports">
              <div className="space-y-3">
                {recentDownloads.map((report, i) => (
                  <RecentReportItem key={i} report={report} />
                ))}
              </div>
            </Section>

            {/* Report Stats */}
            <Section title="📈 Report Statistics" subtitle="Usage overview">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
                <StatItem label="Reports Generated Today" value="12" color="emerald" />
                <StatItem label="Total Downloads" value="156" color="blue" />
                <StatItem label="Most Popular" value="Collections Summary" color="purple" />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportCard = ({ title, description, icon: Icon, color, bgGradient, onView, onDownload, loading }) => (
  <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
    <div className="p-6">
      <div className="flex items-start space-x-4">
        <div className={`bg-gradient-to-r ${bgGradient} p-3 rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {description}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onView}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all text-sm font-medium"
            >
              <HiEye className="w-4 h-4" />
              <span>View</span>
            </button>
            <button
              onClick={onDownload}
              disabled={loading}
              className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${bgGradient} text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <HiDownload className="w-4 h-4" />
                  <span>Download</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ActionButton = ({ icon, text, color }) => {
  const colorClasses = {
    emerald: "bg-emerald-500 hover:bg-emerald-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    purple: "bg-purple-500 hover:bg-purple-600"
  };

  return (
    <button className={`w-full ${colorClasses[color]} text-white p-3 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2`}>
      {icon}
      <span>{text}</span>
    </button>
  );
};

const Section = ({ title, subtitle, children }) => (
  <div>
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const RecentReportItem = ({ report }) => (
  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-all">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
        <HiDocumentReport className="text-blue-600 w-4 h-4" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-800">{report.name}</p>
        <p className="text-xs text-gray-500">{report.date} • {report.size}</p>
      </div>
    </div>
    <button className="text-gray-400 hover:text-gray-600 transition-colors">
      <HiDownload className="w-4 h-4" />
    </button>
  </div>
);

const StatItem = ({ label, value, color }) => {
  const colorClasses = {
    emerald: "text-emerald-600",
    blue: "text-blue-600",
    purple: "text-purple-600"
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`font-semibold ${colorClasses[color]}`}>{value}</span>
    </div>
  );
};

export default Reports;