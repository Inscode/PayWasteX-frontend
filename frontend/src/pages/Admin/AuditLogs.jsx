import React, { useState, useMemo } from "react";
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight, User, Shield, Activity, Globe, Clock, Eye, UserPlus, Settings } from "lucide-react";

const auditLogs = [
  {
    timestamp: "2025/01/12 10:20:12 am",
    user: "Sugath Perera",
    action: "Created User",
    module: "User Management",
    description: "Added new fee collector",
    ip: "192.168.1.10",
    severity: "low"
  },
  {
    timestamp: "2025/01/12 10:20:12 am",
    user: "Mahesh Kumara",
    action: "Created User",
    module: "User Management",
    description: "Added new fee collector",
    ip: "192.168.1.10",
    severity: "low"
  },
  {
    timestamp: "2025/01/12 10:20:12 am",
    user: "M S S M Hashan",
    action: "Created User",
    module: "User Management",
    description: "Added new fee collector",
    ip: "192.168.1.10",
    severity: "medium"
  },
  {
    timestamp: "2025/01/12 09:15:30 am",
    user: "A A Rasik",
    action: "Login Attempt",
    module: "Authentication",
    description: "Successful login from new device",
    ip: "192.168.1.15",
    severity: "medium"
  },
  {
    timestamp: "2025/01/12 08:45:22 am",
    user: "Sisira Nirmal",
    action: "Updated Settings",
    module: "System Config",
    description: "Modified fee calculation parameters",
    ip: "192.168.1.20",
    severity: "high"
  },
  {
    timestamp: "2025/01/11 16:30:45 pm",
    user: "Admin User",
    action: "Data Export",
    module: "Reports",
    description: "Exported monthly fee collection report",
    ip: "192.168.1.5",
    severity: "medium"
  },
  {
    timestamp: "2025/01/11 14:22:18 pm",
    user: "Sugath Perera",
    action: "Fee Collection",
    module: "Payments",
    description: "Processed payment for Shop license",
    ip: "192.168.1.10",
    severity: "low"
  },
  {
    timestamp: "2025/01/11 11:15:33 am",
    user: "System",
    action: "Backup Created",
    module: "System",
    description: "Automated daily backup completed",
    ip: "127.0.0.1",
    severity: "low"
  }
];

const translations = {
  en: {
    title: "Audit Logs",
    subtitle: "Monitor all system activities and user actions",
    timestamp: "Timestamp",
    user: "User",
    action: "Action Performed",
    module: "Module",
    description: "Description",
    ip: "IP Address",
    search: "Search logs...",
    filter: "Filter",
    actionType: "Action Type",
    severity: "Severity",
    allUsers: "All Users",
    allActions: "All Actions",
    allModules: "All Modules",
    allSeverity: "All Severity",
    low: "Low",
    medium: "Medium",
    high: "High",
    showing: "Showing",
    of: "of",
    entries: "entries",
    previous: "Previous",
    next: "Next"
  },
  si: {
    title: "විගණන ලොග්",
    subtitle: "සියලුම පද්ධති ක්‍රියාකාරකම් සහ පරිශීලක ක්‍රියාවන් නිරීක්ෂණය කරන්න",
    timestamp: "කාලය",
    user: "පරිශීලකයා",
    action: "සිදුකළ ක්‍රියාව",
    module: "මොඩියුලය",
    description: "විස්තරය",
    ip: "IP ලිපිනය",
    search: "ලොග් සොයන්න...",
    filter: "පෙරහන්",
    actionType: "ක්‍රියාව වර්ගය",
    severity: "බරපතලකම",
    allUsers: "සියලු පරිශීලකයින්",
    allActions: "සියලු ක්‍රියා",
    allModules: "සියලු මොඩියුල්",
    allSeverity: "සියලු බරපතලකම්",
    low: "අඩු",
    medium: "මධ්‍යම",
    high: "ඉහළ"
  },
  ta: {
    title: "ஆடிட் பதிவுகள்",
    subtitle: "அனைத்து கணினி செயல்பாடுகள் மற்றும் பயனர் செயல்களை கண்காணிக்கவும்",
    timestamp: "நேரம்",
    user: "பயனர்",
    action: "செயல்",
    module: "தொகுதி",
    description: "விளக்கம்",
    ip: "IP முகவரி",
    search: "பதிவுகளைத் தேடு...",
    filter: "வடிகட்டி",
    actionType: "செயல்களின் வகை",
    severity: "தீவிரம்",
    allUsers: "அனைத்து பயனர்கள்",
    allActions: "அனைத்து செயல்கள்",
    allModules: "அனைத்து தொகுதிகள்",
    allSeverity: "அனைத்து தீவிரம்"
  },
};

export default function AuditLogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const [lang] = useState("en");
  
  const logsPerPage = 5;
  const t = translations[lang] || translations.en;

  // Filter logs based on search and filter criteria
  const filteredLogs = useMemo(() => {
    return auditLogs.filter(log => {
      const matchesSearch = searchTerm === "" || 
        Object.values(log).some(value => 
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesUser = selectedUser === "" || log.user === selectedUser;
      const matchesAction = selectedAction === "" || log.action === selectedAction;
      const matchesModule = selectedModule === "" || log.module === selectedModule;
      const matchesSeverity = selectedSeverity === "" || log.severity === selectedSeverity;
      
      return matchesSearch && matchesUser && matchesAction && matchesModule && matchesSeverity;
    });
  }, [searchTerm, selectedUser, selectedAction, selectedModule, selectedSeverity]);

  // Get unique values for filter dropdowns
  const uniqueUsers = [...new Set(auditLogs.map(log => log.user))];
  const uniqueActions = [...new Set(auditLogs.map(log => log.action))];
  const uniqueModules = [...new Set(auditLogs.map(log => log.module))];

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const endIndex = startIndex + logsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getActionIcon = (action) => {
    const icons = {
      "Created User": UserPlus,
      "Login Attempt": Shield,
      "Updated Settings": Settings,
      "Data Export": Activity,
      "Fee Collection": Activity,
      "Backup Created": Activity
    };
    const IconComponent = icons[action] || Activity;
    return <IconComponent className="w-4 h-4" />;
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: "from-emerald-400 to-teal-500",
      medium: "from-yellow-400 to-orange-500", 
      high: "from-red-400 to-rose-500"
    };
    return colors[severity] || colors.low;
  };

  const getSeverityBadge = (severity) => {
    const badges = {
      low: "bg-emerald-100 text-emerald-700 border-emerald-200",
      medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
      high: "bg-red-100 text-red-700 border-red-200"
    };
    return badges[severity] || badges.low;
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedUser("");
    setSelectedAction("");
    setSelectedModule("");
    setSelectedSeverity("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
            <Eye className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-slate-600 mt-1">{t.subtitle}</p>
          </div>
        </div>
        <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
      </div>

      {/* Modern Filter Bar */}
      <div className="backdrop-blur-md bg-white/70 border border-white/20 rounded-2xl shadow-xl p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300 placeholder-slate-400"
            />
          </div>

          {/* User Filter */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <select 
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none transition-all duration-300"
            >
              <option value="">{t.allUsers}</option>
              {uniqueUsers.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
          </div>

          {/* Action Filter */}
          <div className="relative">
            <Activity className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <select 
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none transition-all duration-300"
            >
              <option value="">{t.allActions}</option>
              {uniqueActions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
          </div>

          {/* Module Filter */}
          <div className="relative">
            <Settings className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <select 
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none transition-all duration-300"
            >
              <option value="">{t.allModules}</option>
              {uniqueModules.map(module => (
                <option key={module} value={module}>{module}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
          </div>

          {/* Filter Button */}
          <div className="flex gap-2">
            <button 
              onClick={resetFilters}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Filter className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
          <span>
            {t.showing} {startIndex + 1}-{Math.min(endIndex, filteredLogs.length)} {t.of} {filteredLogs.length} {t.entries}
          </span>
          {(searchTerm || selectedUser || selectedAction || selectedModule || selectedSeverity) && (
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
              Filters Active
            </span>
          )}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block mb-8">
        <div className="backdrop-blur-md bg-white/70 border border-white/20 rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-800/5 to-indigo-800/5 backdrop-blur-sm">
                <th className="px-6 py-4 text-left font-semibold text-slate-700 border-b border-white/20">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {t.timestamp}
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 border-b border-white/20">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t.user}
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 border-b border-white/20">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    {t.action}
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 border-b border-white/20">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    {t.module}
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 border-b border-white/20">
                  {t.description}
                </th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 border-b border-white/20">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {t.ip}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log, index) => (
                <tr 
                  key={index} 
                  className="group hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300 border-b border-white/10 last:border-b-0"
                >
                  <td className="px-6 py-4 text-sm font-mono text-slate-600">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-indigo-600" />
                      </div>
                      <span className="font-medium text-slate-700">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600">
                        {getActionIcon(log.action)}
                      </div>
                      <span className="font-medium text-slate-700">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                      {log.module}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 max-w-xs">
                    <span className="truncate block">{log.description}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getSeverityColor(log.severity)}`}></div>
                      <span className="font-mono text-sm text-slate-600">{log.ip}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 mb-8">
        {currentLogs.map((log, index) => (
          <div
            key={index}
            className="group backdrop-blur-md bg-white/70 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600">
                  {getActionIcon(log.action)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{log.action}</h3>
                  <p className="text-sm text-slate-600 font-mono">{log.timestamp}</p>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getSeverityColor(log.severity)}`}></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t.user}</span>
                <p className="font-medium text-slate-700">{log.user}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t.module}</span>
                <p className="font-medium text-slate-700">{log.module}</p>
              </div>
            </div>
            
            <div className="mb-3">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t.description}</span>
              <p className="text-slate-700">{log.description}</p>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-white/20">
              <span className="flex items-center gap-2 text-sm text-slate-600 font-mono">
                <Globe className="w-4 h-4" />
                {log.ip}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityBadge(log.severity)}`}>
                {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Pagination */}
      <div className="backdrop-blur-md bg-white/70 border border-white/20 rounded-2xl shadow-xl p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-600">
            {t.showing} <span className="font-semibold">{startIndex + 1}</span> to{" "}
            <span className="font-semibold">{Math.min(endIndex, filteredLogs.length)}</span> of{" "}
            <span className="font-semibold">{filteredLogs.length}</span> {t.entries}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-white/50 border border-white/30 rounded-lg hover:bg-white/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t.previous}</span>
            </button>
            
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 transform hover:scale-110 ${
                      currentPage === page
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                        : "bg-white/50 text-slate-600 hover:bg-white/70"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 bg-white/50 border border-white/30 rounded-lg hover:bg-white/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <span className="hidden sm:inline">{t.next}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}