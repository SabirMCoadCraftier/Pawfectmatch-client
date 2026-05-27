import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthProvider';
import {
  FaClipboardList,
  FaPlusCircle,
  FaList,
  FaHeart,
  FaArrowLeft,
} from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" />;

  const sidebarItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: <FaHeart />,
      exact: true,
    },
    {
      path: '/my-requests',
      label: 'My Requests',
      icon: <FaClipboardList />,
    },
    {
      path: '/add-pet',
      label: 'Add Pet',
      icon: <FaPlusCircle />,
    },
    {
      path: '/my-listings',
      label: 'My Listings',
      icon: <FaList />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="btn btn-ghost btn-sm gap-2"
          >
            <FaArrowLeft /> Back to Home
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Welcome back, {user?.name}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 space-y-1">
              {sidebarItems.map((item) => {
                const isActive = item.exact
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {location.pathname === '/dashboard' ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaHeart className="text-4xl text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Welcome to Your Dashboard
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
                      Manage your pet listings, track adoption requests, and add new pets from one place.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                      <Link
                        to="/add-pet"
                        className="card bg-gradient-to-br from-pink-500 to-rose-500 text-white p-6 rounded-xl hover:shadow-xl transition-shadow"
                      >
                        <FaPlusCircle className="text-3xl mb-2" />
                        <h3 className="font-bold">Add Pet</h3>
                        <p className="text-sm text-pink-100">List a new pet for adoption</p>
                      </Link>
                      <Link
                        to="/my-listings"
                        className="card bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-6 rounded-xl hover:shadow-xl transition-shadow"
                      >
                        <FaList className="text-3xl mb-2" />
                        <h3 className="font-bold">My Listings</h3>
                        <p className="text-sm text-blue-100">Manage your pet listings</p>
                      </Link>
                      <Link
                        to="/my-requests"
                        className="card bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl hover:shadow-xl transition-shadow"
                      >
                        <FaClipboardList className="text-3xl mb-2" />
                        <h3 className="font-bold">My Requests</h3>
                        <p className="text-sm text-green-100">Track your adoption requests</p>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Outlet />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
