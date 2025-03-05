import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useChatStore = create((set,get) => ({
    messages: [],
    users : [],
    selectedUsers : null,
    isUsersLoading : false,
    isMessagesLoading : false,
    
    setSelectedUser: (user) => set({ selectedUser: user }),

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get("/messages/users");
            console.log("users kaha ha : " + JSON.stringify(response.data));
            set({ users: response.data });
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to fetch users");
        }finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: response.data });
        } catch (error) {
            console.error("Error fetching messages:", error);
            toast.error("Failed to fetch messages");
        }finally {
            set({ isMessagesLoading: false });
        }
    },
    
    sendMessage: async(messageData)=>{
      const {selectedUser,messages} = get();
      try {
        const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
        set({messages: [...messages,res.data]});
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },

}))