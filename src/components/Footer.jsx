import { Link } from 'react-router-dom';
import { FaPaw, FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-400 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand & Socials */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/10">
                <FaPaw className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                PawfectMatch
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 font-medium">
              Connecting loving families with their perfect furry companions. Every
              pet deserves a forever home.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white hover:bg-pink-500 hover:border-pink-500 transition-all duration-300 shadow-sm"
              >
                <FaFacebook size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white hover:bg-pink-500 hover:border-pink-500 transition-all duration-300 shadow-sm"
              >
                <FaTwitter size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white hover:bg-pink-500 hover:border-pink-500 transition-all duration-300 shadow-sm"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold tracking-wide text-sm uppercase mb-5">Quick Links</h3>
            <ul className="space-y-3.5">
              <li>
                <Link to="/" className="text-slate-400 hover:text-pink-400 transition-colors text-sm font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pets" className="text-slate-400 hover:text-pink-400 transition-colors text-sm font-medium">
                  All Pets
                </Link>
              </li>
              <li>
                <Link to="/add-pet" className="text-slate-400 hover:text-pink-400 transition-colors text-sm font-medium">
                  Add Pet
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold tracking-wide text-sm uppercase mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm font-medium text-slate-400 group">
                <div className="w-8 h-8 rounded-lg bg-slate-800/40 flex items-center justify-center text-pink-400 group-hover:bg-pink-500/10 transition-colors">
                  <FaEnvelope size={13} />
                </div>
                <a href="mailto:sabirmahmud131@gmail.com" className="hover:text-pink-400 transition-colors">
                  sabirmahmud131@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-slate-400 group">
                <div className="w-8 h-8 rounded-lg bg-slate-800/40 flex items-center justify-center text-pink-400 group-hover:bg-pink-500/10 transition-colors">
                  <FaPhone size={13} />
                </div>
                <a href="tel:01750058368" className="hover:text-pink-400 transition-colors">
                  01750058368
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-slate-400">
                <div className="w-8 h-8 rounded-lg bg-slate-800/40 flex items-center justify-center text-pink-400 flex-shrink-0">
                  <FaPaw size={13} />
                </div>
                <span className="leading-relaxed pt-0.5">
                  Dhanmondi, Dhaka - 1205
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h3 className="text-white font-bold tracking-wide text-sm uppercase mb-5">Stay Updated</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4 font-medium">
              Subscribe to get updates on new pets and adoption events.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 text-xs font-medium rounded-xl bg-slate-800/50 border border-slate-700/60 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500/30 transition-all"
              />
              <button className="whitespace-nowrap px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:opacity-95 shadow-md shadow-pink-500/10 transition-all active:scale-[0.98]">
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/50 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-slate-500 text-center md:text-left tracking-wide">
            &copy; {currentYear} <span className="text-slate-400 font-semibold">PawfectMatch</span>. All rights reserved. 
            <span className="mx-2 text-slate-700">|</span> 
            Developed By <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent font-semibold hover:opacity-80 transition-opacity cursor-pointer">Sabir Mahmud</span>
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;