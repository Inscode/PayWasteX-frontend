import logoB from "../assets/logoBin.png"; // Your provided logo
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-green-700 flex items-center justify-between px-6 py-2 w-full min-h-[64px]">
      {/* Left: Logo & Brand */}
      <div className="flex items-center gap-4">
        <img src={logoB} alt="PayWasteX Logo" className="h-12 w-auto" />
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-white leading-tight">PayWasteX</span>
          <span className="text-sm text-green-100 font-medium">
            Track. Pay. Stay Updated
          </span>
        </div>
      </div>

      {/* Right: Lang, Notification, Profile */}
      <div className="flex items-center gap-8">
        {/* Language Switch */}
        <div className="flex gap-4 text-white text-lg font-semibold">
          <button className="hover:underline transition">සිංහල</button>
          <button className="hover:underline transition">தமிழ்</button>
        </div>
        {/* Notification Bell */}
        <button className="text-white text-2xl hover:text-green-200 transition">
          {/* Can replace with icon library if needed */}
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path d="M12 22c1.104 0 2-.896 2-2h-4a2 2 0 002 2zm6-6V11c0-3.07-1.63-5.64-5-6.32V4a1 1 0 10-2 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="white"/>
          </svg>
        </button>
        {/* User Profile */}
        <div className="relative group">
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-green-700 text-2xl transition hover:ring-2 hover:ring-green-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6"/>
            </svg>
          </button>
          {/* Dropdown on hover */}
          <div className="absolute right-0 z-10 hidden group-hover:block bg-white text-black rounded shadow-md mt-2 min-w-[140px]">
            <div className="px-4 py-2 border-b">{user?.role || "User"}</div>
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
