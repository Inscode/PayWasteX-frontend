import { useNavigate } from "react-router-dom";
import { HiExclamationTriangle, HiHome } from "react-icons/hi2";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      {/* 404 with Robot Emoji/Icon as "0" */}
      <div className="flex items-center justify-center gap-6 mb-8">
        <span className="text-[120px] md:text-[180px] lg:text-[220px] font-extrabold text-purple-600 animate-pulse leading-none">
          4
        </span>

        {/* Robot Icon/Emoji instead of image */}
        <div className="relative">
          <div className="w-[120px] h-[120px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center animate-bounce shadow-2xl">
            <span className="text-[60px] md:text-[100px] lg:text-[120px]">🤖</span>
          </div>
          {/* Floating elements for more dynamic feel */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>

        <span className="text-[120px] md:text-[180px] lg:text-[220px] font-extrabold text-rose-600 animate-pulse leading-none">
          4
        </span>
      </div>

      {/* Error Icon */}
      <div className="mb-6">
        <HiExclamationTriangle className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
      </div>

      {/* Message */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 max-w-2xl">
        <h2 className="mb-4 text-3xl md:text-4xl font-bold text-gray-800">
          Oops! Page Not Found
        </h2>
        <p className="mb-6 text-lg text-gray-700 leading-relaxed">
          Looks like this page doesn't exist in the  system or was moved. 
          Our robot friend couldn't find what you're looking for!
        </p>

        {/* Additional Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Check the URL for typos or use the navigation menu to find what you need.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg rounded-xl hover:from-blue-600 hover:to-indigo-700 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
          >
            <HiHome className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-gray-700 text-lg rounded-xl border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Go Back</span>
          </button>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="fixed top-10 left-10 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-60"></div>
      <div className="fixed top-20 right-20 w-3 h-3 bg-red-400 rounded-full animate-pulse opacity-60"></div>
      <div className="fixed bottom-20 left-20 w-5 h-5 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
      <div className="fixed bottom-10 right-10 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-60"></div>
    </div>
  );
};

export default NotFound;