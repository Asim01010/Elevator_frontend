import { FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full" style={{ backgroundColor: '#F7F4ED' }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          
          {/* Column 1: MEPS & DESIGN STUDIOS */}
          <div className="space-y-2">
            <div>
              <h3 className="text-gray-800 text-lg font-bold tracking-wide">MEPS</h3>
              <p className="text-gray-500 text-xs mt-1">MY ELEVATOR DESIGN STUDIOS</p>
            </div>
          </div>
          
          {/* Column 2: PLATFORM */}
          <div>
            <h4 className="text-gray-800 font-semibold text-sm mb-3 tracking-wide">PLATFORM</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-xs transition-colors duration-300">Console</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-xs transition-colors duration-300">Title are</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-xs transition-colors duration-300">Invoices</a></li>
            </ul>
          </div>
          
          {/* Column 3: DESIGN STUDIO */}
          <div>
            <h4 className="text-gray-800 font-semibold text-sm mb-3 tracking-wide">DESIGN STUDIO</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-xs transition-colors duration-300">How it Works</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-xs transition-colors duration-300">Material Library</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-xs transition-colors duration-300">3D visualization</a></li>
            </ul>
          </div>
          
          {/* Column 4: SUPPLIERS */}
          <div>
            <h4 className="text-gray-800 font-semibold text-sm mb-3 tracking-wide">SUPPLIERS</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-xs transition-colors duration-300">Become a Supplier</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-xs transition-colors duration-300">Find Suppliers</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-xs transition-colors duration-300">For Fabricators</a></li>
            </ul>
          </div>
          
          {/* Column 5: COMPANY */}
          <div>
            <h4 className="text-gray-800 font-semibold text-sm mb-3 tracking-wide">COMPANY</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-xs transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-xs transition-colors duration-300">Careers</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-xs transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section - STAY CONNECTED & Social Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-300">
          {/* Stay Connected */}
          <div className="text-center sm:text-left mb-3 sm:mb-0">
            <h4 className="text-gray-800 font-semibold text-sm mb-2">STAY CONNECTED</h4>
            <div className="flex gap-3 justify-center sm:justify-start">
              <a 
                href="#" 
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: '#E8E0D1' }}
              >
                <FaLinkedinIn className="text-gray-600 hover:text-gray-800 text-xs" />
              </a>
              <a 
                href="#" 
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: '#E8E0D1' }}
              >
                <FaTwitter className="text-gray-600 hover:text-gray-800 text-xs" />
              </a>
              <a 
                href="#" 
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: '#E8E0D1' }}
              >
                <FaFacebookF className="text-gray-600 hover:text-gray-800 text-xs" />
              </a>
              <a 
                href="#" 
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: '#E8E0D1' }}
              >
                <FaInstagram className="text-gray-600 hover:text-gray-800 text-xs" />
              </a>
            </div>
          </div>
          
          {/* Legal Links */}
          <div className="flex gap-5 text-xs">
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center mt-6 pt-3 text-gray-400 text-xs">
          © {new Date().getFullYear()} MEPS - My Elevator Design Studios. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;