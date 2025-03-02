import React from 'react'
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { FaUserPlus } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthstore } from '../store/useAuthstore';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidecommunity from '../components/Sidecommunity';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [form, setForm] = useState({ fullname: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { signup, isSigningUp } = useAuthstore();

  const validateForm = () => {
    if (!form.fullname) {
      toast.error("Name is required");
      return false;
    }
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
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
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
    if(validateForm()){
      signup(form);
    }
  };

  return (
    <div className='min-h-[91vh] flex bg-gray-700' >
      <div className="left w-full md:w-1/2">
        <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl font-semibold flex items-center space-x-3 mb-8"
          >
            <FaUserPlus className="text-blue-400" />
            <span>Create Your Account</span>
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
                  name="fullname"
                  placeholder="Full Name"
                  value={form.fullname}
                  onChange={handleChange}
                 
                  className="bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  
                  className="bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
                />
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    
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
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition" disabled={isSigningUp}>
                  {
                    isSigningUp ? (
                    <>
                      <Loader2 className='size-5 animate-spin'/> Loading...
                    </>) : ("Create Account")
                  }
                </Button>
              </motion.form>
            </CardContent>
            <div className='text-center text-white font-extralight'>
              Already have an account? <Link to="/login" className="text-blue-400 hover:text underline-offset-4 transition">Sign In</Link>
            </div>
          </Card>
        </div>
      </div>
      <div className='w-3xl '>
           <Sidecommunity />
      </div>
      
    </div>
  )
}

export default SignUpPage