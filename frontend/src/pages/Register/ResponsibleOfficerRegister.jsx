import React, { useState } from "react";

const ResponsibleOfficerRegister = () => {
  const [form, setForm] = useState({
    fullName: "",
    nic: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add validation and submission logic
    alert("Registered!");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-green-700 py-6 px-4">
        <h2 className="text-white text-3xl font-bold text-center">
          Register As A Responsible Officer
        </h2>
      </div>
      {/* Form */}
      <div className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-3xl w-full flex flex-col"
        >
          <h3 className="font-bold text-lg mb-4">Personal Information</h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="border rounded px-4 py-2"
              placeholder="Full Name"
              required
            />
            <input
              type="text"
              name="nic"
              value={form.nic}
              onChange={handleChange}
              className="border rounded px-4 py-2"
              placeholder="NIC"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border rounded px-4 py-2"
              placeholder="Email Address"
              required
            />
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="border rounded px-4 py-2"
              placeholder="Mobile No"
              required
            />
            {/* Passwords row */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="border rounded px-4 py-2 flex-1"
                placeholder="Password"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="border rounded px-4 py-2 flex-1"
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>
          {/* Register Button */}
          <button
            type="submit"
            className="mt-10 bg-green-700 hover:bg-green-800 text-white text-xl font-bold py-4 rounded-xl w-2/3 mx-auto transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResponsibleOfficerRegister;
