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
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isActive
                ? 'text-pink-500 bg-pink-50 dark:bg-pink-900/20 font-semibold'
                : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20'
            }`
          }
          onClick={() => setMobileOpen(false)}
        >
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/pets"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isActive
                ? 'text-pink-500 bg-pink-50 dark:bg-pink-900/20 font-semibold'
                : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20'
            }`
          }
          onClick={() => setMobileOpen(false)}
        >
          <FaList /> All Pets
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/my-requests"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-pink-500 bg-pink-50 dark:bg-pink-900/20 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20'
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              <FaClipboardList /> My Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-pet"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-pink-500 bg-pink-50 dark:bg-pink-900/20 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20'
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              <FaPlusCircle /> Add Pet
            </NavLink>
          </li>
          {user?.role === 'admin' && (
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'text-pink-500 bg-pink-50 dark:bg-pink-900/20 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20'
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                <FaShieldAlt /> Admin Panel
              </NavLink>
            </li>
          )}
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 20, scale: 1.1 }}
              className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center"
            >
              <FaPaw className="text-white text-lg" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              PawfectMatch
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <ul className="flex items-center gap-1">{navLinks}</ul>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle btn-sm text-gray-600 dark:text-gray-300"
            >
              {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
            </button>

            {/* User Section */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-pink-300">
                    <img
                      src={
                        user.photoURL ||
                        'https://ui-avatars.com/api/?name=' + user.name
                      }
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
                    {user.name}
                  </span>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-50 menu p-2 shadow-lg bg-white dark:bg-gray-800 rounded-xl w-52 border border-gray-200 dark:border-gray-700"
                >
                  <li className="menu-title">
                    <span className="text-gray-500 dark:text-gray-400">
                      <FaUser className="inline mr-2" />
                      {user.name}
                    </span>
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-pink-500"
                    >
                      <FaHeart /> Dashboard
                    </Link>
                  </li>
                  {user?.role === 'admin' && (
                    <li>
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-pink-500"
                      >
                        <FaCog /> Admin Panel
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-red-500"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-pink btn-sm rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 hover:from-pink-600 hover:to-rose-600">
                Login
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden btn btn-ghost btn-circle btn-sm"
            >
              {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <ul className="flex flex-col p-4 gap-1">{navLinks}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
