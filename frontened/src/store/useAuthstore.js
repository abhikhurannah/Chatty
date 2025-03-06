import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import { toast } from "react-hot-toast"
import { io } from "socket.io-client"

const BASE_URL ="http://localhost:5001";

export const useAuthstore = create((set,get)=>({
    authUser: null,
    isSigningUp: false,
    isLoggingUp: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    isCheckingAuth: true,

    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser: res.data})

            get().connectSocket()
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

            get().connectSocket()
        } catch (error) {
            console.log("error in signup", error)
            toast.error("Failed to create account")
        }finally{
            set({isSigningUp: false})
        }
    },
    
    login : async(data)=>{
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post('/auth/login',data)
            set({authUser: res.data})
            toast.success("Logged in successfully")

            get().connectSocket()
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
            get().disconnectSocket()
        } catch (error) {
            console.log("error in logout", error)
            toast.error("Failed to logout")
        }
    },

    updateProfile: async(data)=>{
        set({isUpdatingProfile: true})
        
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

    },
    connectSocket: () =>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL,{
            query: {
                userId: authUser._id
            }
        })
        socket.connect()
        set({socket: socket})

        socket.on("getOnlineUsers", (users) => {
            set({ onlineUsers: users });
        });
    },

    disConnectSocket: () =>{
       if(get().socket?.connected){
           get().socket.disconnect()
       }
    }
}))