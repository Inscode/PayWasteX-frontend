import React, { useState } from "react";
import { 
  Mail, 
  Edit3, 
  Download, 
  Database, 
  Settings, 
  Bell, 
  FileText, 
  Shield, 
  Zap, 
  Save, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info,
  Calendar,
  Users,
  Activity,
  Plus,
  Trash2,
  Copy,
  X
} from "lucide-react";

const notificationConfig = [
  {
    id: 1,
    template: "New Bill Issued",
    subject: "New Bill Issued - Payment Required",
    condition: "When a new bill is generated",
    enabled: true,
    priority: "high",
    channels: ["email", "sms"],
    lastModified: "2025/01/12"
  },
  {
    id: 2,
    template: "Payment Received",
    subject: "Payment Confirmation",
    condition: "When payment is successfully processed",
    enabled: true,
    priority: "medium",
    channels: ["email"],
    lastModified: "2025/01/10"
  },
  {
    id: 3,
    template: "Overdue Notice",
    subject: "Payment Overdue - Immediate Action Required",
    condition: "When payment is 7 days overdue",
    enabled: true,
    priority: "high",
    channels: ["email", "sms", "push"],
    lastModified: "2025/01/08"
  },
  {
    id: 4,
    template: "License Renewal",
    subject: "License Renewal Reminder",
    condition: "30 days before license expiry",
    enabled: false,
    priority: "medium",
    channels: ["email"],
    lastModified: "2025/01/05"
  },
];

const translations = {
  en: {
    title: "System Settings",
    subtitle: "Configure notifications, integrations, and data management",
    emailConfig: "E-Mail Notification Configuration",
    messageTemplate: "Message Template",
    subjectLine: "Subject Line",
    triggerCondition: "Trigger Condition",
    integrationSettings: "Integration Settings",
    edit: "Edit",
    dataManagement: "Data Management",
    export: "Export Data",
    backup: "Backup Database",
    toExcel: "Export to Excel, PDF, or CSV formats",
    enabled: "Enabled",
    disabled: "Disabled",
    priority: "Priority",
    channels: "Channels",
    lastModified: "Last Modified",
    high: "High",
    medium: "Medium",
    low: "Low",
    email: "Email",
    sms: "SMS",
    push: "Push",
    addTemplate: "Add Template",
    saveChanges: "Save Changes",
    testEmail: "Test Email",
    scheduleBackup: "Schedule Backup",
    viewLogs: "View Logs",
    systemHealth: "System Health",
    apiStatus: "API Status",
    databaseStatus: "Database Status",
    emailService: "Email Service",
    online: "Online",
    offline: "Offline",
    healthy: "Healthy",
    warning: "Warning",
    error: "Error"
  },
  si: {
    title: "පද්ධති සැකසුම්",
    subtitle: "දැන්වීම්, ඒකාබද්ධකරණ සහ දත්ත කළමනාකරණය වින්යාස කරන්න",
    emailConfig: "ඊ මේල් දැන්වීම් වින්‍යාසය",
    messageTemplate: "පණිවුඩ ආකෘතිය",
    subjectLine: "විෂය පේළිය",
    triggerCondition: "සක්‍රීය තත්ත්වය",
    integrationSettings: "ඒකාබද්ධකරණ සැකසුම්",
    edit: "සංස්කරණය",
    dataManagement: "දත්ත කළමනාකරණය",
    export: "දත්ත නිර්යාත කරන්න",
    backup: "දත්ත මෘදුපත් කරන්න",
    enabled: "සක්‍රීයයි",
    disabled: "අක්‍රීයයි"
  },
  ta: {
    title: "கணினி அமைப்புகள்",
    subtitle: "அறிவிப்புகள், ஒருங்கிணைப்புகள் மற்றும் தரவு மேலாண்மையை உள்ளமைக்கவும்",
    emailConfig: "மின்னஞ்சல் அறிவிப்பு அமைப்பு",
    messageTemplate: "செய்தி வார்ப்புரு",
    subjectLine: "தலைப்பு வரி",
    triggerCondition: "துவக்க நிபந்தனை",
    integrationSettings: "ஒருங்கிணைப்பு அமைப்புகள்",
    edit: "தொகு",
    dataManagement: "தரவு மேலாண்மை",
    export: "தரவை ஏற்றுமதி செய்க",
    backup: "தரவுத்தளத்தைக் காப்புசெய்",
    enabled: "இயக்கப்பட்டது",
    disabled: "முடக்கப்பட்டது"
  },
};

export default function SystemSettingsPage() {
  const [lang] = useState("en");
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [notifications, setNotifications] = useState(notificationConfig);
  const [systemHealth, setSystemHealth] = useState({
    api: "healthy",
    database: "healthy", 
    emailService: "healthy"
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [showAddTemplate, setShowAddTemplate] = useState(false);

  const t = translations[lang] || translations.en;

  const handleToggleEnabled = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
  };

  const handleEdit = (notification) => {
    setEditingTemplate(notification);
  };

  const handleSave = () => {
    if (editingTemplate) {
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === editingTemplate.id ? editingTemplate : notif
        )
      );
      setEditingTemplate(null);
    }
    setSuccessMessage("Settings saved successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCancel = () => {
    setEditingTemplate(null);
    setShowAddTemplate(false);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "from-red-400 to-rose-500",
      medium: "from-yellow-400 to-orange-500",
      low: "from-emerald-400 to-teal-500"
    };
    return colors[priority] || colors.medium;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: "bg-red-100 text-red-700 border-red-200",
      medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
      low: "bg-emerald-100 text-emerald-700 border-emerald-200"
    };
    return badges[priority] || badges.medium;
  };

  const getStatusColor = (status) => {
    const colors = {
      healthy: "text-emerald-600",
      warning: "text-yellow-600", 
      error: "text-red-600"
    };
    return colors[status] || colors.healthy;
  };

  const getStatusIcon = (status) => {
    const icons = {
      healthy: CheckCircle,
      warning: AlertCircle,
      error: AlertCircle
    };
    const IconComponent = icons[status] || CheckCircle;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
            <Settings className="w-8 h-8" />
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

      {/* Data Management Section */}
      <div className="backdrop-blur-md bg-white/70 border border-white/20 rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600">
            <Database className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t.dataManagement}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="group flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <Download className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
            <div className="text-center">
              <div className="font-bold">{t.export}</div>
              <div className="text-xs opacity-90 mt-1">{t.toExcel}</div>
            </div>
          </button>

          <button className="group flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <Database className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-center">
              <div className="font-bold">{t.backup}</div>
              <div className="text-xs opacity-90 mt-1">Create backup</div>
            </div>
          </button>

          <button className="group flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <RefreshCw className="w-8 h-8 group-hover:rotate-180 transition-transform duration-500" />
            <div className="text-center">
              <div className="font-bold">{t.scheduleBackup}</div>
              <div className="text-xs opacity-90 mt-1">Automated</div>
            </div>
          </button>

          <button className="group flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <Activity className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-center">
              <div className="font-bold">{t.viewLogs}</div>
              <div className="text-xs opacity-90 mt-1">System logs</div>
            </div>
          </button>
        </div>
      </div>

      {/* System Health Dashboard */}
      {/* <div className="backdrop-blur-md bg-white/70 border border-white/20 rounded-2xl shadow-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600">
            <Activity className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {t.systemHealth}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-700">{t.apiStatus}</span>
              <div className={getStatusColor(systemHealth.api)}>
                {getStatusIcon(systemHealth.api)}
              </div>
            </div>
            <p className="text-sm text-slate-600 capitalize">{systemHealth.api}</p>
          </div>

          <div className="backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-700">{t.databaseStatus}</span>
              <div className={getStatusColor(systemHealth.database)}>
                {getStatusIcon(systemHealth.database)}
              </div>
            </div>
            <p className="text-sm text-slate-600 capitalize">{systemHealth.database}</p>
          </div>

          <div className="backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-700">{t.emailService}</span>
              <div className={getStatusColor(systemHealth.emailService)}>
                {getStatusIcon(systemHealth.emailService)}
              </div>
            </div>
            <p className="text-sm text-slate-600 capitalize">{systemHealth.emailService}</p>
          </div>
        </div>
      </div> */}

      {/* Email Notification Configuration */}
      <div className="backdrop-blur-md bg-white/70 border border-white/20 rounded-2xl shadow-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t.emailConfig}
            </h2>
          </div>
          <button
            onClick={() => setShowAddTemplate(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            {t.addTemplate}
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-hidden rounded-xl border border-white/20">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-800/5 to-indigo-800/5 backdrop-blur-sm">
                <th className="px-6 py-4 text-left font-semibold text-slate-700 border-b border-white/20">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {t.messageTemplate}
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 border-b border-white/20">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t.subjectLine}
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 border-b border-white/20">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    {t.triggerCondition}
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 border-b border-white/20">
                  Status
                </th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 border-b border-white/20">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification, index) => (
                <tr 
                  key={notification.id} 
                  className="group hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300 border-b border-white/10 last:border-b-0"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600">
                        <Bell className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-slate-700">{notification.template}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      defaultValue={notification.subject}
                      className="w-full px-3 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm transition-all duration-300"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 text-sm">{notification.condition}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleEnabled(notification.id)}
                        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                          notification.enabled 
                            ? 'bg-gradient-to-r from-emerald-400 to-teal-500' 
                            : 'bg-slate-300'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 transform ${
                          notification.enabled ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        notification.enabled 
                          ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {notification.enabled ? t.enabled : t.disabled}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(notification)}
                        className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-gradient-to-r from-slate-400 to-slate-500 text-white rounded-lg hover:from-slate-500 hover:to-slate-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{notification.template}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 border ${
                      notification.enabled 
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {notification.enabled ? t.enabled : t.disabled}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleEnabled(notification.id)}
                  className={`w-12 h-6 rounded-full transition-all duration-300 ${
                    notification.enabled 
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-500' 
                      : 'bg-slate-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 transform ${
                    notification.enabled ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
              
              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t.subjectLine}</label>
                  <input
                    type="text"
                    defaultValue={notification.subject}
                    className="w-full px-3 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm mt-1 transition-all duration-300"
                  />
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t.triggerCondition}</span>
                  <p className="text-slate-700 text-sm mt-1">{notification.condition}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-white/20">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(notification.priority)}`}>
                  {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                </span>
                <button
                  onClick={() => handleEdit(notification)}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
                >
                  <Edit3 className="w-4 h-4" />
                  {t.edit}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      

      {/* Edit Modal */}
      {editingTemplate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-md bg-white/90 border border-white/20 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600">
                  <Edit3 className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Edit Notification Template
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{t.messageTemplate}</label>
                  <input
                    type="text"
                    value={editingTemplate.template}
                    onChange={(e) => setEditingTemplate({...editingTemplate, template: e.target.value})}
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Priority</label>
                  <select
                    value={editingTemplate.priority}
                    onChange={(e) => setEditingTemplate({...editingTemplate, priority: e.target.value})}
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-700">{t.subjectLine}</label>
                  <input
                    type="text"
                    value={editingTemplate.subject}
                    onChange={(e) => setEditingTemplate({...editingTemplate, subject: e.target.value})}
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-700">{t.triggerCondition}</label>
                  <textarea
                    value={editingTemplate.condition}
                    onChange={(e) => setEditingTemplate({...editingTemplate, condition: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 resize-none"
                  />
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  {t.saveChanges}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {successMessage && (
        <div className="fixed top-8 right-8 z-50 animate-pulse">
          <div className="backdrop-blur-md bg-emerald-500/90 border border-emerald-400/20 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <div className="p-1 bg-white/20 rounded-full">
              <CheckCircle className="w-4 h-4" />
            </div>
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}