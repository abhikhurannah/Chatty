import React, { useState } from "react";
import { Send, MoreVertical } from "lucide-react";
import { useAuthstore } from "../store/useAuthstore";
import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import MessageInput from "./MessageInput";
import { useEffect } from "react";


const ChatContainer = () => {
   const {messages,getMessages,isMessagesLoading,selectedUser,setSelectedUser} = useChatStore();
   const{onlineUsers} = useAuthstore();

   useEffect(() => {
     getMessages(selectedUser._id);
   }, [selectedUser._id,getMessages]);

   if(isMessagesLoading) return <div>Loading...</div>
   

  return (
    <div className="flex flex-col h-full w-[75vw] dark:bg-[#0d0e1d]">
      {/* Chat Header */}
      <div className="bg-gray-200 dark:bg-[#171a3bfa] p-2 flex items-center justify-between border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-400">
            <img src={selectedUser.profilePic || "/contact.png"} alt={selectedUser.fullname} className="w-full h-full rounded-full object-cover">
            </img>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedUser.fullname}
            </h3>
            <p className="text-sm text-gray-500">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
          <button onClick={()=>{setSelectedUser(null)}}><X/></button>
        </div>
        <MoreVertical className="text-gray-600 cursor-pointer" />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-[#0c0c1e] ">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`rounded-lg p-2 max-w-xs ${
                msg.sender === "me"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="dark:bg-[#1a1e44fa]">
        <MessageInput/>
      </div>
      
    </div>
  );
};

export default ChatContainer;
