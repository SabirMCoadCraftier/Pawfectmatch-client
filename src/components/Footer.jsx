import { Link } from 'react-router-dom';
import { FaPaw, FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <FaPaw className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-white">PawfectMatch</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Connecting loving families with their perfect furry companions. Every
              pet deserves a forever home.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500 transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500 transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500 transition-colors"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-pink-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pets" className="hover:text-pink-400 transition-colors text-sm">
                  All Pets
                </Link>
              </li>
              <li>
                <Link to="/add-pet" className="hover:text-pink-400 transition-colors text-sm">
                  Add Pet
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <FaEnvelope className="text-pink-400" />
                contact@pawfectmatch.com
              </li>
              <li className="flex items-center gap-2 text-sm">
                <FaPhone className="text-pink-400" />
                +1 (555) 123-4567
              </li>
              <li className="text-sm">
                123 Pet Street, Animal City, AC 12345
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Stay Updated
            </h3>
            <p className="text-sm mb-4">
              Subscribe to get updates on new pets and adoption events.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered input-sm w-full bg-gray-800 border-gray-700 text-white text-sm"
              />
              <button className="btn btn-pink btn-sm bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} PawfectMatch. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <FaHeart className="text-pink-500" /> for pets everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
