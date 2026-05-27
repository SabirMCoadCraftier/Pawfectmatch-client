import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import {
  FaPaw,
  FaGoogle,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCamera,
} from 'react-icons/fa';

const Register = () => {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (!/[A-Z]/.test(password))
      return 'Password must contain an uppercase letter';
    if (!/[a-z]/.test(password))
      return 'Password must contain a lowercase letter';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      toast.error('Please fill in all required fields');
      return;
    }

    const passwordError = validatePassword(form.password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success('Google login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ rotate: 20 }}
              className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <FaPaw className="text-3xl text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create Account
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Join PawfectMatch and start your adoption journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="input input-bordered w-full pl-10 bg-gray-50 dark:bg-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="input input-bordered w-full pl-10 bg-gray-50 dark:bg-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Photo URL <span className="text-gray-400">(optional)</span>
                </span>
              </label>
              <div className="relative">
                <FaCamera className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  name="photoURL"
                  value={form.photoURL}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                  className="input input-bordered w-full pl-10 bg-gray-50 dark:bg-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min 6 chars, 1 upper, 1 lower"
                  className="input input-bordered w-full pl-10 pr-10 bg-gray-50 dark:bg-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className="input input-bordered w-full pl-10 pr-10 bg-gray-50 dark:bg-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 w-full rounded-full hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/25 mt-2"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="divider my-6">OR</div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="btn btn-outline w-full rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <FaGoogle className="text-red-500" /> Continue with Google
          </button>

          <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-pink-500 hover:text-pink-600 font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
