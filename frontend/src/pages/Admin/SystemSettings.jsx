import React from "react";

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

export default function SystemSettingsPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-8">
     
      {/* Email Notification Table */}
      <h2 className="text-xl font-bold text-green-800 mb-4">
        E Mail Notification Configuration
      </h2>
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-gray-50 border border-gray-300 rounded">
          <thead className="bg-gray-100 ">
            <tr className="text-left text-gray-700 font-semibold">
              <th className="px-4 py-2 border-b">Message Template</th>
              <th className="px-4 py-2 border-b">Subject Line</th>
              <th className="px-4 py-2 border-b">Trigger Condition</th>
              <th className="px-4 py-2 border-b">Integration Settings</th>
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
                    Edit
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
        <span className="font-semibold text-gray-700">Message Template: </span>
        {row.template}
      </div>
      <div className="mb-2">
        <span className="font-semibold text-gray-700">Subject Line: </span>
        <input
          type="text"
          defaultValue={row.subject}
          className="border px-3 py-1 rounded w-full mt-1"
        />
      </div>
      <div className="mb-2">
        <span className="font-semibold text-gray-700">Trigger Condition: </span>
        {row.condition}
      </div>
      <div>
        <span className="font-semibold text-gray-700">Integration Settings: </span>
        <span className="text-blue-600 font-medium cursor-pointer hover:underline ml-1">
          Edit
        </span>
      </div>
    </div>
  ))}
</div>


      {/* Data Management Buttons */}
      <h2 className="text-xl font-bold text-green-800 mt-10 mb-4">
        Data Management
      </h2>
      <div className="bg-gray-100 p-6 rounded flex flex-wrap gap-4">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold">
          Export Data
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold">
          Backup Database
        </button>
        <button className="bg-white hover:bg-gray-100 border px-6 py-2 rounded font-semibold">
          Integration Settings
        </button>
        <p className="text-sm text-gray-500 mt-2 w-full">
          (To Excel / PDF)
        </p>
      </div>
    </div>
  );
}
