import Header from "./Header";
import RoleButtonGroup from "../components/RoleButtonGroup";
import { Outlet } from "react-router-dom";

const AppLayout = () => (
  <div className="flex flex-col min-h-screen bg-[#222]">
    <Header />
    <main className="flex-1 p-6 bg-white">
      {/* Role-based button group at the top of the main area */}
      <RoleButtonGroup />
      {/* Main content (e.g. dashboard/cards/pages) */}
      <Outlet />
    </main>
    <footer className="bg-green-500 text-white p-4 text-sm flex flex-col md:flex-row justify-between items-center">
      <span className="font-bold text-2xl md:text-xl mb-2 md:mb-0">PayWasteX</span>
      <div className="flex flex-col md:flex-row md:gap-6 gap-2 items-center">
        <div>
          <div className="font-bold">Address</div>
          <div>Maithripala Senanayake Mawatha, Anuradhapura.</div>
        </div>
        <div>
          <div className="font-bold">Phone No</div>
          <div>+94 25 22 222 75 / 76</div>
          <div className="font-bold">Email</div>
          <div>mca.planning@gmail.com</div>
        </div>
        <div>
          <div className="font-bold">Know More</div>
          <div className="text-xs max-w-xs">
            PayWasteX helps citizens and councils manage waste fee payments digitally with full transparency, real-time tracking, and secure access.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">Call</span>
          <span className="text-2xl font-mono">1919</span>
        </div>
      </div>
    </footer>
    <div className="text-xs text-center text-green-900 py-1 bg-green-200">
      © 2025 PayWasteX. All rights reserved.
    </div>
  </div>
);

export default AppLayout;
