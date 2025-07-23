import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const auditLogs = [
  {
    timestamp: "2025/01/12 10:20:12 am",
    user: "Sugath Perera",
    action: "Created User",
    module: "User Management",
    description: "Added new fee collector",
    ip: "192.168.1.10",
  },
  {
    timestamp: "2025/01/12 10:20:12 am",
    user: "Mahesh Kumara",
    action: "Created User",
    module: "User Management",
    description: "Added new fee collector",
    ip: "192.168.1.10",
  },
  {
    timestamp: "2025/01/12 10:20:12 am",
    user: "M S S M Hashan",
    action: "Created User",
    module: "User Management",
    description: "Added new fee collector",
    ip: "192.168.1.10",
  },
  {
    timestamp: "2025/01/12 10:20:12 am",
    user: "A A Rasik",
    action: "Created User",
    module: "User Management",
    description: "Added new fee collector",
    ip: "192.168.1.10",
  },
  {
    timestamp: "2025/01/12 10:20:12 am",
    user: "Sisira Nirmal",
    action: "Created User",
    module: "User Management",
    description: "Added new fee collector",
    ip: "192.168.1.10",
  },
];

export default function AuditLogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      

 {/* Filters */}
<div className="flex flex-col md:flex-row flex-wrap gap-3 mb-4">
  <input
    type="text"
    placeholder="Search"
    className="border px-4 py-2 rounded w-full md:w-[43.5rem]"
  />
  <div className="relative w-full md:w-48">
    <select className="appearance-none w-full border px-3 py-2 rounded pr-6">
      <option>User</option>
    </select>
    <FiChevronDown className="absolute right-2 top-3 text-gray-500 pointer-events-none" />
  </div>
  <div className="relative w-full md:w-48">
    <select className="appearance-none w-full border px-3 py-2 rounded pr-6">
      <option>Action Type</option>
    </select>
    <FiChevronDown className="absolute right-2 top-3 text-gray-500 pointer-events-none" />
  </div>
  <div className="relative w-full md:w-48">
    <select className="appearance-none w-full border px-3 py-2 rounded pr-6">
      <option>Module</option>
    </select>
    <FiChevronDown className="absolute right-2 top-3 text-gray-500 pointer-events-none" />
  </div>
  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full md:w-24">
    Filter
  </button>
</div>


      {/* Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-gray-50 border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700 font-semibold">
              <th className="px-4 py-2 border-b">Timestamp</th>
              <th className="px-4 py-2 border-b">User</th>
              <th className="px-4 py-2 border-b">Action Performed</th>
              <th className="px-4 py-2 border-b">Module</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">IP Address</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs
              .slice(
                (currentPage - 1) * logsPerPage,
                currentPage * logsPerPage
              )
              .map((log, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 text-sm">
                  <td className="px-4 py-2 ">{log.timestamp}</td>
                  <td className="px-4 py-2 ">{log.user}</td>
                  <td className="px-4 py-2">{log.action}</td>
                  <td className="px-4 py-2">{log.module}</td>
                  <td className="px-4 py-2">{log.description}</td>
                  <td className="px-4 py-2">{log.ip}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
<div className="md:hidden space-y-4">
  {auditLogs
    .slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage)
    .map((log, index) => (
      <div key={index} className="bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-sm text-sm">
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Timestamp: </span>
          {log.timestamp}
        </div>
        <div className="mb-2">
          <span className="font-semibold text-gray-700">User: </span>
          {log.user}
        </div>
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Action: </span>
          {log.action}
        </div>
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Module: </span>
          {log.module}
        </div>
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Description: </span>
          {log.description}
        </div>
        <div>
          <span className="font-semibold text-gray-700">IP Address: </span>
          {log.ip}
        </div>
      </div>
    ))}
</div>


      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-8 h-8 rounded text-sm font-semibold ${
              currentPage === page
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-800"
            }`}
          >
            {page}
          </button>
        ))}
        <span className="text-green-600 text-xl">&gt;</span>
      </div>
    </div>
  );
}
