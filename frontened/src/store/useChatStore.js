import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthstore } from "./useAuthstore.js";

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
            console.log("messages kaha hai : " + JSON.stringify(response.data));
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

    subscribeToMessages: () => {   
        const {selectedUser} = get();
        if(!selectedUser) return;

        const { socket } = useAuthstore.getState();

        socket.on("newMessage", (newMessage) => {
            if (newMessage.senderId !== selectedUser._id) return;
            set(
                {messages: [...get().messages,newMessage ]
            });
        });
    },
    unsubscribeFromMessages: () => {
        const { socket } = useAuthstore.getState();
        socket.off("newMessage");
    }

}))