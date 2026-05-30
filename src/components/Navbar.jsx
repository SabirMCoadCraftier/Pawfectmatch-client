import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useTheme } from '../context/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPaw,
  FaHome,
  FaList,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaClipboardList,
  FaHeart,
  FaShieldAlt,
  FaCog,
} from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
              isActive
                ? 'text-pink-600 bg-pink-50/80 dark:bg-pink-500/10 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`
          }
          onClick={() => setMobileOpen(false)}
        >
          <FaHome className="opacity-80" /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/pets"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
              isActive
                ? 'text-pink-600 bg-pink-50/80 dark:bg-pink-500/10 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`
          }
          onClick={() => setMobileOpen(false)}
        >
          <FaList className="opacity-80" /> All Pets
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/my-requests"
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                  isActive
                    ? 'text-pink-600 bg-pink-50/80 dark:bg-pink-500/10 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              <FaClipboardList className="opacity-80" /> My Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-pet"
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                  isActive
                    ? 'text-pink-600 bg-pink-50/80 dark:bg-pink-500/10 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              <FaPlusCircle className="opacity-80" /> Add Pet
            </NavLink>
          </li>
          {user?.role === 'admin' && (
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                    isActive
                      ? 'text-pink-600 bg-pink-50/80 dark:bg-pink-500/10 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                <FaShieldAlt className="opacity-80" /> Admin Panel
              </NavLink>
            </li>
          )}
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white/80 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/60 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-9 h-9 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-md shadow-pink-500/20"
            >
              <FaPaw className="text-white text-base" />
            </motion.div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              PawfectMatch
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <ul className="flex items-center gap-1.5">{navLinks}</ul>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 border border-slate-100 dark:border-slate-700/50 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <FaMoon size={16} /> : <FaSun size={16} />}
            </button>

            {/* User Section */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="flex items-center gap-2 cursor-pointer p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50 transition-all"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-pink-500/20 ring-offset-2 ring-offset-white dark:ring-offset-slate-900">
                    <img
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name}&background=f43f5e&color=fff`}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="hidden sm:block text-xs font-semibold text-slate-700 dark:text-slate-300 max-w-[100px] truncate">
                    {user.name}
                  </span>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-50 menu p-1.5 shadow-xl bg-white dark:bg-slate-800 rounded-2xl w-56 border border-slate-100 dark:border-slate-700 mt-2"
                >
                  <div className="px-3 py-2 border-b border-slate-50 dark:border-slate-700/50 mb-1">
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Signed in as</p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{user.name}</p>
                  </div>
                  <li>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 text-sm"
                    >
                      <FaHeart className="text-xs" /> Dashboard
                    </Link>
                  </li>
                  {user?.role === 'admin' && (
                    <li>
                      <Link
                        to="/admin"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 text-sm"
                      >
                        <FaCog className="text-xs" /> Admin Panel
                      </Link>
                    </li>
                  )}
                  <div className="h-px bg-slate-50 dark:bg-slate-700/50 my-1" />
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-sm font-medium"
                    >
                      <FaSignOutAlt className="text-xs" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="px-5 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:opacity-95 shadow-md shadow-pink-500/10 transition-all">
                Login
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all"
            >
              {mobileOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-inner overflow-hidden"
          >
            <ul className="flex flex-col p-4 gap-1.5">{navLinks}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;