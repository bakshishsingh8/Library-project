import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    // Changed rounded-2xl to rounded-t-2xl if it sits at the very bottom, 
    // or kept rounded-2xl if it's a floating card. Added text-gray-800 for better default contrast.
    <footer className="bg-gradient-to-t from-orange-200 via-amber-100 to-orange-200 py-8 md:py-10 rounded-2xl text-gray-800">
      
      {/* Grid Layout: 
          - Mobile: 1 column (stack everything)
          - Small Tablet: 2 columns (2x2 grid)
          - Desktop: 4 columns (1 row)
          - Added text-center for mobile, text-left for desktop (md:text-left) 
      */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-center md:text-left">

        {/* Logo & About */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold text-amber-700 mb-3">BookHaven Library</h2>
          <p className="text-sm leading-6 max-w-xs mx-auto md:mx-0">
            Discover, explore, and enjoy a world full of stories and knowledge. Begin your reading adventure today!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-amber-700 mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
                <a href="/welcome" className="hover:text-amber-600 transition-colors duration-300 block py-1 md:py-0">Home</a>
            </li>
            <li>
                <a href="/about" className="hover:text-amber-600 transition-colors duration-300 block py-1 md:py-0">About Us</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-amber-700 mb-3">Contact</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <i className="fas fa-phone text-amber-600"></i> 
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <i className="fas fa-envelope text-amber-600"></i> 
              <span className="break-all">info@bookhavenlibrary.com</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <i className="fas fa-map-marker-alt text-amber-600"></i> 
              <span>New Delhi, India</span>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-amber-700 mb-3">Follow Us</h3>
          {/* Increased spacing and touch targets for mobile */}
          <div className="flex justify-center md:justify-start gap-6 md:gap-4 mt-1">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-2xl md:text-xl text-gray-700 hover:text-blue-600 transition-transform hover:-translate-y-1 duration-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-2xl md:text-xl text-gray-700 hover:text-pink-600 transition-transform hover:-translate-y-1 duration-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://x.com/?lang=en" target="_blank" rel="noopener noreferrer" className="text-2xl md:text-xl text-gray-700 hover:text-black transition-transform hover:-translate-y-1 duration-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-2xl md:text-xl text-gray-700 hover:text-red-600 transition-transform hover:-translate-y-1 duration-300">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-8 md:mt-10 border-t border-amber-900/10 pt-6 px-4 text-center">
        <p className="text-xs sm:text-sm text-gray-600">
          © 2025 BookHaven Library. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;