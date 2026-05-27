import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import PetCard from '../components/PetCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaSearch, FaFilter, FaSortAmountDown, FaPaw } from 'react-icons/fa';

const AllPets = () => {
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pets', search, species, sort, page],
    queryFn: () => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (species) params.append('species', species);
      if (sort) params.append('sort', sort);
      params.append('page', page);
      params.append('limit', '12');
      return axiosInstance.get(`/api/pets?${params}`).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  const speciesOptions = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Hamster', 'Other'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-sm font-medium mb-4">
            <FaPaw /> Browse All Pets
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Find Your Perfect Match
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Search through our lovely pets and find the one that steals your heart.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by pet name..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="input input-bordered w-full pl-10 bg-gray-50 dark:bg-gray-700"
              />
            </div>

            {/* Species Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
              <select
                value={species}
                onChange={(e) => {
                  setSpecies(e.target.value);
                  setPage(1);
                }}
                className="select select-bordered w-full pl-10 bg-gray-50 dark:bg-gray-700"
              >
                <option value="">All Species</option>
                {speciesOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <FaSortAmountDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="select select-bordered w-full pl-10 bg-gray-50 dark:bg-gray-700"
              >
                <option value="">Latest First</option>
                <option value="name">Name (A-Z)</option>
                <option value="age">Age (Youngest)</option>
                <option value="fee_asc">Fee (Low to High)</option>
                <option value="fee_desc">Fee (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pets Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" text="Finding pets..." />
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg">Failed to load pets. Please try again.</p>
          </div>
        ) : data?.pets?.length === 0 ? (
          <div className="text-center py-20">
            <FaPaw className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Pets Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.pets?.map((pet, index) => (
                <PetCard key={pet._id} pet={pet} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {data?.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn btn-pink btn-sm rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`btn btn-sm rounded-full ${
                        page === p
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0'
                          : 'btn-ghost'
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                  disabled={page === data.totalPages}
                  className="btn btn-pink btn-sm rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllPets;
