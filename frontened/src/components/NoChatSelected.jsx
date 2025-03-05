import React from "react";
import { MessageCircle } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-[75vw] bg-gray-100 dark:bg-[#0d0e1d] text-center p-10">
      <div className="animate-bounce">
        <MessageCircle size={80} className="text-gray-400" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-600 mt-4">Welcome to Chat</h2>
      <p className="text-gray-500 mt-2">
        Select a conversation to start messaging.
      </p>
    </div>
  );
};

export default NoChatSelected;
