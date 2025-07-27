import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import wasteB from "../assets/wasteB.png"; // background
import logo from "../assets/logoGBin.png"; // logo
import RoleSelectionModal from "../components/RoleSelectionModal";
import { jwtDecode } from 'jwt-decode';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await login({ email, password });
    // role is now in user state, not token
    if (!user || !user.role) {
      alert("Login failed: Missing user role");
      return;
    }
    const role = user.role.toUpperCase();

    switch (role) {
      case "ADMIN":
        navigate("/admin/userManagement");
        break;
      case "SHOPOWNER":
        navigate("/shopOwner/dashboard");
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
    alert("Login failed: " + (error.response?.data?.message || error.message));
  }
};


  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Blurred, darkened background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${wasteB})`,
          filter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.6)",
          backgroundBlendMode: "darken",
        }}
      />
      {/* Content layout */}
      <div className="relative z-10 w-full max-w-8xl pl-9  mx-auto flex flex-col md:flex-row min-h-[90vh]">
        {/* LEFT: Brand Section (not a card) */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-8 md:py-16 text-white relative">
          {/* Black overlay for readability */}
          <div className="absolute inset-0 pointer-events-none rounded-l-xl" />
          <div className="relative z-10">
            {/* Logo + Welcome */}
            <div className="flex flex-row items-start gap-6 mb-4">
              <img
                src={logo}
                alt="Logo"
                className="w-20 md:w-28 mt-2 drop-shadow-2xl"
              />
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-2 leading-tight drop-shadow-lg">
                  WELCOME
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">
                  ආයුබෝවන් <br /> வரவேற்பு
                </h3>
              </div>
            </div>
            {/* Highlighted Description */}
            <p className="mb-4 text-lg font-semibold text-green-100 drop-shadow-lg">
              Easily track your waste fee bills, payment history, and
              outstanding dues all in one secure place.
              {/* <br /> */}
              <span className="text-white">
                Log in to manage your records, view invoices, and stay updated
                with council notifications.
              </span>
            </p>
            <br />
            {/* Multilingual Subs */}
            <p className="mb-2 text-xs md:text-base text-white drop-shadow-lg">
              ඔබේ අපද්‍රව්‍ය ගාස්තු බිල්පත්, ගෙවීම් ඉතිහාසය සහ නියමිත ගෙවීම්
              සියල්ල එකිනෙකා ආරක්ෂිත ස්ථානයක කළමනාකරණය කරන්න. ඔබගේ වාර්තා
              කළමනාකරණය කිරීමට, ඉන්වොයිස් බැලීමට සහ පවුල් නිලධාරීන්ගෙන් නිවේදන
              ලබා ගැනීමට මෙහි පිවිසෙන්න.
            </p>
            <br />
            <p className="text-xs md:text-base text-white drop-shadow-lg">
              உங்கள் கழிவு கட்டண பில்கள், கட்டண வரலாறு மற்றும் நிலுவைத் தொகைகளை
              அனைத்தையும் ஒரு பாதுகாப்பான இடத்தில் எளிதாகக் கண்காணியுங்கள்.
              உங்கள் பதிவுகளை நிர்வகிக்க, இன்வாய்ஸ்களைப் பார்க்க மற்றும்
              கவுன்சிலில் அறிவிப்புகளுடன் புதுப்பித்த நிலையில் இருக்க
              உள்நுழையவும்.
            </p>
          </div>
        </div>

        {/* RIGHT: Login Card */}
        <div className="flex-1 flex flex-col justify-center items-center min-h-[700px] px-1 py-1 md:p-10">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl flex flex-col gap-5 bg-black/30 rounded-2xl shadow-2xl p-10"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-4">
              SIGN IN
            </h3>
            <label className="block text-white font-semibold mb-1">
              <span className="text-red-400">*</span> Email / බරව්ය නාමය /
              பயனர்பெயர்
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded border border-gray-400 focus:border-green-500 focus:ring-green-500 bg-white text-black px-3 py-2"
                placeholder="Enter your Email"
              />
            </label>
            <label className="block text-white font-semibold mb-1">
              <span className="text-red-400">*</span> Password / මුරපදය /
              கடவுச்சொல்
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded border border-gray-400 focus:border-green-500 focus:ring-green-500 bg-white text-black px-3 py-2"
                placeholder="Enter your password"
              />
            </label>
            <div className="flex items-center text-white text-sm">
              <input type="checkbox" id="keep-logged" className="mr-2" />
              <label htmlFor="keep-logged">Keep me logged in</label>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition"
            >
              LOGIN
            </button>
            <div className="flex justify-between text-xs text-gray-300">
              <a href="#" className="hover:underline">
                Forget Password?
              </a>
              <span>
                Not registered yet?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                  className="hover:underline text-green-300"
                >
                  Create An Account
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
              <span>Sign In using google account</span>
            </button>
          </form>
        </div>
      </div>
      {showModal && <RoleSelectionModal onClose={() => setShowModal(false)} />}

    </div>
  );
}
