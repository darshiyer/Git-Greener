import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingNavbar: React.FC = () => {
  return (
    <nav className="w-full bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Business Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 text-transparent bg-clip-text">
              To Be Deployed
            </Link>
          </motion.div>

          {/* Auth Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Sign Up
            </Link>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar; 