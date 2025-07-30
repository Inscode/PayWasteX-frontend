import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext"; // ✅ Use language context
import wasteB from "../assets/wasteB.png";
import logo from "../assets/logoGBin.png";
import RoleSelectionModal from "../components/RoleSelectionModal";
import { jwtDecode } from "jwt-decode";

const translations = {
  en: {
    welcome: "WELCOME",
    sub: "Easily track your waste fee bills, payment history, and outstanding dues all in one secure place.",
    loginBtn: "LOGIN",
    signin: "SIGN IN",
    email: "Email",
    password: "Password",
    keepMe: "Keep me logged in",
    forgot: "Forget Password?",
    notRegistered: "Not registered yet?",
    createAccount: "Create An Account",
    google: "Sign In using Google",
    langLabel: "🌐 English",
  },
  si: {
    welcome: "ආයුබෝවන්",
    sub: "ඔබේ අපද්‍රව්‍ය ගාස්තු බිල්පත්, ගෙවීම් ඉතිහාසය සහ නියමිත ගෙවීම් කළමනාකරණය කරන්න.",
    loginBtn: "ඇතුල් වන්න",
    signin: "පිවිසුම",
    email: "ඊමේල්",
    password: "මුරපදය",
    keepMe: "ඇතුල්ව සිටීම තබා ගන්න",
    forgot: "මුරපදය අමතකද?",
    notRegistered: "තවමත් ලියාපදිංචි වී නැද්ද?",
    createAccount: "ගිණුමක් සාදන්න",
    google: "Google හරහා පිවිසෙන්න",
    langLabel: "🌐 සිංහල",
  },
  ta: {
    welcome: "வரவேற்பு",
    sub: "உங்கள் கழிவு கட்டண பில்கள் மற்றும் நிலுவைத் தொகைகளை கண்காணியுங்கள்.",
    loginBtn: "உள்நுழைய",
    signin: "உள்நுழைவு",
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    keepMe: "என்னை உள்நுழைந்திருக்கச் செய்",
    forgot: "கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
    notRegistered: "இன்னும் பதிவு செய்யவில்லை?",
    createAccount: "கணக்கை உருவாக்குங்கள்",
    google: "Google கணக்கில் உள்நுழையவும்",
    langLabel: "🌐 தமிழ்",
  },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { lang, setLang } = useLanguage();
  const t = translations[lang];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ email, password }); // ✅ use returned value
      console.log("🔍 Full login response from backend:", res);
      const role = res?.role;

      if (!role) {
        alert("Login failed: Missing user role");
        return;
      }

      console.log("user", res);
      switch (role.toUpperCase()) {
        case "ADMIN":
          navigate("/admin/userManagement");
          break;
        case "CUSTOMER":
          navigate("/customer/dashboard");
          break;
        case "RESPONSIBLEOFFICER":
          navigate("/responsibleOfficer/dashboard");
          break;
        case "FEECOLLECTOR":
          navigate("/feeCollector/dashboard");
          break;
        default:
          navigate("/login");
      }
    } catch (error) {
      alert(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const cycleLanguage = () => {
    const order = ["en", "si", "ta"];
    const nextLang = order[(order.indexOf(lang) + 1) % order.length];
    setLang(nextLang);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${wasteB})`,
          filter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.6)",
          backgroundBlendMode: "darken",
        }}
      />

      {/* Language Switch Button */}
      <div className="absolute top-4 right-6 z-20">
        <button
          onClick={cycleLanguage}
          className="bg-white/20 text-white text-xs sm:text-sm px-3 py-1 rounded hover:bg-white/30 transition flex items-center gap-1"
          title="Switch Language"
          aria-label="Switch Language"
        >
          🌐{" "}
          {lang === "en"
            ? "English"
            : lang === "si"
            ? "සිංහල"
            : lang === "ta"
            ? "தமிழ்"
            : "English"}
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-8xl pl-9 mx-auto flex flex-col md:flex-row min-h-[90vh] animate-fade-in">
        {/* Left - Branding */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-8 md:py-16 text-white relative">
          <div className="relative z-10">
            <div className="flex flex-row items-start gap-6 mb-4">
              <img
                src={logo}
                alt="Logo"
                className="w-20 md:w-28 mt-2 drop-shadow-2xl"
              />
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-2 leading-tight drop-shadow-lg">
                  {t.welcome}
                </h2>
              </div>
            </div>
            <p className="mb-4 text-lg font-semibold text-green-100 drop-shadow-lg">
              {t.sub}
            </p>
          </div>
        </div>

        {/* Right - Login Form */}
        <div className="flex-1 flex flex-col justify-center items-center min-h-[700px] px-1 py-1 md:p-10">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl flex flex-col gap-5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10"
          >
            <h3 className="text-3xl font-bold text-white text-center mb-4 drop-shadow">
              {t.signin}
            </h3>

            <label className="block text-white font-semibold text-sm">
              <span className="text-red-400">*</span> {t.email}
              <input
                type="text"
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-400 focus:border-green-500 focus:ring-green-500 bg-white text-black px-3 py-2 shadow-sm"
                placeholder={t.email}
              />
            </label>

            <label className="block text-white font-semibold text-sm">
              <span className="text-red-400">*</span> {t.password}
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-400 focus:border-green-500 focus:ring-green-500 bg-white text-black px-3 py-2 shadow-sm"
                placeholder={t.password}
              />
            </label>

            <div className="flex items-center text-white text-sm">
              <input type="checkbox" id="keep-logged" className="mr-2" />
              <label htmlFor="keep-logged">{t.keepMe}</label>
            </div>

            <button
              type="submit"
              disabled={!email || !password || loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition-all disabled:opacity-50"
            >
              {loading ? "..." : t.loginBtn}
            </button>

            <div className="flex justify-between text-xs text-gray-300">
              <a href="#" className="hover:underline">
                {t.forgot}
              </a>
              <span>
                {t.notRegistered}{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                  className="hover:underline text-green-300"
                >
                  {t.createAccount}
                </a>
              </span>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded py-2 shadow hover:bg-gray-50 mt-2"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span>{t.google}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && <RoleSelectionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
