import React from "react";
import { motion } from "framer-motion";
import { FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthstore } from "../store/useAuthstore";

const Navbar = () => {
   const { authUser, logout } = useAuthstore();

  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-gray-900 shadow-lg">
      {/* Logo Section */}
      <Link to="/" className="flex items-center">
        {/* Animated Logo Icon */}
        <motion.div
          className="bg-blue-500 p-2 rounded-full mr-2"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <span className="text-white font-bold text-xl">C</span>
        </motion.div>
        <span className="text-white text-2xl font-bold">Chatty</span>
      </Link>

      {/* Navigation Links */}
        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/settings" >
              <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className=" cursor-pointer  flex items-center space-x-2 text-white hover:text-blue-400 transition"
            >
              <FaCog />
              <span className="font-medium">Settings</span>
              </motion.div>
          </Link>
          {
            authUser && (<>
                <Link to="/profile" >    
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className=" cursor-pointer flex items-center space-x-2 text-white hover:text-blue-400 transition"
            >
              <FaUser />
              <span className="font-medium">Profile</span>
            </motion.div>
          </Link>
          <button onClick={logout}>
              <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer  flex items-center space-x-2 text-white hover:text-blue-400 transition"
            >
              <FaSignOutAlt />
              <span className="font-medium">Logout</span>
              </motion.div>
          </button>
        
            </>)
          }
          
        
      </div>
    </nav>
  );
};

export default Navbar;