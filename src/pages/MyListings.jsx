import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { Eye, Edit, Trash2, HeartHandshake, X, CheckCircle, XCircle, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MyListings = () => {
  const { user, apiFetch } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [requests, setRequests] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  const fetchListings = async () => {
    try {
      const data = await apiFetch('/pets/my');
      setListings(data);
    } catch (err) {
      toast.error('Failed to fetch your listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchListings(); }, [user]);

  const handleDeletePet = async (petId, petName) => {
    if (!window.confirm(`Delete ${petName}? This cannot be undone.`)) return;
    try {
      await apiFetch(`/pets/${petId}`, { method: 'DELETE' });
      toast.success(`${petName} deleted`);
      fetchListings();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const handleOpenModal = async (pet) => {
    setSelectedPet(pet);
    setModalLoading(true);
    try {
      const data = await apiFetch(`/adoption-requests/pending/${pet._id}`);
      setRequests(data);
    } catch (err) {
      toast.error('Failed to fetch requests');
      setSelectedPet(null);
    } finally {
      setModalLoading(false);
    }
  };

  const handleApprove = async (requestId, name) => {
    if (!window.confirm(`Approve ${name}'s request?`)) return;
    try {
      await apiFetch(`/adoption-requests/${requestId}/approve`, { method: 'PATCH' });
      toast.success('Request approved! 🎉');
      handleOpenModal(selectedPet);
      fetchListings();
    } catch (err) {
      toast.error(err.message || 'Failed to approve');
    }
  };

  const handleReject = async (requestId, name) => {
    if (!window.confirm(`Reject ${name}'s request?`)) return;
    try {
      await apiFetch(`/adoption-requests/${requestId}/reject`, { method: 'PATCH' });
      toast.success('Request rejected');
      handleOpenModal(selectedPet);
    } catch (err) {
      toast.error(err.message || 'Failed to reject');
    }
  };

  if (loading) return <LoadingSpinner />;

  const total = listings.length;
  const available = listings.filter(p => !p.adopted).length;
  const adopted = listings.filter(p => p.adopted).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Listings</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your pet listings and adoption requests.</p>
          </div>
          <Link
            to="/add-pet"
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2.5 rounded-full font-semibold hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg shadow-pink-500/25"
          >
            <PlusCircle size={18} /> Add New Pet
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Listings', value: total, color: 'text-pink-500' },
            { label: 'Available', value: available, color: 'text-green-500' },
            { label: 'Adopted', value: adopted, color: 'text-blue-500' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 text-center shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <p className={`text-4xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Pet Grid */}
        {listings.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
            <span className="text-6xl">📁</span>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-4">No Listings Yet</h3>
            <p className="text-gray-500 mt-2 mb-6">You haven't listed any pets for adoption yet.</p>
            <Link to="/add-pet" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full font-semibold">
              List Your First Pet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((pet, i) => (
              <motion.div
                key={pet._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={pet.image}
                    alt={pet.petName}
                    className="w-full h-48 object-cover"
                  />
                  <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${
                    pet.adopted
                      ? 'bg-red-100 text-red-600'
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {pet.adopted ? 'Adopted' : 'Available'}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">{pet.petName}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{pet.species} • {pet.breed || 'Unknown breed'}</p>
                  <p className="text-pink-500 font-bold text-lg mt-1">
                    {pet.adoptionFee === 0 ? 'Free' : `$${pet.adoptionFee}`}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 mt-4 flex-wrap">
                    <Link
                      to={`/pets/${pet._id}`}
                      className="flex items-center gap-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                    >
                      <Eye size={13} /> View
                    </Link>
                    <Link
                      to={`/edit-pet/${pet._id}`}
                      className="flex items-center gap-1 text-xs font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-all"
                    >
                      <Edit size={13} /> Edit
                    </Link>
                    <button
                      onClick={() => handleOpenModal(pet)}
                      className="flex items-center gap-1 text-xs font-semibold bg-pink-50 dark:bg-pink-900/20 text-pink-600 px-3 py-1.5 rounded-lg hover:bg-pink-100 transition-all"
                    >
                      <HeartHandshake size={13} /> Requests
                    </button>
                    <button
                      onClick={() => handleDeletePet(pet._id, pet.petName)}
                      className="flex items-center gap-1 text-xs font-semibold bg-red-50 dark:bg-red-900/20 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-all ml-auto"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Requests Modal */}
      <AnimatePresence>
        {selectedPet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setSelectedPet(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Adoption Requests for <span className="text-pink-500">{selectedPet.petName}</span>
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Approve or reject incoming adoption requests.</p>
                </div>
                <button
                  onClick={() => setSelectedPet(null)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {modalLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : requests.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <span className="text-5xl">✉️</span>
                    <p className="mt-4 font-medium">No adoption requests yet for this pet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {requests.map(req => (
                      <div
                        key={req._id}
                        className={`rounded-xl p-5 border ${
                          req.status === 'approved'
                            ? 'border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800'
                            : req.status === 'rejected'
                            ? 'border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800'
                            : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30'
                        }`}
                      >
                        {/* Requester Info */}
                        <div className="flex items-start justify-between flex-wrap gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white font-bold text-sm">
                              {req.requesterName?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 dark:text-white">{req.requesterName}</p>
                              <p className="text-gray-500 text-sm">{req.requesterEmail}</p>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                            req.status === 'approved'
                              ? 'bg-green-100 text-green-700'
                              : req.status === 'rejected'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {req.status === 'approved' ? '✅ Approved' : req.status === 'rejected' ? '❌ Rejected' : '⏳ Pending'}
                          </span>
                        </div>

                        {/* Dates */}
                        <div className="flex gap-4 mt-3 text-sm text-gray-500">
                          <span>📅 Applied: {new Date(req.createdAt).toLocaleDateString()}</span>
                          <span>🚗 Pickup: <strong className="text-gray-700 dark:text-gray-300">{new Date(req.pickupDate).toLocaleDateString()}</strong></span>
                        </div>

                        {/* Message */}
                        {req.message && (
                          <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded-lg border-l-4 border-pink-400 text-sm text-gray-600 dark:text-gray-300 italic">
                            "{req.message}"
                          </div>
                        )}

                        {/* Approve/Reject Buttons - only for pending */}
                        {req.status === 'pending' && !selectedPet.adopted && (
                          <div className="flex gap-3 mt-4">
                            <button
                              onClick={() => handleReject(req._id, req.requesterName)}
                              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-red-300 text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-sm"
                            >
                              <XCircle size={16} /> Reject
                            </button>
                            <button
                              onClick={() => handleApprove(req._id, req.requesterName)}
                              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:from-green-600 hover:to-emerald-600 transition-all text-sm"
                            >
                              <CheckCircle size={16} /> Approve
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyListings;