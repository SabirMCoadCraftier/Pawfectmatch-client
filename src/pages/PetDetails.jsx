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
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pink-500 mb-6"
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
                    className={`badge gap-2 text-white border-0 px-4 py-3 text-sm ${
                      isAdopted ? 'badge-error' : 'badge-success'
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
                  <div className="badge badge-lg badge-outline gap-2 px-4 py-3">
                    <FaPaw className="text-pink-500" /> {pet.species}
                  </div>
                  {pet.breed && (
                    <div className="badge badge-lg badge-outline gap-2 px-4 py-3">
                      {pet.breed}
                    </div>
                  )}
                  <div className="badge badge-lg badge-outline gap-2 px-4 py-3">
                    <FaVenusMars className="text-pink-500" /> {pet.gender}
                  </div>
                  <div className="badge badge-lg badge-outline gap-2 px-4 py-3">
                    <FaCalendarAlt className="text-blue-500" /> {pet.age || 0} yrs
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <FaSyringe className="text-green-500 text-xl mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Vaccination</p>
                    <p className="font-semibold text-sm">{pet.vaccinationStatus}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <FaHeartbeat className="text-red-500 text-xl mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Health</p>
                    <p className="font-semibold text-sm">{pet.healthStatus}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <FaMapMarkerAlt className="text-blue-500 text-xl mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-semibold text-sm">{pet.location || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <FaDollarSign className="text-yellow-500 text-xl mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Fee</p>
                    <p className="font-semibold text-sm">
                      ${pet.adoptionFee || 'Free'}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <FaUser className="text-purple-500 text-xl mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Owner</p>
                    <p className="font-semibold text-sm truncate">
                      {pet.owner?.name || 'N/A'}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <FaShieldAlt className="text-indigo-500 text-xl mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="font-semibold text-sm">
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

          {/* Adoption Form */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FaPaw className="text-pink-500" /> Adoption Request
              </h2>

              {!user ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Please login to submit an adoption request</p>
                  <Link
                    to="/login"
                    className="btn bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 rounded-full"
                  >
                    Login to Adopt
                  </Link>
                </div>
              ) : isOwner ? (
                <div className="text-center py-8">
                  <FaPaw className="text-4xl text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">You cannot adopt your own pet</p>
                </div>
              ) : isAdopted ? (
                <div className="text-center py-8">
                  <FaTimesCircle className="text-4xl text-red-300 mx-auto mb-3" />
                  <p className="text-gray-500">This pet has already been adopted</p>
                </div>
              ) : (
                <form onSubmit={handleAdopt} className="space-y-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Pet Name</span>
                    </label>
                    <input
                      type="text"
                      value={pet.petName}
                      readOnly
                      className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Your Name</span>
                    </label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      readOnly
                      className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Your Email</span>
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      readOnly
                      className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">
                        Pickup Date <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      required
                      className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Message</span>
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us why you'd like to adopt this pet..."
                      rows={3}
                      className="textarea textarea-bordered w-full bg-gray-50 dark:bg-gray-700"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={adoptionMutation.isPending}
                    className="btn bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 w-full rounded-full hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/25"
                  >
                    {adoptionMutation.isPending ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      <>
                        <FaHeartbeat /> Submit Request
                      </>
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
