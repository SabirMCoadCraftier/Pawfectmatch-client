import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axiosInstance';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { FaPaw, FaSearch, FaTrash, FaEye, FaArrowLeft, FaArrowRight, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

const ManagePets = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState('');
  const [adopted, setAdopted] = useState('');

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['adminPets', page, search, species, adopted],
    queryFn: () => {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (search) params.append('search', search);
      if (species) params.append('species', species);
      if (adopted) params.append('adopted', adopted);
      return axiosInstance.get(`/api/admin/pets?${params}`).then((res) => res.data);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/api/admin/pets/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPets'] });
      toast.success('Pet deleted');
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed'),
  });

  const toggleAdoptedMutation = useMutation({
    mutationFn: ({ id, adopted }) => axiosInstance.patch(`/api/admin/pets/${id}`, { adopted }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPets'] });
      toast.success('Pet status updated');
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed'),
  });

  const speciesOptions = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Hamster', 'Other'];

  if (isLoading) {
    return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <FaExclamationTriangle className="text-5xl text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Failed to load pets</h2>
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
            <FaPaw className="text-pink-500" /> Manage Pets
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{data?.total} total pets</p>
        </motion.div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by pet name..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="input input-bordered w-full pl-10 bg-gray-50 dark:bg-gray-700"
              />
            </div>
            <select
              value={species}
              onChange={(e) => { setSpecies(e.target.value); setPage(1); }}
              className="select select-bordered bg-gray-50 dark:bg-gray-700"
            >
              <option value="">All Species</option>
              {speciesOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              value={adopted}
              onChange={(e) => { setAdopted(e.target.value); setPage(1); }}
              className="select select-bordered bg-gray-50 dark:bg-gray-700"
            >
              <option value="">All Status</option>
              <option value="false">Available</option>
              <option value="true">Adopted</option>
            </select>
          </div>
        </div>

        {/* Pets Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="font-semibold">Pet</th>
                  <th className="font-semibold">Species</th>
                  <th className="font-semibold">Owner</th>
                  <th className="font-semibold">Status</th>
                  <th className="font-semibold">Fee</th>
                  <th className="font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.pets?.map((pet, idx) => (
                  <motion.tr
                    key={pet._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden">
                          <img
                            src={pet.image}
                            alt={pet.petName}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=100'; }}
                          />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{pet.petName}</span>
                      </div>
                    </td>
                    <td className="text-gray-600 dark:text-gray-400">{pet.species}</td>
                    <td className="text-gray-600 dark:text-gray-400 text-sm truncate max-w-[150px]">{pet.ownerEmail}</td>
                    <td>
                      <button
                        onClick={() => toggleAdoptedMutation.mutate({ id: pet._id, adopted: !pet.adopted })}
                        className={`btn btn-xs gap-1 ${pet.adopted ? 'btn-error' : 'btn-success'} text-white border-0`}
                      >
                        {pet.adopted ? <FaTimesCircle /> : <FaCheckCircle />}
                        {pet.adopted ? 'Adopted' : 'Available'}
                      </button>
                    </td>
                    <td className="text-gray-600 dark:text-gray-400">${pet.adoptionFee || 'Free'}</td>
                    <td className="text-right">
                      <div className="flex justify-end gap-1">
                        <Link to={`/pets/${pet._id}`} className="btn btn-xs btn-ghost text-blue-500"><FaEye /></Link>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${pet.petName}?`))
                              deleteMutation.mutate(pet._id);
                          }}
                          className="btn btn-xs btn-ghost text-red-500"
                        ><FaTrash /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {data?.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="btn btn-sm btn-ghost"><FaArrowLeft /></button>
              <span className="text-sm text-gray-500">Page {page} of {data.totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))} disabled={page === data.totalPages} className="btn btn-sm btn-ghost"><FaArrowRight /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagePets;
