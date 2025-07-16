import { useNavigate } from "react-router-dom";
// import robot from "../assets/robot-4041.png"; // Use your correct robot image path

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle,#BED0DB,white)] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      {/* 404 with Robot Image as "0" */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <span className="text-[220px] font-extrabold text-purple-600 animate-pulse leading-none">
          4
        </span>

        <img
          src={robot}
          alt="Robot"
          className="w-[250px] h-[250px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[350px] animate-bounce object-contain"
        />

        <span className="text-[220px] font-extrabold text-rose-600 animate-pulse leading-none">
          4
        </span>
      </div>

      {/* Message */}
      <h2 className="mb-4 text-4xl font-bold text-gray-800">
        Oops! Page Not Found
      </h2>
      <p className="max-w-xl mb-8 text-lg text-gray-700">
        Looks like this page doesn’t exist in the POS system or was moved. Let’s
        head back.
      </p>

      {/* CTA Button */}
      <button
        onClick={() => navigate("/")}
        className="px-8 py-4 bg-[#1C3F50] text-white text-lg rounded-full hover:bg-[#163240] transition"
      >
        ⬅ Back to Login
      </button>
    </div>
  );
};

export default NotFound;
