import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-green-700 flex items-center justify-between px-6 py-4">
      {/* Brand */}
      <div className="flex items-center gap-3">
        {/* Replace with your logo if available */}
        <div className="bg-white rounded p-2 mr-2">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            {/* Simple SVG icon */}
            <rect width="24" height="24" rx="6" fill="#4ade80" />
            <path d="M8 12l2 2l4-4" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-2xl font-bold text-white">PayWasteX</span>
        <span className="text-xs text-green-100 font-medium ml-2 hidden md:inline">
          Track. Pay. Stay Updated.
        </span>
      </div>

      {/* Right-side controls */}
      <div className="flex items-center gap-6">
        {/* Language Switcher */}
        <div className="flex gap-2 text-white text-base">
          <button className="hover:underline px-2 py-1 rounded">සිංහල</button>
          <button className="hover:underline px-2 py-1 rounded">தமிழ்</button>
        </div>
        {/* Notification Bell (icon only for now) */}
        <button className="text-white text-2xl hover:text-green-200 transition">
          <span role="img" aria-label="bell">🔔</span>
        </button>
        {/* Profile dropdown (basic version) */}
        <div className="relative group">
          <button className="w-9 h-9 rounded-full bg-green-900 flex items-center justify-center text-white text-xl hover:bg-green-800">
            <span role="img" aria-label="user">👤</span>
          </button>
          <div className="absolute right-0 z-10 hidden group-hover:block bg-white text-black rounded shadow-md mt-2 min-w-[120px]">
            <div className="px-4 py-2">{user?.role}</div>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
