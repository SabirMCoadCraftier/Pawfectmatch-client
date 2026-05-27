import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axiosInstance';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';
import {
  FaClipboardList,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
  FaArrowLeft,
  FaArrowRight,
  FaUser,
  FaPaw,
  FaCalendarAlt,
  FaHourglassHalf,
  FaExclamationTriangle,
} from 'react-icons/fa';

const ManageRequests = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['adminRequests', page, search, status],
    queryFn: () => {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (search) params.append('search', search);
      if (status) params.append('status', status);
      return axiosInstance.get(`/api/admin/adoption-requests?${params}`).then((res) => res.data);
    },
  });

  const approveMutation = useMutation({
    mutationFn: (id) => axiosInstance.patch(`/api/admin/adoption-requests/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminRequests'] });
      toast.success('Request approved');
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed'),
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => axiosInstance.patch(`/api/admin/adoption-requests/${id}/reject`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminRequests'] });
      toast.success('Request rejected');
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/api/admin/adoption-requests/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminRequests'] });
      toast.success('Request deleted');
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed'),
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved': return <div className="badge badge-success gap-1 text-white border-0"><FaCheckCircle /> Approved</div>;
      case 'rejected': return <div className="badge badge-error gap-1 text-white border-0"><FaTimesCircle /> Rejected</div>;
      default: return <div className="badge badge-warning gap-1 text-white border-0"><FaHourglassHalf /> Pending</div>;
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <FaExclamationTriangle className="text-5xl text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Failed to load requests</h2>
        <p className="text-gray-500 text-center max-w-md mb-4">{error?.response?.data?.message || error?.message || 'An unexpected error occurred'}</p>
        <button onClick={() => refetch()} className="btn btn-primary">Retry</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <FaClipboardList className="text-orange-500" /> Manage Adoption Requests
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{data?.total} total requests</p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or pet..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="input input-bordered w-full pl-10 bg-gray-50 dark:bg-gray-700"
              />
            </div>
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }}
              className="select select-bordered bg-gray-50 dark:bg-gray-700"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {data?.requests?.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl">
              <FaClipboardList className="text-5xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Requests Found</h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
          ) : (
            data?.requests?.map((req, idx) => (
              <motion.div
                key={req._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={req.petImage}
                          alt={req.petName}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=100'; }}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-gray-900 dark:text-white">{req.requesterName}</h3>
                          {getStatusBadge(req.status)}
                        </div>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <FaUser className="text-pink-500" /> {req.requesterEmail}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <FaPaw className="text-blue-500" /> Wants to adopt <strong>{req.petName}</strong>
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <FaCalendarAlt className="text-green-500" /> Pickup: {new Date(req.pickupDate).toLocaleDateString()}
                        </p>
                        {req.message && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-2 italic">
                            "{req.message}"
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          Requested: {new Date(req.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    {req.status === 'pending' && (
                      <>
                        <button
                          onClick={() => approveMutation.mutate(req._id)}
                          className="btn btn-sm btn-success gap-1 rounded-full text-white border-0"
                        >
                          <FaCheckCircle /> Approve
                        </button>
                        <button
                          onClick={() => rejectMutation.mutate(req._id)}
                          className="btn btn-sm btn-error gap-1 rounded-full text-white border-0"
                        >
                          <FaTimesCircle /> Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this request?'))
                          deleteMutation.mutate(req._id);
                      }}
                      className="btn btn-sm btn-ghost text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {data?.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="btn btn-sm btn-ghost"><FaArrowLeft /></button>
            <span className="text-sm text-gray-500">Page {page} of {data.totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))} disabled={page === data.totalPages} className="btn btn-sm btn-ghost"><FaArrowRight /></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRequests;
