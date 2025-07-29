import React, { useState } from "react";

const ShopOwnerRegister = () => {
  const [form, setForm] = useState({
    fullName: "",
    nicOrRegNo: "",
    email: "",
    mobile: "",
    password: "",
    shopName: "",
    businessType: "",
    address: "",
    city: "",
    confirmPassword: "",
  });

  //   const businessTypes = [
  //     "Grocery",
  //     "Bakery",
  //     "Clothing",
  //     "Pharmacy",
  //     "Other",
  //   ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: validation & submit logic here
    alert("Registered!");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-green-700 py-6 px-4">
        <h2 className="text-white text-3xl font-bold text-center">
          Register As A Customer
        </h2>
      </div>
      {/* Form */}
      <div className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-4xl w-full flex flex-col"
        >
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Personal Information */}
            <div className="flex-1">
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
                  name="nicOrRegNo"
                  value={form.nicOrRegNo}
                  onChange={handleChange}
                  className="border rounded px-4 py-2"
                  placeholder="NIC or Business Registration No"
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
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="border rounded px-4 py-2"
                  placeholder="Password"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="border rounded px-4 py-2"
                  placeholder="Confirm Password"
                  required
                />
              </div>
            </div>
            {/* Shop & Location Information */}
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-4">
                Shop & Location Information
              </h3>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  name="shopName"
                  value={form.shopName}
                  onChange={handleChange}
                  className="border rounded px-4 py-2"
                  placeholder="Shop Name"
                  required
                />
                <input
                  name="businessType"
                  value={form.businessType}
                  onChange={handleChange}
                  className="border rounded px-4 py-2 bg-white"
                  placeholder="Business Type"
                  required
                ></input>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="border rounded px-4 py-2"
                  placeholder="Street Address"
                  required
                />
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="border rounded px-4 py-2"
                  placeholder="City /Town"
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
              </div>
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

export default ShopOwnerRegister;
