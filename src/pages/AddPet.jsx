import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import { FaPaw, FaPlusCircle, FaImage } from 'react-icons/fa';

const AddPet = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    petName: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    image: '',
    healthStatus: '',
    vaccinationStatus: '',
    location: '',
    adoptionFee: '',
    description: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const mutation = useMutation({
    mutationFn: (data) => axiosInstance.post('/api/pets', data),
    onSuccess: () => {
      toast.success('Pet added successfully!');
      navigate('/my-listings');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add pet');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.petName || !form.species || !form.image) {
      toast.error('Pet name, species, and image are required');
      return;
    }

    mutation.mutate({
      ...form,
      age: parseInt(form.age) || 0,
      adoptionFee: parseFloat(form.adoptionFee) || 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaPlusCircle className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Add a Pet for Adoption
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Share details about the pet to help them find their forever home
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pet Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Pet Name <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="petName"
                  value={form.petName}
                  onChange={handleChange}
                  placeholder="e.g., Buddy"
                  className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                  required
                />
              </div>

              {/* Species */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Species <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  name="species"
                  value={form.species}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-gray-50 dark:bg-gray-700"
                  required
                >
                  <option value="">Select species</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Fish">Fish</option>
                  <option value="Hamster">Hamster</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Breed */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Breed</span>
                </label>
                <input
                  type="text"
                  name="breed"
                  value={form.breed}
                  onChange={handleChange}
                  placeholder="e.g., Golden Retriever"
                  className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                />
              </div>

              {/* Age */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Age (years)</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  min="0"
                  step="0.5"
                  placeholder="e.g., 2"
                  className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Gender</span>
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-gray-50 dark:bg-gray-700"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Image URL <span className="text-red-500">*</span>
                  </span>
                </label>
                <div className="relative">
                  <FaImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://example.com/pet.jpg"
                    className="input input-bordered w-full pl-10 bg-gray-50 dark:bg-gray-700"
                    required
                  />
                </div>
                {form.image && (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg mt-2 border"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
              </div>

              {/* Health Status */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Health Status</span>
                </label>
                <select
                  name="healthStatus"
                  value={form.healthStatus}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-gray-50 dark:bg-gray-700"
                >
                  <option value="">Select status</option>
                  <option value="Healthy">Healthy</option>
                  <option value="Vaccinated">Vaccinated</option>
                  <option value="Needs Treatment">Needs Treatment</option>
                  <option value="Special Needs">Special Needs</option>
                </select>
              </div>

              {/* Vaccination */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Vaccination Status</span>
                </label>
                <select
                  name="vaccinationStatus"
                  value={form.vaccinationStatus}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-gray-50 dark:bg-gray-700"
                >
                  <option value="">Select status</option>
                  <option value="Fully Vaccinated">Fully Vaccinated</option>
                  <option value="Partially Vaccinated">Partially Vaccinated</option>
                  <option value="Not Vaccinated">Not Vaccinated</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g., New York, NY"
                  className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                />
              </div>

              {/* Adoption Fee */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Adoption Fee ($)</span>
                </label>
                <input
                  type="number"
                  name="adoptionFee"
                  value={form.adoptionFee}
                  onChange={handleChange}
                  min="0"
                  placeholder="0 for free"
                  className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                />
              </div>
            </div>

            {/* Owner Email (readonly) */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Owner Email <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-600"
              />
            </div>

            {/* Description */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Tell us about the pet's personality, habits, and why they need a home..."
                rows={4}
                className="textarea textarea-bordered w-full bg-gray-50 dark:bg-gray-700"
              />
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="btn bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 w-full rounded-full hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/25 py-3 h-auto text-lg"
            >
              {mutation.isPending ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <FaPaw /> Add Pet for Adoption
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddPet;
