// src/layouts/AppLayout.jsx
import React from "react";
import Header from "./Header";
import RoleButtonGroup from "../components/RoleButtonGroup";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AppLayout = () => {
  const { user } = useAuth();
  const isShopOwner = user?.role === "shopOwner";

  return (
    <div className="flex flex-col min-h-screen bg-[#222]">
      {/* fixed header */}
      <Header />

      {/* container for buttons + scrollable area */}
      <div className="flex-1 flex flex-col">
        {/* sticky RoleButtonGroup just below header */}
        <div className="sticky top-12 sm:top-16 z-40 bg-white px-6">
          <RoleButtonGroup />
        </div>

        {/* this is the only scrollable region */}
        <main className="flex-1 overflow-auto pb-16 px-6 bg-white">
          <Outlet />
        </main>
      </div>

      {/* fixed footer for shopOwner */}
      {isShopOwner && (
        <div className="fixed bottom-0 left-0 w-full">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default AppLayout;
