// components/Dashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiDownload,
  HiUserGroup,
  HiCash,
  HiMap,
  HiTrendingUp,
  HiClock,
  HiCheckCircle,
} from "react-icons/hi";
import { feeCollectorTotalPayment } from "../../services/responsibleOfficer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [collectors, setCollectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch collector data on component mount
  useEffect(() => {
    const fetchCollectorData = async () => {
      try {
        setLoading(true);
        const response = await feeCollectorTotalPayment();
        console.log("Collector data response:", response);
        const transformedData = response.map((collector) => ({
          name: collector.collectorName,
          amount: collector.totalCollectedAmount,
          change: calculateChange(collector),
          trend: determineTrend(collector),
          collectorId: collector.collectorId,
        }));

        setCollectors(transformedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching collector data:", err);
        setError("Failed to load collector data");
        setCollectors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectorData();
  }, []);

  // Helper functions to calculate change and trend
  const calculateChange = (collector) => {
    return "+0.0%"; // Placeholder
  };

  const determineTrend = (collector) => {
    return "up"; // Placeholder
  };

  const zones = [
    { zone: "A1", due: "10,000.00", priority: "high" },
    { zone: "B1", due: "8,500.00", priority: "medium" },
    { zone: "C2", due: "14,200.00", priority: "high" },
    { zone: "D3", due: "3,600.00", priority: "low" },
  ];

  const recentActivities = [
    {
      action: "Payment confirmed",
      collector: "Collector A",
      amount: "5,000",
      time: "2 min ago",
    },
    {
      action: "New bill issued",
      zone: "Zone B1",
      amount: "2,500",
      time: "15 min ago",
    },
    { action: "Report generated", type: "Monthly", time: "1 hour ago" },
  ];

  // Navigation handlers
  const handleConfirmPayments = () => {
    navigate("/responsibleOfficer/directpayments");
  };

  const handleIssueBill = () => {
    navigate("/responsibleOfficer/billmanagement");
  };

  const handleGenerateReport = () => {
    navigate("/responsibleOfficer/reports");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">RO</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-600">
                  Responsible Officer Portal
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="text-sm font-medium text-gray-800">
                  2 minutes ago
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Collection"
            value="209,000.00"
            icon={<HiCash />}
            color="emerald"
            trend="+15.2%"
            subtitle="This month"
          />
          <StatCard
            title="Pending Dues"
            value="20,000.00"
            icon={<HiClock />}
            color="amber"
            trend="-8.5%"
            subtitle="Overdue amount"
          />
          <StatCard
            title="Active Collectors"
            value="12"
            icon={<HiUserGroup />}
            color="blue"
            trend="+2"
            subtitle="Currently working"
            currency={false}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Collections Section */}
          <div className="xl:col-span-2 space-y-8">
            <Section
              title="💼 Collections by Fee Collector"
              subtitle="Performance overview"
            >
              {loading ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {[1, 2, 3].map((i) => (
                    <CollectorCardSkeleton key={i} />
                  ))}
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                  <p className="text-red-600 font-medium">Error Loading Data</p>
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : collectors.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                  <p className="text-gray-600 font-medium">No Collector Data</p>
                  <p className="text-gray-500 text-sm mt-1">
                    No collectors found or no collections recorded yet.
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {collectors.map((collector, i) => (
                    <CollectorCard
                      key={collector.collectorId || i}
                      collector={collector}
                    />
                  ))}
                </div>
              )}
            </Section>

            {/* Zone-wise Dues */}
            <Section
              title="🗺️ Zone Management"
              subtitle="Outstanding amounts by area"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {zones.map((z, i) => (
                  <ZoneCard key={i} zone={z} />
                ))}
              </div>
            </Section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <Section title="⚡ Recent Activity" subtitle="Latest updates">
              <div className="space-y-3">
                {recentActivities.map((activity, i) => (
                  <ActivityItem key={i} activity={activity} />
                ))}
              </div>
            </Section>

            {/* Quick Actions */}
            <Section title="⚙️ Quick Actions" subtitle="Common tasks">
              <div className="space-y-3">
                <ActionButton
                  icon={<HiCheckCircle />}
                  text="Direct Payments"
                  color="emerald"
                  onClick={handleConfirmPayments}
                />
                <ActionButton
                  icon={<HiDownload />}
                  text="Issue Bill"
                  color="blue"
                  onClick={handleIssueBill}
                />
                <ActionButton
                  icon={<HiTrendingUp />}
                  text="Generate Report"
                  color="purple"
                  onClick={handleGenerateReport}
                />
              </div>
            </Section>

            {/* Download Reports */}
            <Section title="📁 Reports" subtitle="Download data">
              <div className="space-y-3">
                <ReportButton
                  text="Monthly Collection"
                  color="emerald"
                  size="small"
                />
                <ReportButton text="Defaulters List" color="red" size="small" />
                <ReportButton text="Zone Analysis" color="blue" size="small" />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

// All your existing components (StatCard, CollectorCard, etc.) remain the same
const StatCard = ({
  title,
  value,
  icon,
  color,
  trend,
  subtitle,
  currency = true,
}) => {
  const colorClasses = {
    emerald: "from-emerald-500 to-teal-600",
    amber: "from-amber-500 to-orange-600",
    blue: "from-blue-500 to-indigo-600",
  };

  return (
    <div className="group relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
        style={{
          background: `linear-gradient(to right, ${
            color === "emerald"
              ? "#10b981, #0d9488"
              : color === "amber"
              ? "#f59e0b, #ea580c"
              : "#3b82f6, #4f46e5"
          })`,
        }}
      ></div>

      <div
        className={`bg-gradient-to-r ${colorClasses[color]} p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-white relative`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
            <p className="text-3xl font-bold mb-1">
              {currency ? `LKR ${value}` : value}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {trend}
              </span>
              <span className="text-white/70 text-xs">{subtitle}</span>
            </div>
          </div>
          <div className="text-4xl opacity-80 transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading skeleton component for collectors
const CollectorCardSkeleton = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
      <div className="h-6 bg-gray-200 rounded-full w-12"></div>
    </div>
    <div className="text-right">
      <div className="h-8 bg-gray-200 rounded w-32 mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-20"></div>
    </div>
  </div>
);

// Updated CollectorCard component to handle real data
const CollectorCard = ({ collector }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {collector.name?.split(" ")[1]?.charAt(0) ||
              collector.name?.charAt(0) ||
              "C"}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">
            {collector.name || "Unknown Collector"}
          </h3>
          <p className="text-xs text-gray-500">Fee Collector</p>
        </div>
      </div>
      <div
        className={`text-xs px-2 py-1 rounded-full ${
          collector.trend === "up"
            ? "bg-green-100 text-green-700"
            : collector.trend === "down"
            ? "bg-red-100 text-red-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {collector.change || "N/A"}
      </div>
    </div>
    <div className="text-right">
      <p className="text-2xl font-bold text-emerald-600">
        LKR {collector.amount || "0.00"}
      </p>
      <p className="text-xs text-gray-500">Total collected</p>
    </div>
  </div>
);

const ZoneCard = ({ zone }) => {
  const priorityColors = {
    high: "border-red-200 bg-red-50",
    medium: "border-amber-200 bg-amber-50",
    low: "border-green-200 bg-green-50",
  };

  const priorityDots = {
    high: "bg-red-500",
    medium: "bg-amber-500",
    low: "bg-green-500",
  };

  return (
    <div
      className={`border-2 ${
        priorityColors[zone.priority]
      } p-4 rounded-xl hover:shadow-md transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <HiMap className="text-xl text-gray-600" />
          <div>
            <h4 className="font-semibold text-gray-800">Zone {zone.zone}</h4>
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  priorityDots[zone.priority]
                }`}
              ></div>
              <span className="text-xs text-gray-600 capitalize">
                {zone.priority} priority
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-red-600">LKR {zone.due}</p>
          <p className="text-xs text-gray-500">Outstanding</p>
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ activity }) => (
  <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
      <HiCheckCircle className="text-blue-600 w-4 h-4" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
      <p className="text-xs text-gray-600">
        {activity.collector && `by ${activity.collector}`}
        {activity.zone && `in ${activity.zone}`}
        {activity.type && `${activity.type} report`}
        {activity.amount && ` • LKR ${activity.amount}`}
      </p>
      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
    </div>
  </div>
);

const ActionButton = ({ icon, text, color, onClick }) => {
  const colorClasses = {
    emerald: "bg-emerald-500 hover:bg-emerald-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    purple: "bg-purple-500 hover:bg-purple-600",
  };

  return (
    <button
      onClick={onClick}
      className={`w-full ${colorClasses[color]} text-white p-3 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2`}
    >
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

const ReportButton = ({ text, color, size = "normal" }) => {
  const colorClasses = {
    emerald:
      "text-emerald-700 border-emerald-200 bg-emerald-50 hover:bg-emerald-100",
    red: "text-red-700 border-red-200 bg-red-50 hover:bg-red-100",
    blue: "text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100",
  };

  const sizeClasses = size === "small" ? "p-3" : "p-4";

  return (
    <button
      className={`w-full border ${colorClasses[color]} ${sizeClasses} rounded-lg hover:shadow-md transition-all duration-200 flex justify-between items-center group`}
    >
      <span className="font-medium text-sm">{text}</span>
      <HiDownload className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
    </button>
  );
};

export default Dashboard;
