import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { createCustomer } from "../../services/authService";

const ShopOwnerRegister = () => {
  const [form, setForm] = useState({
    fullName: "",
    nicOrRegNo: "",
    email: "",
    mobile: "",
    password: "",
    businessName: "",
    businessType: "",
    address: "",
    city: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Real-time password validation when typing in confirm password field
    if (name === "confirmPassword") {
      if (value && form.password && value !== form.password) {
        setPasswordError("Passwords do not match");
      } else if (value && form.password && value === form.password) {
        setPasswordError("");
      }
    }

    // Clear error when typing in password field
    if (name === "password") {
      setPasswordError("");
    }
  };

  const validatePasswords = () => {
    if (form.password !== form.confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords before submitting
    if (!validatePasswords()) {
      return;
    }

    console.log("Input data:", form);
    try {
      const customerData = await createCustomer(form, "CUSTOMER");
      console.log("Registration successful:", customerData);

      // Clear form data after successful registration
      setForm({
        fullName: "",
        nicOrRegNo: "",
        email: "",
        mobile: "",
        password: "",
        businessName: "",
        businessType: "",
        address: "",
        city: "",
        confirmPassword: "",
      });

      // Clear password error
      setPasswordError("");

      // Show success notification
      setSuccessMessage("Registration successful! Welcome to PayWasteX!");
      setTimeout(() => setSuccessMessage(""), 4000); // Auto-hides after 4 seconds
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Success Notification */}
      {successMessage && (
        <div className="fixed top-20 right-4 z-50 animate-pulse">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}

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
                  className={`border rounded px-4 py-2 ${
                    passwordError ? "border-red-500" : ""
                  }`}
                  placeholder="Confirm Password"
                  required
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
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
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                  className="border rounded px-4 py-2"
                  placeholder="Business Name"
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
