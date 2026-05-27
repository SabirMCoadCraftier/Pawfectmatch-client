import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axiosInstance';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { FaUsers, FaSearch, FaUserShield, FaTrash, FaArrowLeft, FaArrowRight, FaShieldAlt, FaUser, FaExclamationTriangle } from 'react-icons/fa';

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['adminUsers', page, search],
    queryFn: () => {
      const params = new URLSearchParams({ page, limit: '20' });
      if (search) params.append('search', search);
      return axiosInstance.get(`/api/admin/users?${params}`).then((res) => res.data);
    },
  });

  const promoteMutation = useMutation({
    mutationFn: (email) => axiosInstance.patch(`/api/admin/users/${encodeURIComponent(email)}/role`, { role: 'admin' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast.success('User promoted to admin');
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed'),
  });

  const demoteMutation = useMutation({
    mutationFn: (email) => axiosInstance.patch(`/api/admin/users/${encodeURIComponent(email)}/role`, { role: 'user' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast.success('User demoted to user');
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: (email) => axiosInstance.delete(`/api/admin/users/${encodeURIComponent(email)}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast.success('User deleted');
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed'),
  });

  if (isLoading) {
    return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <FaExclamationTriangle className="text-5xl text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Failed to load users</h2>
        <p className="text-gray-500 text-center max-w-md mb-4">{error?.response?.data?.message || error?.message || 'An unexpected error occurred'}</p>
        <button onClick={() => refetch()} className="btn btn-primary">Retry</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <FaUsers className="text-blue-500" /> Manage Users
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">{data?.total} total users</p>
            </div>
            <div className="relative w-full sm:w-72">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="input input-bordered w-full pl-10 bg-white dark:bg-gray-800"
              />
            </div>
          </div>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="font-semibold text-gray-600 dark:text-gray-300">User</th>
                  <th className="font-semibold text-gray-600 dark:text-gray-300">Email</th>
                  <th className="font-semibold text-gray-600 dark:text-gray-300">Role</th>
                  <th className="font-semibold text-gray-600 dark:text-gray-300">Joined</th>
                  <th className="font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.users?.map((user, idx) => (
                  <motion.tr
                    key={user.email}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded-full">
                            <img
                              src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name}`}
                              alt={user.name}
                            />
                          </div>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="text-gray-600 dark:text-gray-400">{user.email}</td>
                    <td>
                      <div className={`badge gap-1 ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>
                        {user.role === 'admin' ? <FaShieldAlt /> : <FaUser />}
                        {user.role}
                      </div>
                    </td>
                    <td className="text-gray-500 text-sm">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        {user.role === 'admin' ? (
                          <button
                            onClick={() => demoteMutation.mutate(user.email)}
                            className="btn btn-xs btn-ghost text-yellow-500"
                            title="Demote to user"
                          >
                            <FaUser /> Demote
                          </button>
                        ) : (
                          <button
                            onClick={() => promoteMutation.mutate(user.email)}
                            className="btn btn-xs btn-ghost text-blue-500"
                            title="Promote to admin"
                          >
                            <FaUserShield /> Promote
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete user ${user.email}?`))
                              deleteMutation.mutate(user.email);
                          }}
                          className="btn btn-xs btn-ghost text-red-500"
                          title="Delete user"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data?.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn btn-sm btn-ghost"
              ><FaArrowLeft /></button>
              <span className="text-sm text-gray-500">
                Page {page} of {data.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
                className="btn btn-sm btn-ghost"
              ><FaArrowRight /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
