import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import { toast } from "react-hot-toast"
import axios from "axios"

export const useAuthstore = create((set)=>({
    authUser: null,
    isSigningUp: false,
    isLoggingUp: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser: res.data})
        } catch (error) {
            console.log("error in checkAuth", error)
            set({authUser: null})
        }finally{
            set({isCheckingAuth: false})
        }
    },

    signup: async(data)=>{

        set({isSigningUp: true})
        console.log("signup:" + JSON.stringify(data))
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({authUser: res.data})
            toast.success("Account created successfully")
        } catch (error) {
            console.log("error in signup", error)
            toast.error("Failed to create account")
        }finally{
            set({isSigningUp: false})
        }
    },
    
    login : async()=>{
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post('/auth/login',data)
            set({authUser: res.data})
            toast.success("Logged in successfully")
        } catch (error) {
            console.log("error in login", error)
            toast.error("Failed to login")
        }finally{
            set({isLoggingIn: false})
        }
    },
      
    logout: async()=>{
        try {
            await axiosInstance.post('/auth/logout')
            set({authUser: null})
            toast.success("Logged out successfully")
        } catch (error) {
            console.log("error in logout", error)
            toast.error("Failed to logout")
        }
    },

    updateProfile: async(data)=>{
        set({isUpdatingProfile: true})
        console.log("updateProfile:" + JSON.stringify(data))
        try {
            const res = await axiosInstance.put('/auth/update-profile', data)
            set({authUser: res.data})
            toast.success("Profile updated successfully")
        } catch (error) {
            console.log("error in updateProfile", error)
            toast.error("Failed to update profile")
        }finally{
            set({isUpdatingProfile: false})
        }

    }
}))