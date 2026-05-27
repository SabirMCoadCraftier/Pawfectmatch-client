import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  FaUsers,
  FaPaw,
  FaHeartbeat,
  FaClipboardList,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaDog,
  FaCat,
  FaArrowRight,
  FaExclamationTriangle,
} from 'react-icons/fa';

const AdminDashboard = () => {
  const { data: stats, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['adminStats'],
    queryFn: () => axiosInstance.get('/api/admin/stats').then((res) => res.data),
  });

  if (isLoading) {
    return <div className="flex justify-center py-20"><LoadingSpinner size="lg" text="Loading dashboard..." /></div>;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
          <FaExclamationTriangle className="text-3xl text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Failed to load dashboard</h2>
        <p className="text-gray-500 text-center max-w-md">{error?.response?.data?.message || error?.message || 'An unexpected error occurred'}</p>
        <button onClick={() => refetch()} className="btn btn-primary mt-4">Retry</button>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers, icon: <FaUsers />, color: 'from-blue-500 to-blue-600', link: '/admin/users' },
    { label: 'Total Pets', value: stats?.totalPets, icon: <FaPaw />, color: 'from-pink-500 to-rose-500', link: '/admin/pets' },
    { label: 'Available', value: stats?.totalAvailable, icon: <FaHeartbeat />, color: 'from-green-500 to-emerald-500', link: '/admin/pets' },
    { label: 'Adopted', value: stats?.totalAdopted, icon: <FaCheckCircle />, color: 'from-purple-500 to-violet-500', link: '/admin/pets' },
    { label: 'Total Requests', value: stats?.totalRequests, icon: <FaClipboardList />, color: 'from-orange-500 to-amber-500', link: '/admin/requests' },
    { label: 'Pending', value: stats?.pendingRequests, icon: <FaHourglassHalf />, color: 'from-yellow-500 to-amber-500', link: '/admin/requests' },
    { label: 'Approved', value: stats?.approvedRequests, icon: <FaCheckCircle />, color: 'from-teal-500 to-cyan-500', link: '/admin/requests' },
    { label: 'Rejected', value: stats?.rejectedRequests, icon: <FaTimesCircle />, color: 'from-red-500 to-rose-500', link: '/admin/requests' },
  ];

  const speciesColors = [
    'from-pink-500 to-rose-500',
    'from-blue-500 to-indigo-500',
    'from-green-500 to-emerald-500',
    'from-purple-500 to-violet-500',
    'from-orange-500 to-amber-500',
    'from-teal-500 to-cyan-500',
    'from-red-500 to-rose-500',
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Full platform overview and management
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={stat.link}
                className={`block bg-gradient-to-br ${stat.color} rounded-xl p-5 text-white hover:shadow-xl transition-all hover:scale-[1.02]`}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1">{stat.value ?? '...'}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pets by Species */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FaPaw className="text-pink-500" /> Pets by Species
            </h2>
            <div className="space-y-4">
              {stats?.petsBySpecies?.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No pets added yet</p>
              ) : (
                stats?.petsBySpecies?.map((item, index) => {
                  const total = stats.totalPets || 1;
                  const percentage = ((item.count / total) * 100).toFixed(1);
                  return (
                    <div key={item._id} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${speciesColors[index % speciesColors.length]} flex items-center justify-center text-white`}>
                        {item._id === 'Dog' ? <FaDog /> : item._id === 'Cat' ? <FaCat /> : <FaPaw />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {item._id}
                          </span>
                          <span className="text-sm text-gray-500">{item.count}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${speciesColors[index % speciesColors.length]} h-2 rounded-full transition-all`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FaClipboardList className="text-pink-500" /> Recent Requests
            </h2>
            <div className="space-y-3">
              {stats?.recentRequests?.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No requests yet</p>
              ) : (
                stats?.recentRequests?.map((req, idx) => (
                  <div
                    key={req._id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${
                        req.status === 'approved' ? 'bg-green-500' :
                        req.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}>
                        {req.status === 'approved' ? <FaCheckCircle /> :
                         req.status === 'rejected' ? <FaTimesCircle /> : <FaHourglassHalf />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {req.requesterName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          Requested to adopt {req.petName}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Link
            to="/admin/users"
            className="card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-between group"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FaUsers className="text-blue-500" />
                <h3 className="font-bold text-gray-900 dark:text-white">Manage Users</h3>
              </div>
              <p className="text-sm text-gray-500">{stats?.totalUsers} registered users</p>
            </div>
            <FaArrowRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
          </Link>
          <Link
            to="/admin/pets"
            className="card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-between group"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FaPaw className="text-pink-500" />
                <h3 className="font-bold text-gray-900 dark:text-white">Manage Pets</h3>
              </div>
              <p className="text-sm text-gray-500">{stats?.totalPets} total pets listed</p>
            </div>
            <FaArrowRight className="text-gray-400 group-hover:text-pink-500 transition-colors" />
          </Link>
          <Link
            to="/admin/requests"
            className="card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-between group"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FaClipboardList className="text-orange-500" />
                <h3 className="font-bold text-gray-900 dark:text-white">Manage Requests</h3>
              </div>
              <p className="text-sm text-gray-500">{stats?.pendingRequests} pending requests</p>
            </div>
            <FaArrowRight className="text-gray-400 group-hover:text-orange-500 transition-colors" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
