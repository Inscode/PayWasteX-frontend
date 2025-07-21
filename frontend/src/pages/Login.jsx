import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import wasteB from "../assets/wasteB.png"; // background
import logo from "../assets/logoGBin.png"; // logo
import RoleSelectionModal from "../components/RoleSelectionModal";

export default function Login() {
  /* ---------------- state & helpers ---------------- */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRoleModal, setShowRoleModal] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: username || "User", role: "admin" });
    navigate("/admin/dashboard");
  };

  /* ---------------- ui ---------------- */
  return (
    <div className="relative min-h-screen w-full flex items-start md:items-center justify-center overflow-hidden bg-black/70">
      {/* --- blurred dark background image --- */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${wasteB})`,
          filter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.6)",
          backgroundBlendMode: "darken",
        }}
      />

      {/* --- content wrapper --- */}
      <div className="relative z-10 w-full max-w-8xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-screen md:min-h-[90vh]">
          {/* ---------- LEFT brand section ---------- */}
          <div className="w-full md:w-1/2 flex flex-col justify-center md:items-start items-center px-4 py-4 md:px-16 md:py-12 text-white">
            {/* logo + headline row */}
            <div className="flex flex-row items-center gap-3 md:gap-4 mb-2 w-full justify-center md:justify-start">
              <img
                src={logo}
                alt="Logo"
                className="w-14 md:w-24 mt-2 drop-shadow-2xl"
              />

              <div className="flex flex-col items-start">
                {/* desktop/tablet headline */}
                <h2 className="hidden md:block text-5xl font-extrabold leading-tight drop-shadow-lg">
                  WELCOME
                </h2>
                <h3 className="hidden md:block text-3xl font-bold drop-shadow-lg">
                  ආයුබෝවන් <br /> வரவேற்பு
                </h3>

                {/* mobile headline: paywasteX */}
                <h2 className="md:hidden text-2xl font-extrabold leading-tight drop-shadow-lg text-center">
                  paywasteX
                </h2>
              </div>
            </div>

            {/* long descriptions visible only on md+ */}
            <div className="hidden md:block">
              <p className="mb-4 text-lg font-semibold text-green-100 drop-shadow-lg">
                Easily track your waste fee bills, payment history, and
                outstanding dues all in one secure place. Log in to manage your
                records, view invoices, and stay updated with council
                notifications.
              </p>
              <p className="mb-2 text-base drop-shadow-lg">
                ඔබේ අපද්‍රව්‍ය ගාස්තු බිල්පත්, ගෙවීම් ඉතිහාසය සහ නියමිත ගෙවීම්
                සියල්ල එකිනෙකා ආරක්ෂිත ස්ථානයක කළමනාකරණය කරන්න. ඔබගේ වාර්තා
                කළමනාකරණය කිරීමට, ඉන්වොයිස් බැලීමට සහ පවුල් නිලධාරීන්ගෙන් නිවේදන
                ලබා ගැනීමට මෙහි පිවිසෙන්න.
              </p>
              <p className="text-base drop-shadow-lg">
                உங்கள் கழிவு கட்டண பில்கள், கட்டண வரலாறு மற்றும் நிலுவைத்
                தொகைகளை அனைத்தையும் ஒரு பாதுகாப்பான இடத்தில் எளிதாகக்
                கண்காணியுங்கள். உங்கள் பதிவுகளை நிர்வகிக்க, இன்வாய்ஸ்களைப்
                பார்க்க மற்றும் கவுன்சிலில் அறிவிப்புகளுடன் புதுப்பித்த நிலையில்
                இருக்க உள்நுழையவும்.{" "}
              </p>
            </div>
          </div>

          {/* ---------- RIGHT login card ---------- */}
          <div className="w-full md:w-1/2 flex-1 flex flex-col justify-start md:justify-center items-center px-2 pt-2 pb-0 md:p-10">
            <form
              onSubmit={handleSubmit}
              className="w-full md:max-w-xl flex flex-col gap-3 bg-black/60 rounded-2xl shadow-lg shadow-black/40 p-6 md:p-10"
            >
              <h3 className="text-2xl font-bold text-white text-center mb-2">
                SIGN IN
              </h3>

              {/* username */}
              <label className="block text-white font-semibold">
                <span className="text-red-400">*</span> Username / බරව්ය නාමය /
                பயனர்பெயர்
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="mt-1 block w-full rounded border border-gray-400 bg-white text-black px-3 py-2 focus:border-green-500 focus:ring-green-500"
                />
              </label>

              {/* password */}
              <label className="block text-white font-semibold">
                <span className="text-red-400">*</span> Password / මුරපදය /
                கடவுச்சொல்
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1 block w-full rounded border border-gray-400 bg-white text-black px-3 py-2 focus:border-green-500 focus:ring-green-500"
                />
              </label>

              {/* keep‑logged‑in */}
              <div className="flex items-center text-white text-sm">
                <input type="checkbox" id="keep-logged" className="mr-2" />
                <label htmlFor="keep-logged">Keep me logged in</label>
              </div>

              {/* login btn */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition"
              >
                LOGIN
              </button>

              {/* links */}
              <div className="flex flex-col md:flex-row justify-between text-xs text-gray-300 gap-2">
                <a href="#" className="hover:underline">
                  Forget Password?
                </a>
                <span>
                  Not registered yet?{" "}
                  <button
                    type="button"
                    onClick={() => setShowRoleModal(true)}
                    className="hover:underline text-green-300"
                  >
                    Create An Account
                  </button>
                </span>
              </div>

              {/* google sign‑in */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded py-2 shadow hover:bg-gray-50 mt-2"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span>Sign In using Google account</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* --- role‑selection modal --- */}
      {showRoleModal && (
        <RoleSelectionModal onClose={() => setShowRoleModal(false)} />
      )}
    </div>
  );
}
