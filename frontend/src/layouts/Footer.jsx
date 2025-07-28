const Footer = () => (
  <footer className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-emerald-600 to-green-600 text-white overflow-hidden">
    {/* Background decorative elements */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 -translate-y-16"></div>
    </div>
    
    <div className="relative h-16 px-4 sm:px-6 flex items-center">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 w-full">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 7h-1V6a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1H1a1 1 0 0 0 0 2h1v10a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V9h1a1 1 0 0 0 0-2z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold">PayWasteX</h2>
          </div>
        </div>

        {/* Contact Info - Ultra Compact */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            </svg>
            <span className="text-emerald-100 hidden sm:inline">Anuradhapura</span>
          </div>
          
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span className="text-emerald-100">+94 25 22 222 75</span>
          </div>
          
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span className="text-emerald-100 hidden md:inline">mca.planning@gmail.com</span>
          </div>
        </div>

        {/* Emergency Hotline & Copyright */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-red-300/30">
            <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.8 5.74A10 10 0 0 0 12 3a10 10 0 0 0-7.8 2.74A2 2 0 0 0 3 7.32v2.27c0 3.81 2.65 7.41 7 8.37v1.04A1.5 1.5 0 0 0 12 20a1.5 1.5 0 0 0 1.5-1.5v-1.04c4.35-.96 7-4.56 7-8.37V7.32a2 2 0 0 0-.7-1.58Z"/>
              </svg>
            </div>
            <span className="text-sm font-bold text-white">1919</span>
          </div>
          
          <div className="text-xs text-emerald-100 hidden lg:block">
            © 2025 PayWasteX
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;