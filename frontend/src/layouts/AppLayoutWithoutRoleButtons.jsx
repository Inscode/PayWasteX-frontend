// src/layouts/AppLayoutWithoutRoleButtons.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AppLayoutWithoutRoleButtons = () => {
  const { user } = useAuth();
  const isShopOwner = user?.role === "shopOwner";

  return (
    <div className="flex flex-col min-h-screen bg-[#222]">
      {/* fixed header */}
      <Header />

      {/* no RoleButtonGroup here */}
      <main className="flex-1 overflow-auto pb-16 px-6 bg-white">
        <Outlet />
      </main>

      {/* fixed footer for shopOwner */}
      {isShopOwner && (
        <div className="fixed bottom-0 left-0 w-full">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default AppLayoutWithoutRoleButtons;
