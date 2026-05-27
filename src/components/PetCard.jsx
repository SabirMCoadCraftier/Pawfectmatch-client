import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaMapMarkerAlt, FaVenusMars, FaPaw } from 'react-icons/fa';
import { useAuth } from '../context/AuthProvider';

const PetCard = ({ pet, index = 0 }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const statusColor = pet.adopted ? 'badge-error' : 'badge-success';
  const statusText = pet.adopted ? 'Adopted' : 'Available';

  const handleAdoptNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/pets/${pet._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
    >
      <figure className="relative h-56 overflow-hidden">
        <img
          src={pet.image}
          alt={pet.petName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400';
          }}
        />
        <div className="absolute top-3 right-3">
          <div className={`badge ${statusColor} gap-1 text-white border-0 px-3 py-2`}>
            {statusText}
          </div>
        </div>
        {!pet.adopted && (
          <div className="absolute top-3 left-3">
            <div className="badge badge-secondary gap-1 text-white border-0 px-3 py-2">
              ${pet.adoptionFee || 'Free'}
            </div>
          </div>
        )}
      </figure>

      <div className="card-body p-5">
        <h2 className="card-title text-lg font-bold text-gray-800 dark:text-white">
          {pet.petName}
        </h2>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span className="flex items-center gap-1">
            <FaVenusMars className="text-pink-500" />
            {pet.gender}
          </span>
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-blue-500" />
            {pet.location || 'Unknown'}
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
          {pet.description || `${pet.species} - ${pet.breed || 'Mixed'}`}
        </p>

        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <div className="badge badge-outline badge-sm">{pet.species}</div>
          {pet.breed && (
            <div className="badge badge-outline badge-sm">{pet.breed}</div>
          )}
          <div className="badge badge-outline badge-sm">{pet.age || 0} yrs</div>
        </div>

        <div className="card-actions justify-between mt-4">
          <Link
            to={`/pets/${pet._id}`}
            className="btn btn-sm rounded-full px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-0 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <FaHeart className="mr-1" /> View Details
          </Link>

          {!pet.adopted && (
            <button
              onClick={handleAdoptNow}
              className="btn btn-sm rounded-full px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-500/25"
            >
              <FaPaw className="mr-1" /> Adopt Now
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PetCard;