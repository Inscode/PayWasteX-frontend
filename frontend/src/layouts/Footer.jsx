const Footer = () => (
  <footer className="bg-[#69e36c] border-t border-green-700 text-black text-xs md:text-sm">
    <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-2 gap-x-4 gap-y-1">
      {/* Left: Brand */}
      <span className="font-extrabold text-xl md:text-2xl">PayWasteX</span>
      {/* Address & Contact */}
      <div className="flex flex-col md:flex-row md:gap-4 items-center text-center md:text-left">
        <div>
          <span className="font-bold">Address:</span> Maithripala Senanayake Mawatha, Anuradhapura.
        </div>
        <div>
          <span className="font-bold">Phone:</span> +94 25 22 222 75 / 76
          {"  "} <span className="font-bold ml-2">Email:</span> mca.planning@gmail.com
        </div>
      </div>
      {/* Info & Hotline */}
      <div className="flex flex-col md:flex-row md:gap-3 items-center">
        <div className="max-w-xs md:text-xs text-[11px]">
          <span className="font-bold">Know More:</span> PayWasteX helps citizens and councils manage waste fee payments digitally with full transparency, real-time tracking, and secure access.
        </div>
        <span className="flex items-center gap-1 font-bold text-lg md:text-xl">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="black"><path d="M19.8 5.74A10 10 0 0 0 12 3a10 10 0 0 0-7.8 2.74A2 2 0 0 0 3 7.32v2.27c0 3.81 2.65 7.41 7 8.37v1.04A1.5 1.5 0 0 0 12 20a1.5 1.5 0 0 0 1.5-1.5v-1.04c4.35-.96 7-4.56 7-8.37V7.32a2 2 0 0 0-.7-1.58ZM5 8.39V7.32c0-.27.11-.53.29-.71A8 8 0 0 1 12 5a8 8 0 0 1 6.71 1.61c.18.18.29.44.29.71v1.07c0 3.38-2.31 6.63-7 7.58-4.69-.95-7-4.2-7-7.58ZM12 18a.5.5 0 0 1-.5-.5v-.77c.16.01.33.02.5.02s.34-.01.5-.02v.77A.5.5 0 0 1 12 18Zm0-4.36c2.2 0 4-1.79 4-4 0-.83-.67-1.5-1.5-1.5-.53 0-1 .29-1.27.72A1.495 1.495 0 0 0 10 8.5c-.83 0-1.5.67-1.5 1.5 0 2.21 1.8 4 4 4Z"/></svg>
          <span>1919</span>
        </span>
      </div>
    </div>
    <div className="w-full text-center text-[11px] text-green-900 pb-1">© 2025 PayWasteX. All rights reserved.</div>
  </footer>
);

export default Footer;
