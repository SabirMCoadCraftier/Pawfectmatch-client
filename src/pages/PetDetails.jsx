import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import {
  FaPaw,
  FaMapMarkerAlt,
  FaVenusMars,
  FaCalendarAlt,
  FaSyringe,
  FaHeartbeat,
  FaDollarSign,
  FaUser,
  FaArrowLeft,
  FaShieldAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from 'react-icons/fa';

const PetDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [pickupDate, setPickupDate] = useState('');
  const [message, setMessage] = useState('');

  const {
    data: pet,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['pet', id],
    queryFn: () => axiosInstance.get(`/api/pets/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  const adoptionMutation = useMutation({
    mutationFn: (data) =>
      axiosInstance.post('/api/adoption-requests', data),
    onSuccess: () => {
      toast.success('Adoption request submitted successfully!');
      navigate('/my-requests');
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || 'Failed to submit adoption request'
      );
    },
  });

  const handleAdopt = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to adopt a pet');
      navigate('/login');
      return;
    }
    
    // Safety check frontend-এও লক করে দেওয়া হলো
    if (user?.email === pet?.ownerEmail) {
      toast.error('You cannot submit an adoption request for your own pet!');
      return;
    }

    adoptionMutation.mutate({ petId: id, pickupDate, message });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading pet details..." />
      </div>
    );
  }

  if (isError || !pet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <FaPaw className="text-6xl text-gray-300" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Pet Not Found
        </h2>
        <Link to="/pets" className="btn btn-pink rounded-full">
          <FaArrowLeft /> Back to Pets
        </Link>
      </div>
    );
  }

  const isOwner = user?.email === pet.ownerEmail;
  const isAdopted = pet.adopted;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/pets"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pink-500 mb-6 font-semibold"
        >
          <FaArrowLeft /> Back to All Pets
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pet Image & Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="relative h-[400px]">
                <img
                  src={pet.image}
                  alt={pet.petName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1568572933382-74d440642117?w=600';
                  }}
                />
                <div className="absolute top-4 right-4">
                  <div
                    className={`badge gap-2 text-white border-0 px-4 py-3 text-sm font-bold ${
                      isAdopted ? 'badge-error bg-rose-600' : 'badge-success bg-green-600'
                    }`}
                  >
                    {isAdopted ? (
                      <>
                        <FaTimesCircle /> Adopted
                      </>
                    ) : (
                      <>
                        <FaCheckCircle /> Available
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {pet.petName}
                </h1>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="badge badge-lg badge-outline gap-2 px-4 py-3 text-gray-700 dark:text-gray-300">
                    <FaPaw className="text-pink-500" /> {pet.species}
                  </div>
                  {pet.breed && (
                    <div className="badge badge-lg badge-outline gap-2 px-4 py-3 text-gray-700 dark:text-gray-300">
                      {pet.breed}
                    </div>
                  )}
                  <div className="badge badge-lg badge-outline gap-2 px-4 py-3 text-gray-700 dark:text-gray-300">
                    <FaVenusMars className="text-pink-500" /> {pet.gender}
                  </div>
                  <div className="badge badge-lg badge-outline gap-2 px-4 py-3 text-gray-700 dark:text-gray-300">
                    <FaCalendarAlt className="text-blue-500" /> {pet.age || 0} yrs
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                    <FaSyringe className="text-green-500 text-xl mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Vaccination</p>
                    <p className="font-semibold text-sm dark:text-white">{pet.vaccinationStatus}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                    <FaHeartbeat className="text-red-500 text-xl mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Health</p>
                    <p className="font-semibold text-sm dark:text-white">{pet.healthStatus}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                    <FaMapMarkerAlt className="text-blue-500 text-xl mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-semibold text-sm dark:text-white">{pet.location || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                    <FaDollarSign className="text-yellow-500 text-xl mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Fee</p>
                    <p className="font-semibold text-sm dark:text-white">
                      {pet.adoptionFee === 0 ? 'Free' : `$${pet.adoptionFee}`}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                    <FaUser className="text-purple-500 text-xl mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Owner</p>
                    <p className="font-semibold text-sm truncate dark:text-white">
                      {pet.ownerEmail === user?.email ? 'You' : pet.ownerEmail}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                    <FaShieldAlt className="text-indigo-500 text-xl mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="font-semibold text-sm dark:text-white">
                      {isAdopted ? 'Adopted' : 'Available'}
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  About {pet.petName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {pet.description || `${pet.petName} is a lovely ${pet.species.toLowerCase()} looking for a loving home.`}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Adoption Form Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24 border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FaPaw className="text-pink-500" /> Adoption Request
              </h2>

              {isOwner ? (
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-400 p-4 rounded-xl text-center text-sm font-medium">
                  <p>🛡️ You own this listing.</p>
                  <p className="text-xs mt-1 text-amber-600 dark:text-amber-500">You can track incoming applications for this pet from your Dashboard Listings.</p>
                </div>
              ) : isAdopted ? (
                <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-400 p-4 rounded-xl text-center text-sm font-medium">
                  <p>🎉 This pet has already been adopted!</p>
                </div>
              ) : (
                <form onSubmit={handleAdopt} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Your Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-500 font-medium cursor-not-allowed text-sm"
                      value={user?.displayName || user?.name || ''}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Your Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-500 font-medium cursor-not-allowed text-sm"
                      value={user?.email || ''}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Target Pickup Date *</label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all text-sm outline-none"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Message to Owner *</label>
                    <textarea
                      required
                      rows="4"
                      placeholder="Tell the owner why you'd be a perfect match for this pet..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all text-sm outline-none resize-none"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={adoptionMutation.isPending}
                    className="w-full mt-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-3 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg shadow-pink-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {adoptionMutation.isPending ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>Submitting Application</>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;