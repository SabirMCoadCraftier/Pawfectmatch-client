import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { Eye, Trash2, Calendar, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { apiFetch } = useAuth();

  const fetchRequests = async () => {
    try {
      const data = await apiFetch('/adoption-requests/my');
      setRequests(data);
    } catch (err) {
      toast.error('Failed to fetch your adoption requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleCancelRequest = async (requestId, petName) => {
    const confirmCancel = window.confirm(`Are you sure you want to cancel your adoption request for ${petName}? This will permanently remove your application.`);
    if (!confirmCancel) return;

    try {
      await apiFetch(`/adoption-requests/${requestId}`, { method: 'DELETE' });
      toast.success(`Adoption request for ${petName} cancelled successfully.`);
      fetchRequests();
    } catch (err) {
      toast.error(err.message || 'Failed to cancel request');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Title Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">My Adoption Applications</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track the status of your adoption requests and coordinate with pet shelters.
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <span className="text-6xl">💌</span>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white mt-4">No Requests Filed</h4>
            <p className="text-gray-500 mt-2 mb-6 max-w-md mx-auto text-sm">
              You haven't submitted any adoption applications yet. Find a pet you love and send a request!
            </p>
            <Link to="/pets" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-pink-500/20 hover:from-pink-600 hover:to-rose-600 transition-all">
              Explore Pets Available For Adoption
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {requests.map((req, i) => {
              const reqDate = new Date(req.createdAt).toLocaleDateString();
              const pickupDate = new Date(req.pickupDate).toLocaleDateString();
              
              // Fallback default image safe execution
              const petImage = req.petId?.image || req.petImage || `https://ui-avatars.com/api/?name=${req.petName}&background=f9a8d4&color=fff&size=100`;
              const petBreed = req.petId?.breed || 'Unknown';
              const petSpecies = req.petId?.species || 'Pet';

              return (
                <motion.div
                  key={req._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/70 p-5 flex flex-col md:flex-row gap-5 items-center justify-between shadow-xs hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-5 w-full md:w-auto">
                    <img
                      src={petImage}
                      alt={req.petName}
                      className="w-24 h-24 rounded-xl object-cover border border-gray-100 dark:border-gray-700 shadow-inner shrink-0"
                    />

                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{req.petName}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {petSpecies} • Breed: {petBreed}
                      </p>
                      
                      <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-3 text-xs font-semibold text-gray-400 tracking-wide uppercase">
                        <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 rounded-md">
                          <FileText size={14} className="text-pink-500" />
                          Filed: <span className="text-gray-700 dark:text-gray-300 font-bold">{reqDate}</span>
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 rounded-md">
                          <Calendar size={14} className="text-blue-500" />
                          Pickup: <span className="text-gray-700 dark:text-gray-300 font-bold">{pickupDate}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions column section */}
                  <div className="flex flex-col items-center md:items-end gap-3 w-full sm:w-auto shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 dark:border-gray-700">
                    <div>
                      {req.status === 'pending' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 text-yellow-700 dark:text-yellow-500 px-3 py-1 rounded-full">
                          <Clock size={12} /> Pending Review
                        </span>
                      ) : req.status === 'approved' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 text-green-700 dark:text-green-500 px-3 py-1 rounded-full">
                          <CheckCircle size={12} /> Approved Application
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-500 px-3 py-1 rounded-full">
                          <XCircle size={12} /> Rejected / Closed
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <Link
                        to={`/pets/${req.petId?._id || req.petId}`}
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 text-xs font-bold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                      >
                        <Eye size={14} /> View Pet
                      </Link>

                      {req.status === 'pending' && (
                        <button
                          onClick={() => handleCancelRequest(req._id, req.petName)}
                          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 text-xs font-bold bg-red-50 dark:bg-red-950/20 border border-red-200/60 text-red-500 px-4 py-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-all"
                        >
                          <Trash2 size={14} /> Cancel
                        </button>
                      )}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;