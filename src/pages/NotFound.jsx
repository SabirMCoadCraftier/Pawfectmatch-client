import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPaw, FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-pink-500/25"
        >
          <FaPaw className="text-5xl text-white" />
        </motion.div>

        <h1 className="text-8xl font-extrabold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-4">
          404
        </h1>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Looks like this page wandered off like a curious cat! 
          Let's get you back to where the pets are.
        </p>

        <Link
          to="/"
          className="btn bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 px-8 py-3 h-auto rounded-full text-lg hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/25 inline-flex items-center gap-2"
        >
          <FaHome /> Back to Home
        </Link>

        <div className="mt-12">
          <p className="text-sm text-gray-400">Lost?</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/" className="text-sm text-pink-500 hover:text-pink-600">Home</Link>
            <Link to="/pets" className="text-sm text-pink-500 hover:text-pink-600">All Pets</Link>
            <Link to="/login" className="text-sm text-pink-500 hover:text-pink-600">Login</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
