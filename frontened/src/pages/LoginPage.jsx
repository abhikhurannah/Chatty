import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthstore } from '../store/useAuthstore';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidecommunity from '../components/Sidecommunity';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoggingIn } = useAuthstore();

  const validateForm = () => {
    if (!form.email) {
      toast.error("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!form.password) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (validateForm()) {
      login(form);
    }
  };

  return (
    <div className='min-h-[91vh] flex bg-gray-700'>
      <div className="left w-full md:w-1/2">
        <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl font-semibold flex items-center space-x-3 mb-8"
          >
            <FaSignInAlt className="text-blue-400" />
            <span>Login</span>
          </motion.div>
          
          <Card className="w-full max-w-md bg-gray-800 bg-opacity-90 backdrop-blur-lg shadow-2xl rounded-xl overflow-hidden border border-gray-700">
            <CardContent className="p-6">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
                />
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-blue-400 transition"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition" disabled={isLoggingIn}>
                  {
                    isLoggingIn ? (
                    <>
                      <Loader2 className='size-5 animate-spin'/> Loading...
                    </>) : ("Login")
                  }
                </Button>
              </motion.form>
            </CardContent>
            <div className='text-center text-white font-extralight'>
              Don't have an account? <Link to="/signup" className="text-blue-400 hover:text underline-offset-4 transition">Sign Up</Link>
            </div>
          </Card>
        </div>
      </div>
      <div className='w-3xl'>
        <Sidecommunity />
      </div>
    </div>
  );
}

export default LoginPage;