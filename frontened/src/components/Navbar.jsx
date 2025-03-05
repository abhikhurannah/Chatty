import React from "react";
import { motion } from "framer-motion";
import { FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthstore } from "../store/useAuthstore";
import { RiChatSmile3Fill } from "react-icons/ri";

const Navbar = () => {
  const { authUser, logout } = useAuthstore();

  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-gradient-to-r from-gray-900 to-cyan-950 shadow-lg">
      {/* Logo Section */}
      <Link to="/" className="flex items-center justify-center space-x-3">
        {/* Animated Logo Icon */}
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 1 }}
          className="text-blue-400"
        >
          <RiChatSmile3Fill size={40} />
        </motion.div>
        <span className="text-white text-2xl font-extrabold tracking-wide">
          Chat<span className="text-blue-400">ty</span>
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
        {/* Settings */}
        <Link to="/settings">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer flex items-center space-x-2 text-white hover:text-blue-400 transition duration-300"
          >
            <FaCog />
            <span className="font-medium hidden sm:inline">Settings</span>
          </motion.div>
        </Link>

        {/* Profile & Logout (Only if logged in) */}
        {authUser && (
          <>
            {/* Profile */}
            <Link to="/profile">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer flex items-center space-x-2 text-white hover:text-blue-400 transition duration-300"
              >
                <FaUser />
                <span className="font-medium hidden sm:inline">Profile</span>
              </motion.div>
            </Link>

            {/* Logout Button */}
            <button onClick={logout}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer flex items-center space-x-2 text-white hover:text-red-400 transition duration-300"
              >
                <FaSignOutAlt />
                <span className="font-medium hidden sm:inline">Logout</span>
              </motion.div>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
