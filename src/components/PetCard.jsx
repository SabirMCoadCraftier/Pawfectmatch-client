import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaMapMarkerAlt, FaVenusMars, FaPaw } from 'react-icons/fa';
import { useAuth } from '../context/AuthProvider';

const PetCard = ({ pet, index = 0 }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const statusColor = pet.adopted 
    ? 'bg-rose-500 text-white' 
    : 'bg-emerald-500 text-white';
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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm hover:shadow-xl dark:hover:shadow-black/20 transition-all duration-300 overflow-hidden group flex flex-col h-full"
    >
      {/* Thumbnail Layer */}
      <figure className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={pet.image}
          alt={pet.petName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=600';
          }}
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm ${statusColor}`}>
            {statusText}
          </span>
        </div>
        
        {!pet.adopted && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[11px] font-bold tracking-wide px-2.5 py-1 rounded-md bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 backdrop-blur-sm border border-white/20 shadow-sm">
              {pet.adoptionFee && Number(pet.adoptionFee) > 0 ? `$${pet.adoptionFee}` : 'Free Adoption'}
            </span>
          </div>
        )}
      </figure>

      {/* Details Area */}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight line-clamp-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
          {pet.petName}
        </h2>

        {/* Secondary Info Grid */}
        <div className="flex items-center gap-3.5 text-xs font-medium text-slate-500 dark:text-slate-400 mt-2">
          <span className="flex items-center gap-1.5">
            <FaVenusMars className="text-pink-500 text-sm" />
            {pet.gender}
          </span>
          <span className="flex items-center gap-1.5 max-w-[150px] truncate">
            <FaMapMarkerAlt className="text-sky-500 text-sm" />
            {pet.location || 'Unknown'}
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
          {pet.description || `${pet.species} • ${pet.breed || 'Mixed Breed'}`}
        </p>

        {/* Tag Badges */}
        <div className="flex items-center gap-1.5 mt-4 flex-wrap">
          <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-transparent">
            {pet.species}
          </span>
          {pet.breed && (
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-transparent max-w-[120px] truncate">
              {pet.breed}
            </span>
          )}
          <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-pink-50/50 dark:bg-pink-500/5 text-pink-600 dark:text-pink-400 border border-pink-100/30 dark:border-transparent">
            {pet.age || 0} Yrs
          </span>
        </div>

        {/* Action Layer */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-50 dark:border-slate-700/50 w-full justify-between">
          <Link
            to={`/pets/${pet._id}`}
            className="flex items-center justify-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <FaHeart className="text-[10px]" /> Details
          </Link>

          {!pet.adopted && (
            <button
              onClick={handleAdoptNow}
              className="flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:opacity-95 shadow-md shadow-pink-500/10 transition-all active:scale-[0.98]"
            >
              <FaPaw className="text-[10px]" /> Adopt Now
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PetCard;